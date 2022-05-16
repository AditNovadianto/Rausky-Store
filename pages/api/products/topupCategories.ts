import apiHandler from '../../../lib/apiHandler'
import prisma from '../../../lib/prisma'

const capitalize = (str: string) => {
  return str[0].toUpperCase() + str.slice(1).toLocaleLowerCase()
}

export default apiHandler
  // get all topup categories
  .get(async (req, res) => {
    const categories = (
      await prisma.product.findMany({
        distinct: 'category',
        where: {
          category: { notIn: ['UNCATEGORIZE', 'GAMING_GEAR', 'MERCHANDISE'] },
        },
        select: { category: true },
      })
    ).map(({ category }) => ({
      label: capitalize(category.replace('_', ' ')),
      slug: category.replace('_', '-').toLowerCase(),
    }))
    res.status(200).json({ categories })
  })
