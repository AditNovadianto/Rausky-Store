import apiHandler from '../../../lib/apiHandler'
import prisma from '../../../lib/prisma'

const app = apiHandler()

export default app
  .get(async (req, res) => {
    const order = await prisma.order.findUnique({
      where: { id: req.query.orderId as string },
      include: {
        user: true,
        rating: true,
        products: {
          select: {
            product: { include: { category: true } },
            amount: true,
          },
        },
      },
    })

    //   @ts-ignore
    order.products = order.products.map(({ product, amount }) => ({
      ...product,
      amount,
    }))
    res.status(200).json({ order })
  })
  .put(async (req, res) => {
    const { paymentMethod, status, paidAt } = req.body

    const where = { id: req.query.orderId as string }

    const include = {
      user: true,
      rating: true,
      products: {
        select: {
          product: { include: { category: true } },
          amount: true,
        },
      },
    }

    let order = await prisma.order.findUnique({
      where,
      include,
    })

    if (order.status == 'WAITING_PAYMENT') {
      order = await prisma.order.update({
        where,
        data: {
          paymentMethod,
          status,
          paidAt,
        },
        include,
      })
    }

    //   @ts-ignore
    order.products = order.products.map(({ product, amount }) => ({
      ...product,
      amount,
    }))
    res.status(200).json({ order })
  })
  .delete(async (req, res) => {
    await prisma.order.delete({ where: { id: req.query.orderId as string } })
    res.status(200).send(`success delete order with id ${req.query.orderId}`)
  })
