import apiHandler from '../../../lib/apiHandler'
import prisma from '../../../lib/prisma'

const app = apiHandler()

export const getRatings = async () => {
  const { _avg } = await prisma.rating.aggregate({
    _avg: {
      star: true,
    },
  })
  const ratings = await prisma.rating.findMany({
    orderBy: { updatedAt: 'desc' },
    include: {
      order: {
        select: {
          user: true,
          products: {
            select: {
              amount: true,
              product: {
                select: {
                  title: true,
                },
              },
            },
          },
        },
      },
    },
  })
  return {
    avg: Number(_avg.star.toFixed(1)),
    ratings,
    count: ratings.length,
  }
}

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
  // aggregate rating
  .get(async (req, res) => {
    const ratings = await getRatings()
    res.status(200).json(ratings)
  })
