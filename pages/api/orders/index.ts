import apiHandler, { checkAuth } from '../../../lib/apiHandler'
import midtransClient from 'midtrans-client'

let snap = new midtransClient.Snap({
  // Set to true if you want Production Environment (accept real transaction).
  isProduction: false,
  serverKey: process.env.MIDTRANS_SERVER_KEY,
})

export default apiHandler
  // create new order
  .post(checkAuth(), async (req, res) => {
    const { products, requirements } = req.body
    if (!products || products.length == 0 || !requirements) {
      throw {
        status: 400,
        message:
          'please provide valid products ([] of { id, amount, categorySlug }), requirements',
      }
    }

    const order = await prisma.order.create({
      data: {
        userId: req.user.id,
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

    // calculate total
    let tax = 0
    let total = subtotal + tax

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

      const requiredFields = category.requirement.fields.map(
        (field) => field.value
      )

      const isRequirementExist = requiredFields.every((requiredField) => {
        return (
          requirements[categorySlug] &&
          requiredField in requirements[categorySlug] &&
          requirements[categorySlug][requiredField]
        )
      })
      if (!isRequirementExist) {
        invalidRequirements.push(categorySlug)
      }
    }

    if (invalidRequirements.length > 0) {
      throw {
        status: 400,
        message: 'Please provide valid requirements',
        invalidRequirements,
      }
    }

    // create payment url and token
    let parameter = {
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
          name: `${item.product.title} ${item.product.category.name}`,
        })),
        {
          id: 'tax',
          price: tax,
          quantity: 1,
          name: 'Pajak bos',
        },
      ],
      customer_details: {
        first_name: req.user.name,
        email: req.user.email,
      },
    }

    const { token, redirect_url } = await snap.createTransaction(parameter)

    const fullOrder = await prisma.order.update({
      where: { id: order.id },
      data: {
        total,
        tax,
        paymentToken: token,
        paymentUrl: redirect_url,
      },
    })

    res.status(201).json({ order: fullOrder })
  })
