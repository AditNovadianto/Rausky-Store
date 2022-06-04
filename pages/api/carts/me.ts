import apiHandler, { checkAuth } from '../../../lib/apiHandler'
import prisma from '../../../lib/prisma'

const app = apiHandler()

export default app
  // get my cart
  .get(checkAuth(), async (req, res) => {
    const myCart = await prisma.cart.findUnique({
      where: { userId: req.user.id },
    })
    res.status(200).json({ cart: myCart ?? [] })
  })
  //   create or update my cart
  .put(checkAuth(), async (req, res) => {
    const { products } = req.body
    if (!products) {
      throw { status: 400, message: 'Please provide products' }
    }
    const myCart = await prisma.cart.upsert({
      where: { userId: req.user.id },
      create: { products, userId: req.user.id },
      update: { products },
    })
    res.status(200).json({ cart: myCart })
  })
