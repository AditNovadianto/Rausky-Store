import apiHandler, { checkAuth } from '../../../lib/apiHandler'
import prisma from '../../../lib/prisma'

export default apiHandler
  // get all products
  .get(async (req, res) => {
    const { category, from, to, discount } = req.query as {
      [key: string]: string
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

    const products = await prisma.product.findMany({
      where: {
        price: { gte: from && +from, lte: to && +to },
        discount: { gt: discount == 'true' ? 0 : undefined },
        categoryId,
      },
    })
    res.status(200).json({ products, length: products.length })
  })
  // create new product
  .post(checkAuth('ADMIN'), async (req, res) => {
    const { title, description, price, discount, category, stock } = req.body

    if (!title || !price) {
      throw { status: 400, message: 'Please provide title, price' }
    }

    const product = await prisma.product.create({
      data: {
        title,
        description,
        price,
        discount,
        stock,
        category: { connect: { slug: category } },
        user: { connect: { id: req.user.id } },
      },
    })

    res.status(201).json({ product })
  })
