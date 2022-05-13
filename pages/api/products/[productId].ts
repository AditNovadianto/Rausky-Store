import apiHandler, { checkAuth } from '../../../lib/apiHandler'
import prisma from '../../../lib/prisma'

export default apiHandler
  // edit product
  .put(checkAuth('ADMIN'), async (req, res) => {
    const { title, description, price, discount, category } = req.body
    if (!title && !description && !price && !discount && !category) {
      throw {
        status: 400,
        message:
          'Please provide title or description or price or discount or category',
      }
    }
    const product = await prisma.product.update({
      where: { id: req.query.productId as string },
      data: { title, description, price, discount, category },
    })
    res.status(200).json({ product })
  })
  // delete product
  .delete(checkAuth('ADMIN'), async (req, res) => {
    const productId = req.query.productId as string
    await prisma.product.delete({
      where: { id: productId },
    })
    res.status(200).json({ message: `Success delete productId ${productId}` })
  })
