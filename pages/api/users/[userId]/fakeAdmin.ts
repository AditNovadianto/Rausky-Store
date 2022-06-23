import { Role } from '@prisma/client'
import apiHandler from '../../../../lib/apiHandler'
import prisma from '../../../../lib/prisma'

const app = apiHandler()

export default app
  // make user fake admin
  .put(async (req, res) => {
    const { userId } = req.query
    const user = await prisma.user.findUnique({
      where: { id: userId as string },
    })

    let role: Role = user.role != 'FAKE_ADMIN' ? 'FAKE_ADMIN' : 'USER'

    const updatedUser = await prisma.user.update({
      where: {
        id: userId as string,
      },
      data: {
        role,
      },
    })
    res.status(200).json({ user: updatedUser })
  })
