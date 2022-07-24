import apiHandler, { checkAuth } from '../../../lib/apiHandler'
import prisma from '../../../lib/prisma'

export const getSpecificCategory = async ({
  categorySlug,
  includeProducts,
}: {
  categorySlug: string
  includeProducts?: boolean
}) => {
  let query: CustomObject = {
    where: {
      slug: categorySlug,
    },
    include: {
      subCategories: true,
      requirement: {
        include: {
          fields: {
            select: {
              placeholder: true,
              type: true,
              id: true,
              value: true,
              name: true,
            },
          },
        },
      },
    },
  }

  if (includeProducts) {
    query.include.products = {
      orderBy: { price: 'asc' },
      include: {
        subCategory: { select: { name: true, slug: true } },
        category: {
          select: {
            name: true,
            slug: true,
            logoImg: true,
            requirement: {
              include: {
                fields: {
                  select: {
                    placeholder: true,
                    type: true,
                    id: true,
                    value: true,
                    name: true,
                  },
                },
              },
            },
          },
        },
      },
    }
  }

  //   @ts-ignore
  const category = await prisma.category.findUnique(query)

  return category
}

const app = apiHandler()

export default app
  // get specific category
  .get(async (req, res) => {
    const { categoryId: categorySlug, includeProducts } = req.query as {
      [key: string]: string
    }
    const category = await getSpecificCategory({
      categorySlug,
      includeProducts: includeProducts == 'true' ? true : false,
    })
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
