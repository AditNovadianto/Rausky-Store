import { GlobalState } from 'little-state-machine'

export const getProductInCart = (product, cart) => {
  const idx = cart.findIndex((item) => item.id == product.id)
  const isProductInCart = idx >= 0
  const productInCart = cart[idx]
  return { isProductInCart, idx, productInCart }
}

const isRequirementInOrder = (categoryRequirements, newRequirement) => {
  const requirement = categoryRequirements.find(
    (requirement) => requirement.id == newRequirement.id
  )
  return requirement
}

export const countTotal = (cart, order) => {
  const subtotal = cart.reduce((total, item) => {
    total += item.amount * item.price
    return total
  }, 0)

  const total = subtotal + order.tax - order.discount

  return { total, subtotal }
}

export const addToCart = (
  state: GlobalState,
  payload: { product; category?: any }
): GlobalState => {
  const product = {
    ...payload.product,
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

  const newState = {
    ...state,
    cart: newCart,
    order: {
      ...state.order,
      subtotal,
      total,
    },
  }

  if (payload.category?.requirement) {
    const newRequirement = {
      categorySlug: payload.category.slug,
      categoryName: payload.category.name,
      categoryLogo: payload.category.logoImg,
      ...payload.category.requirement,
    }
    if (
      !isRequirementInOrder(newState.order.categoryRequirements, newRequirement)
    ) {
      newState.order.categoryRequirements.push(newRequirement)
    }
  }

  return newState
}

export const decrementAmount = (
  state: GlobalState,
  payload: { product }
): GlobalState => {
  const newCart = [...state.cart]
  let newCategoryRequirements = [...state.order.categoryRequirements]

  const { idx, productInCart } = getProductInCart(payload.product, state.cart)
  const newAmount = productInCart.amount - 1
  if (newAmount <= 0) {
    newCart.splice(idx, 1)

    const isProductHasRequirement = state.order.categoryRequirements.find(
      (req) => req.categorySlug == productInCart.category.slug
    )

    // if product has requirement, update categoryRequirements
    if (isProductHasRequirement) {
      // get different category slugs
      const diffCategorySlugs = []
      for (const product of newCart) {
        const categorySlug = product.category.slug
        if (!diffCategorySlugs.includes(categorySlug)) {
          diffCategorySlugs.push(categorySlug)
        }
      }

      newCategoryRequirements = newCategoryRequirements.filter((req) => {
        return diffCategorySlugs.includes(req.categorySlug)
      })

      console.log('newCategoryReq', newCategoryRequirements)
    }
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
      categoryRequirements: newCategoryRequirements,
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

export const editRequirement = (
  state: GlobalState,
  payload: {
    categorySlug: string
    fieldName: string
    fieldValue: string
  }
) => {
  const newRequirements = { ...state.order.requirements }

  newRequirements[payload.categorySlug] = {
    ...newRequirements[payload.categorySlug],
    [payload.fieldName]: payload.fieldValue,
  }

  return {
    ...state,
    order: {
      ...state.order,
      requirements: newRequirements,
    },
  }
}

export const setRequirements = (state, payload) => {
  return {
    ...state,
    order: {
      ...state.order,
      requirements: payload,
    },
  }
}
