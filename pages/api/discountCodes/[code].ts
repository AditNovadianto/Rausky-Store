import apiHandler, { checkAuth } from '../../../lib/apiHandler'
import prisma from '../../../lib/prisma'

const app = apiHandler()

app.get(checkAuth(), async (req, res) => {
  const { code } = req.query
  const discountCode = await prisma.discountCode.findUnique({
    where: { code: code as string },
  })

  if (!discountCode) {
    throw { status: 404, message: `Discount Code '${code}' is not available` }
  }

  if (discountCode.quota === 0) {
    throw { status: 404, message: `Discount Code '${code}' quota exhausted` }
  }

  // check if discount code date still valid
  const now = new Date()
  if (discountCode.validUntil && now > discountCode.validUntil) {
    throw { status: 403, message: `Discount Code '${code}' is no longer valid` }
  }

  const isCodeUsed = await prisma.usersOnDiscountCodes.findFirst({
    where: {
      discountCodeId: discountCode.id,
      userId: req.user.id,
    },
  })
  if (isCodeUsed) {
    res.status(200).json({
      message: `Discount Code '${code}' applied`,
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
    message: `Discount Code '${code}' applied`,
    promoCode: updatedPromoCode,
  })
})

export default app
