import apiHandler, { checkAuth } from '../../../lib/apiHandler'
import prisma from '../../../lib/prisma'

const app = apiHandler()

export default app.put(checkAuth(), async (req, res) => {
  const reqField = await prisma.categoryRequirementField.findFirst({
    where: { value: req.query.fieldName as string },
  })

  const reqMe = await prisma.usersFields.findFirst({
    where: {
      userId: req.user.id,
      fieldId: reqField.id,
    },
  })

  if (reqMe) {
    await prisma.categoryRequirementField.update({
      where: { id: reqField.id },
      data: {
        users: {
          update: {
            where: { id: reqMe.id },
            data: {
              value: req.body.fieldValue,
            },
          },
        },
      },
    })
  } else {
    await prisma.categoryRequirementField.update({
      where: { id: reqField.id },
      data: {
        users: {
          create: [
            {
              value: req.body.fieldValue,
              userId: req.user.id,
            },
          ],
        },
      },
    })
  }

  res.status(200).json({ message: 'success' })
})
