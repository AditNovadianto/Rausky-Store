import apiHandler from '../../../lib/apiHandler'
import prisma from '../../../lib/prisma'

const app = apiHandler()

export default app
  // create rating
  .post(async (req, res) => {
    const { star, comment, orderId } = req.body
    const rating = await prisma.rating.create({
      data: {
        star,
        comment,
        orderId,
      },
    })
    res.status(201).json({ rating })
  })
