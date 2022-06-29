import apiHandler, { checkAuth } from '../../../lib/apiHandler'
import prisma from '../../../lib/prisma'

const app = apiHandler()

export default app
  // edit user's display name
  .put(checkAuth(), async (req, res) => {
    await prisma.user.update({
      where: { id: req.user.id },
      data: {
        displayName: req.body.displayName,
      },
    })
    res.status(200).json({
      message: `Success update user's display name with id ${req.user.id}`,
    })
  })
