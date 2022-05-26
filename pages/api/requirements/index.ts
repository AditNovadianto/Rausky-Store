import apiHandler, { checkAuth } from '../../../lib/apiHandler'
import prisma from '../../../lib/prisma'

export default apiHandler
  // get all users fields
  .get(checkAuth(), async (req, res) => {
    const usersFields = (
      await prisma.usersFields.findMany({
        where: { userId: req.user.id },
        select: {
          id: true,
          value: true,
          field: {
            select: {
              categoryRequirement: {
                select: { category: { select: { slug: true } } },
              },
              value: true,
            },
          },
        },
      })
    ).map((userField) => {
      const { field, ...otherUserField } = userField
      return {
        ...otherUserField,
        categorySlug: field.categoryRequirement.category.slug,
        name: field.value,
      }
    })

    res.status(200).json({ usersFields })
  })
