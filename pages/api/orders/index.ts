import apiHandler from '../../../lib/apiHandler'
import midtransClient from 'midtrans-client'
import { getSession } from 'next-auth/react'
import prisma from '../../../lib/prisma'

const app = apiHandler()

let snap = new midtransClient.Snap({
  // Set to true if you want Production Environment (accept real transaction).
  isProduction: false,
  serverKey: process.env.MIDTRANS_SERVER_KEY,
})

export default app
  // create new order
  .post(async (req, res) => {
    const { products, requirements, user: reqUser, promoCode } = req.body
    if (!products || products.length == 0) {
      throw {
        status: 400,
        message: 'please provide valid products ([] of { id, amount })',
      }
    }

    const session = await getSession({ req })
    const user = session?.user

    const order = await prisma.order.create({
      data: {
        userId: user?.id,
        products: {
          create: products.map((product) => ({
            productId: product.id,
            amount: product.amount,
          })),
        },
      },
      include: {
        products: {
          select: {
            amount: true,
            product: {
              select: {
                id: true,
                title: true,
                description: true,
                category: true,
                price: true,
                discount: true,
              },
            },
          },
        },
      },
    })

    let distinctCategories = []

    // calculate subtotal
    let subtotal = 0
    for (const item of order.products) {
      let discount = (item.product.discount / 100) * item.product.price
      subtotal += item.product.price * item.amount - discount
      const categorySlug = item.product.category.slug
      if (!distinctCategories.includes(categorySlug)) {
        distinctCategories.push(categorySlug)
      }
    }

    let discountPercent = 0
    // validate promoCode
    if (user && promoCode) {
      const promoData = await prisma.usersOnDiscountCodes.findFirst({
        where: {
          userId: user.id,
          discountCode: {
            code: promoCode,
          },
        },
        select: {
          id: true,
          isUsed: true,
          discountCode: {
            select: {
              discountPercent: true,
            },
          },
        },
      })

      if (!promoData) {
        throw { status: 404, message: `You are not using '${promoCode}'` }
      }

      if (promoData.isUsed) {
        throw { status: 400, message: `You already use '${promoCode}'` }
      }

      discountPercent = promoData.discountCode.discountPercent
    }

    // calculate total
    const tax = 0
    const plusTax = subtotal + tax
    const total = plusTax - (discountPercent / 100) * plusTax

    // check requirements from req.body
    let invalidRequirements = []
    for (const categorySlug of distinctCategories) {
      const category = await prisma.category.findUnique({
        where: { slug: categorySlug },
        select: {
          requirement: {
            select: {
              fields: {
                select: { value: true },
              },
            },
          },
        },
      })

      //   skip if category doesn't has any requirement
      if (!category.requirement) continue

      if (!requirements?.[categorySlug]) {
        invalidRequirements.push(categorySlug)
        continue
      }

      const requiredFields = category.requirement.fields.map(
        (field) => field.value
      )

      const isRequirementExist = requiredFields.every((requiredField) => {
        return (
          requiredField in requirements[categorySlug] &&
          requirements[categorySlug][requiredField]
        )
      })

      if (!isRequirementExist) {
        invalidRequirements.push(categorySlug)
      }
    }

    if (invalidRequirements.length > 0) {
      // delete unfinished order
      await prisma.order.delete({ where: { id: order.id } })
      throw {
        status: 400,
        message: 'Please provide valid requirements',
        invalidRequirements,
      }
    }

    // create payment url and token
    const userName = user?.name ?? reqUser?.name
    const userEmail = user?.email ?? reqUser?.email

    let paymentData: CustomObject = {
      transaction_details: {
        order_id: order.id,
        gross_amount: total,
      },
      credit_card: {
        secure: true,
      },
      item_details: [
        ...order.products.map((item) => ({
          id: item.product.id,
          price: item.product.price,
          quantity: item.amount,
          name: item.product.title,
        })),
      ],
    }

    if (tax > 0) {
      paymentData.item_details = [
        ...paymentData.item_details,
        {
          id: 'tax',
          price: tax,
          quantity: 1,
          name: 'Tax',
        },
      ]
    }

    if (discountPercent > 0) {
      paymentData.item_details = [
        ...paymentData.item_details,
        {
          id: 'discount',
          price: -((discountPercent / 100) * plusTax),
          quantity: 1,
          name: 'Discount',
        },
      ]
    }

    if (userName || userEmail) {
      paymentData.customer_details = {}
      if (userName) paymentData.customer_details.first_name = userName
      if (userEmail) paymentData.customer_details.email = userEmail
    }

    try {
      const { token, redirect_url } = await snap.createTransaction(paymentData)

      let fullOrder = await prisma.order.update({
        where: { id: order.id },
        data: {
          total,
          tax,
          paymentToken: token,
          paymentUrl: redirect_url,
          requirements,
        },
        include: {
          user: true,
          products: {
            select: {
              product: { include: { category: true } },
            },
          },
          rating: true,
        },
      })

      // @ts-ignore
      fullOrder.products = fullOrder.products.map(({ product }) => product)

      res.status(201).json({ order: fullOrder })
    } catch (err) {
      if (err.name == 'MidtransError') {
        throw {
          status: err.httpStatusCode,
          message: err.ApiResponse.error_messages,
        }
      }
      throw err
    }
  })
