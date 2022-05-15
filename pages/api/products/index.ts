import { Category } from '@prisma/client'
import apiHandler, { checkAuth } from '../../../lib/apiHandler'
import prisma from '../../../lib/prisma'

export default apiHandler
  // get all products
  .get(async (req, res) => {
    const { category, from, to, discount } = req.query as {
      [key: string]: string
    }

    const products = await prisma.product.findMany({
      where: {
        category: {
          in: category?.split(',') as Category[],
        },
        price: { gte: from && +from, lte: to && +to },
        discount: { gt: discount == 'true' ? 0 : undefined },
      },
    })
    res.status(200).json({ products, length: products.length })
  })
  // create new product
  .post(checkAuth('ADMIN'), async (req, res) => {
    const { title, description, price, discount, category, stock } = req.body

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
        stock,
        userId: req.user.id,
      },
    })

    res.status(201).json({ product })
  })
