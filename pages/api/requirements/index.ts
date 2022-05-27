import apiHandler, { checkAuth } from '../../../lib/apiHandler'
import prisma from '../../../lib/prisma'

export default apiHandler
  // get all users fields
  .get(checkAuth(), async (req, res) => {
    const usersFields = await prisma.usersFields.findMany({
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

    const requirements = {}
    usersFields.forEach((userField) => {
      const { field, value } = userField
      requirements[field.categoryRequirement.category.slug] = {
        ...requirements[field.categoryRequirement.category.slug],
        [field.value]: value,
      }
    })

    res.status(200).json({ requirements })
  })
