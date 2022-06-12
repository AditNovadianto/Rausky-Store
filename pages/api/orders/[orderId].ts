import apiHandler from '../../../lib/apiHandler'

const app = apiHandler()

export default app
  .get(async (req, res) => {
    const order = await prisma.order.findUnique({
      where: { id: req.query.orderId as string },
      include: {
        user: true,
        products: {
          select: {
            product: { include: { category: true } },
          },
        },
      },
    })

    //   @ts-ignore
    order.products = order.products.map(({ product }) => product)
    res.status(200).json({ order })
  })
  .put(async (req, res) => {
    const { paymentMethod, status, paidAt } = req.body
    const order = await prisma.order.update({
      where: {
        id: req.query.orderId as string,
      },
      data: {
        paymentMethod,
        status,
        paidAt,
      },
      include: {
        user: true,
        products: {
          select: {
            product: { include: { category: true } },
          },
        },
      },
    })

    //   @ts-ignore
    order.products = order.products.map(({ product }) => product)
    res.status(200).json({ order })
  })
