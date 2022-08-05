import apiHandler, { checkAuth } from '../../../lib/apiHandler'
import prisma from '../../../lib/prisma'

const app = apiHandler()

app.get(checkAuth(), async (req, res) => {
  const { code } = req.query
  const discountCode = await prisma.discountCode.findUnique({
    where: { code: code as string },
  })

  if (!discountCode) {
    throw { status: 404, message: `Promo Code '${code}' is not available` }
  }

  if (discountCode.quota === 0) {
    throw { status: 404, message: `Promo Code '${code}' quota exhausted` }
  }

  // check if Promo code date still valid
  const now = new Date()
  if (discountCode.validUntil && now > discountCode.validUntil) {
    throw { status: 403, message: `Promo Code '${code}' is no longer valid` }
  }

  const promoData = await prisma.usersOnDiscountCodes.findFirst({
    where: {
      discountCodeId: discountCode.id,
      userId: req.user.id,
    },
  })
  if (promoData) {
    if (promoData.isUsed) {
      throw { status: 400, message: `You already use '${code}'` }
    }
    res.status(200).json({
      message: `Promo Code '${code}' applied`,
      promoCode: {
        code: discountCode.code,
        discountPercent: discountCode.discountPercent,
      },
    })
    return
  }

  const updatedPromoCode = await prisma.discountCode.update({
    where: {
      code: code as string,
    },
    data: {
      quota: { decrement: 1 },
      users: {
        create: {
          userId: req.user.id,
        },
      },
    },
    select: {
      discountPercent: true,
      code: true,
    },
  })

  res.status(200).json({
    message: `Promo Code '${code}' applied`,
    promoCode: updatedPromoCode,
  })
})

app.put(checkAuth(), async (req, res) => {
  const { code } = req.query

  const promoData = await prisma.usersOnDiscountCodes.findFirst({
    where: {
      userId: req.user.id,
    },
    select: {
      id: true,
    },
  })

  if (!promoData) {
    throw { status: 404, message: `Promo Code '${code}' is not available` }
  }

  await prisma.usersOnDiscountCodes.update({
    where: {
      id: promoData.id,
    },
    data: {
      isUsed: true,
    },
  })

  res.status(200).json({ message: 'Promo Code Updated' })
})

export default app
