import { Category } from '@prisma/client'
import apiHandler, { checkAuth } from '../../../lib/apiHandler'

export default apiHandler
  // set discount to all products in category
  .post(checkAuth('ADMIN'), async (req, res) => {
    const { discount, category } = req.body
    if (discount == undefined) {
      throw { status: 400, message: 'Please provide discount' }
    }

    let categoryId

    if (category) {
      categoryId = (
        await prisma.category.findUnique({
          where: {
            slug: category,
          },
        })
      )?.id
    }

    const products = await prisma.product.updateMany({
      where: { categoryId },
      data: { discount },
    })

    res.status(200).json({ updatedProducts: products.count })
  })
