import { Category } from '@prisma/client'
import apiHandler, { checkAuth } from '../../../lib/apiHandler'

export default apiHandler
  // set discount to all products in category
  .post(checkAuth('ADMIN'), async (req, res) => {
    const { discount, category } = req.body
    if (!discount) {
      throw { status: 400, message: 'Please provide discount' }
    }
    const products = await prisma.product.updateMany({
      where: { category: { equals: category as Category } },
      data: { discount },
    })

    res.status(200).json({ updatedProducts: products.count })
  })
