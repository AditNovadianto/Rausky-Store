import apiHandler, { checkAuth } from '../../../lib/apiHandler'
import prisma from '../../../lib/prisma'

const app = apiHandler()

export default app
  // get my orders
  .get(checkAuth(), async (req, res) => {
    let orders = await prisma.order.findMany({
      where: {
        userId: req.user.id,
      },
      include: {
        products: {
          select: {
            product: { include: { category: true } },
            amount: true,
          },
        },
        rating: true,
      },
      orderBy: {
        paidAt: 'desc',
      },
    })

    // @ts-ignore
    orders = orders.map((order) => {
      const products = order.products.map(({ product, amount }) => ({
        ...product,
        amount,
      }))
      return { ...order, products }
    })

    res.status(200).json({ orders, length: orders.length })
  })
