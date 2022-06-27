import apiHandler, { checkAuth } from '../../../lib/apiHandler'
import prisma from '../../../lib/prisma'

const app = apiHandler()

export default app
  // edit product
  .put(checkAuth('ADMIN'), async (req, res) => {
    const product = await prisma.product.update({
      where: { id: req.query.productId as string },
      data: req.body,
      include: {
        subCategory: true,
      },
    })
    res.status(200).json({ product })
  })
  // delete product
  .delete(checkAuth('ADMIN'), async (req, res) => {
    const productId = req.query.productId as string

    const product = await prisma.product.delete({
      where: { id: productId },
    })

    res
      .status(200)
      .json({
        message: `Success delete productId ${productId}`,
        id: product.id,
      })
  })
