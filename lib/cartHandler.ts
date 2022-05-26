import { GlobalState } from 'little-state-machine'

export const getProductInCart = (product, cart) => {
  const idx = cart.findIndex((item) => item.id == product.id)
  const isProductInCart = idx >= 0
  const productInCart = cart[idx]
  return { isProductInCart, idx, productInCart }
}

export const countTotal = (cart, order) => {
  const subtotal = cart.reduce((total, item) => {
    total += item.amount * item.price
    return total
  }, 0)

  const total = subtotal + order.tax - order.discount

  return { total, subtotal }
}

export const addToCart = (state: GlobalState, payload): GlobalState => {
  const product = {
    ...payload,
    amount: 1,
  }

  const newCart = [...state.cart]

  const { isProductInCart, idx } = getProductInCart(product, state.cart)
  if (isProductInCart) {
    newCart.splice(idx, 1, {
      ...product,
      amount: state.cart[idx].amount + 1,
    })
  } else {
    newCart.push(product)
  }

  const { subtotal, total } = countTotal(newCart, state.order)

  return {
    ...state,
    cart: newCart,
    order: {
      ...state.order,
      subtotal,
      total,
    },
  }
}

export const decrementAmount = (state, payload) => {
  const newCart = [...state.cart]
  const { idx, productInCart } = getProductInCart(payload, state.cart)
  const newAmount = productInCart.amount - 1
  if (newAmount <= 0) {
    newCart.splice(idx, 1)
  } else {
    newCart.splice(idx, 1, {
      ...productInCart,
      amount: newAmount,
    })
  }

  const { subtotal, total } = countTotal(newCart, state.order)
  return {
    ...state,
    cart: newCart,
    order: {
      ...state.order,
      subtotal,
      total,
    },
  }
}

export const removeFromCart = (state, payload) => {
  const newCart = [...state.cart]
  const { idx } = getProductInCart(payload, state.cart)
  newCart.splice(idx, 1)

  const { subtotal, total } = countTotal(newCart, state.order)
  return {
    ...state,
    cart: newCart,
    order: {
      ...state.order,
      subtotal,
      total,
    },
  }
}

export const editRequirementState = (state, payload) => {
  const newRequirements = [...state.order.requirements]

  const idx = newRequirements.findIndex((f) => f.name == payload.fieldName)
  let field = newRequirements[idx]

  if (!payload.fieldValue) {
    newRequirements.splice(idx, 1)
  } else if (!field) {
    field = {
      name: payload.fieldName,
      value: payload.fieldValue,
      categorySlug: payload.categorySlug,
    }
    newRequirements.push(field)
  } else {
    newRequirements.splice(idx, 1, {
      ...field,
      value: payload.fieldValue,
    })
  }

  return {
    ...state,
    order: {
      ...state.order,
      requirements: newRequirements,
    },
  }
}
