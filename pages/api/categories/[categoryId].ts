import { Prisma } from '@prisma/client'
import { getSession } from 'next-auth/react'
import apiHandler, { checkAuth } from '../../../lib/apiHandler'
import prisma from '../../../lib/prisma'

export const getSpecificCategory = async ({
  categorySlug,
  userId,
}: {
  categorySlug: string
  userId?: string
}) => {
  console.log('userId', userId)
  const query: {
    select?: Prisma.CategorySelect
    include?: Prisma.CategoryInclude
    rejectOnNotFound?: Prisma.RejectOnNotFound
    where: Prisma.CategoryWhereUniqueInput
  } = {
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
          fields: true,
        },
      },
    },
  }
  if (userId) {
    query.include.requirement = {
      include: {
        fields: {
          include: {
            users: {
              where: { userId },
              select: { value: true },
            },
          },
        },
      },
    }
  }

  const category = await prisma.category.findUnique(query)

  //   @ts-ignore
  if (userId && category.requirement) {
    //   @ts-ignore
    category.requirement.fields = category.requirement.fields.map((field) => {
      const { users, ...fieldProps } = field
      return { ...fieldProps, fieldValue: users[0]?.value ?? '' }
    })
  }
  return category
}

export default apiHandler
  // get specific category + among all products
  .get(async (req, res) => {
    const { categoryId: categorySlug } = req.query as {
      [key: string]: string
    }
    const session = await getSession({ req })
    const category = await getSpecificCategory({
      categorySlug,
      userId: session?.user.id,
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
