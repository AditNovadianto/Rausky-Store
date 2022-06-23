import apiHandler, { checkAuth } from '../../../lib/apiHandler'
import prisma from '../../../lib/prisma'

const app = apiHandler()

export default app
  // get all products
  .get(async (req, res) => {
    const { category, from, to, discount } = req.query as {
      [key: string]: string
    }

    const products = await prisma.product.findMany({
      where: {
        price: { gte: from && +from, lte: to && +to },
        discount: { gt: discount == 'true' ? 0 : undefined },
        category: { slug: category },
      },
    })
    res.status(200).json({ products, length: products.length })
  })

  //   TODO: atur biar gambar product otomatis ngikutin category / subCategory img
  // create new product
  .post(checkAuth('ADMIN'), async (req, res) => {
    if (Array.isArray(req.body)) {
      const products = await Promise.all(
        req.body.map((product) => {
          const { title, price, category, subCategory } = product
          if (!title || !price) {
            throw { status: 400, message: 'Please provide title, price' }
          }
          if (typeof price == 'string') {
            product.price = Number(price)
          }
          if (subCategory) {
            product.subCategory = { connect: { slug: subCategory } }
          }
          return prisma.product.create({
            data: {
              ...product,
              category: { connect: { slug: category } },
              user: { connect: { id: req.user.id } },
            },
          })
        })
      )

      res.status(201).json({ products, count: products.length })
    } else {
      const { title, price, category, subCategory } = req.body

      if (!title || !price) {
        throw { status: 400, message: 'Please provide title, price' }
      }

      if (typeof price == 'string') {
        req.body.price = Number(price)
      }

      if (subCategory) {
        req.body.subCategory = { connect: { slug: subCategory } }
      }

      const product = await prisma.product.create({
        data: {
          ...req.body,
          category: { connect: { slug: category } },
          user: { connect: { id: req.user.id } },
        },
      })

      res.status(201).json({ product })
    }
  })
