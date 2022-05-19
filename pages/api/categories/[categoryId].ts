import apiHandler, { checkAuth } from '../../../lib/apiHandler'
import prisma from '../../../lib/prisma'

export default apiHandler
  // edit category
  .put(checkAuth('ADMIN'), async (req, res) => {
    const category = await prisma.category.update({
      where: { id: req.query.categoryId as string },
      data: req.body,
    })
    res.status(200).json({ category })
  })
  // delete category
  .delete(checkAuth('ADMIN'), async (req, res) => {
    const categoryId = req.query.categoryId as string
    await prisma.product.delete({
      where: { id: categoryId },
    })
    res.status(200).json({ message: `Success delete categoryId ${categoryId}` })
  })
