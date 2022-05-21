import apiHandler, { checkAuth } from '../../../lib/apiHandler'
import prisma from '../../../lib/prisma'

export const getAllCategories = async ({ select }) => {
  let selectFields = select?.split(',').reduce((acc, field) => {
    acc[field] = true
    return acc
  }, {})

  const categories = await prisma.category.findMany({
    select: selectFields,
  })

  return categories
}

export default apiHandler
  // get all categories
  .get(async (req, res) => {
    const { select } = req.query as {
      [key: string]: string
    }

    const categories = await getAllCategories({ select })
    res.status(200).json({ categories, length: categories.length })
  })
  // create new category
  .post(checkAuth('ADMIN'), async (req, res) => {
    if (!req.body.name) {
      throw { status: 400, message: 'Please provide name' }
    }

    req.body.slug = req.body.name.toLowerCase().replace(/ /g, '-')

    const category = await prisma.category.create({
      data: req.body,
    })

    res.status(201).json({ category })
  })
