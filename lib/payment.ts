import request from './request'

export const attachMidtransScript = () => {
  let scriptTag = document.createElement('script')
  scriptTag.type = 'text/javascript'
  scriptTag.src = 'https://app.sandbox.midtrans.com/snap/snap.js'
  scriptTag.id = 'midtrans-script'

  const myMidtransClientKey = process.env.NEXT_PUBLIC_MIDTRANS_CLIENT_KEY
  scriptTag.setAttribute('data-client-key', myMidtransClientKey)

  document.body.appendChild(scriptTag)
}

export const removeMidtransScript = () => {
  document.getElementById('midtrans-script').remove()
}

export const checkout = async ({ products, order, user }) => {
  try {
    const { data } = await request.post('/orders', {
      products: products.map((product) => ({
        id: product.id,
        amount: product.amount,
      })),
      requirements: order.requirements,
      user: !user ? order.user : null,
    })
    return data.order
  } catch (err) {
    console.log(err)
  }
}

export const handleSuccessPayment = async ({ result }) => {
  await request.put(`/orders/${result.order_id}`, {
    paymentMethod: result.payment_type,
    status: 'PAID',
    paidAt: new Date(result.transaction_time).toISOString(),
  })
}

export const handleUnfinishPayment = async ({ orderId }) => {
  await request.delete(`/orders/${orderId}`)
}

export const clearOrder = (state) => {
  request.delete('/carts/me')
  return {
    ...state,
    cart: [],
    order: {
      ...state.order,
      categoryRequirements: [],
      missingRequirements: {},
      subtotal: 0,
      tax: 0,
      discount: 0,
      total: 0,
    },
  }
}
