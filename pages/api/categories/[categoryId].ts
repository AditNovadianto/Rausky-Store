import apiHandler, { checkAuth } from '../../../lib/apiHandler'
import prisma from '../../../lib/prisma'

export const getSpecificCategory = async ({
  categorySlug,
}: {
  categorySlug: string
  userId?: string
}) => {
  const category = await prisma.category.findUnique({
    where: {
      slug: categorySlug,
    },
    include: {
      products: {
        orderBy: { price: 'asc' },
        include: {
          subCategory: { select: { name: true, slug: true } },
          category: { select: { name: true, slug: true, logoImg: true } },
        },
      },
      subCategories: true,
      requirement: {
        include: {
          fields: {
            select: { placeholder: true, type: true, id: true, value: true },
          },
        },
      },
    },
  })

  return category
}

export default apiHandler
  // get specific category + among all products
  .get(async (req, res) => {
    const { categoryId: categorySlug } = req.query as {
      [key: string]: string
    }
    const category = await getSpecificCategory({ categorySlug })
    res.status(200).json({ category })
  })
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
