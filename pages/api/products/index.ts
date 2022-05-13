import apiHandler, { checkAuth } from '../../../lib/apiHandler'
import prisma from '../../../lib/prisma'

export default apiHandler
  // create new product
  .post(checkAuth('ADMIN'), async (req, res) => {
    const { title, description, price, discount, category } = req.body

    if (!title || !description || !price) {
      throw { status: 400, message: 'Please provide title, description, price' }
    }

    const product = await prisma.product.create({
      data: {
        title,
        description,
        price,
        discount,
        category,
        userId: req.user.id,
      },
    })

    res.status(201).json({ product })
  })
