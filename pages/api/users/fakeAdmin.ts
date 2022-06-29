import { Role } from '@prisma/client'
import apiHandler, { checkAuth } from '../../../lib/apiHandler'
import prisma from '../../../lib/prisma'

const app = apiHandler()

export default app
  // make user fake admin
  .put(checkAuth(), async (req, res) => {
    const user = await prisma.user.findUnique({
      where: { id: req.user.id },
    })

    let role: Role = user.role != 'FAKE_ADMIN' ? 'FAKE_ADMIN' : 'USER'

    const updatedUser = await prisma.user.update({
      where: {
        id: req.user.id,
      },
      data: {
        role,
      },
    })
    res.status(200).json({ user: updatedUser })
  })
