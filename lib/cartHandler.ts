import { GlobalState } from 'little-state-machine'
import request from './request'

export const getProductInCart = (product, cart) => {
  const idx = cart?.findIndex((item) => item.id == product.id)
  const isProductInCart = idx >= 0
  const productInCart = cart?.[idx]
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

  const plusTax = subtotal + order.tax

  const total = plusTax - (order.discount / 100) * plusTax

  return { total, subtotal }
}

const removeCategoryRequirement = ({
  productInCart,
  newCart,
  categoryRequirements,
}) => {
  const isProductHasRequirement = categoryRequirements.find(
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

    return categoryRequirements.filter((req) => {
      return diffCategorySlugs.includes(req.categorySlug)
    })
  }

  return categoryRequirements
}

const checkUserRequirement = ({ categorySlug, order }) => {
  const myRequirements = order.requirements[categorySlug]

  const requiredFields = order.categoryRequirements
    .find((req) => req.categorySlug == categorySlug)
    ?.fields.map((reqField) => ({ slug: reqField.value, label: reqField.name }))

  if (!requiredFields) {
    delete order.missingRequirements[categorySlug]
    return order.missingRequirements
  }

  order.missingRequirements[categorySlug] = {}

  requiredFields.forEach((reqField) => {
    if (
      !myRequirements ||
      !(reqField.slug in myRequirements) ||
      !myRequirements[reqField.slug]
    ) {
      order.missingRequirements[categorySlug][
        reqField.slug
      ] = `${reqField.label} required`
    } else {
      delete order.missingRequirements[categorySlug][reqField.slug]
    }
  })

  return order.missingRequirements
}

const updateUserCart = (products) => {
  return request.put('/carts/me', { products })
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

  //   store category requirement
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

  newState.order.missingRequirements = checkUserRequirement({
    categorySlug: payload.category?.slug,
    order: state.order,
  })

  updateUserCart(newCart)
  return newState
}

export const decrementAmount = (
  state: GlobalState,
  payload: { product }
): GlobalState => {
  let newCart = [...state.cart]
  let newOrder = { ...state.order }

  const { idx, productInCart } = getProductInCart(payload.product, state.cart)
  const newAmount = productInCart.amount - 1
  if (newAmount <= 0) {
    newCart.splice(idx, 1)
    newOrder.categoryRequirements = removeCategoryRequirement({
      productInCart,
      newCart,
      categoryRequirements: newOrder.categoryRequirements,
    })
    newOrder.missingRequirements = checkUserRequirement({
      categorySlug: payload.product.category.slug,
      order: newOrder,
    })
  } else {
    newCart.splice(idx, 1, {
      ...productInCart,
      amount: newAmount,
    })
  }

  const { subtotal, total } = countTotal(newCart, state.order)
  newOrder = { ...newOrder, subtotal, total }

  updateUserCart(newCart)

  return {
    ...state,
    cart: newCart,
    order: newOrder,
  }
}

export const removeFromCart = (state: GlobalState, payload): GlobalState => {
  let newCart = [...state.cart]
  let newOrder = { ...state.order }
  const { idx, productInCart } = getProductInCart(payload, state.cart)
  newCart.splice(idx, 1)

  newOrder.categoryRequirements = removeCategoryRequirement({
    productInCart,
    newCart,
    categoryRequirements: state.order.categoryRequirements,
  })

  newOrder.missingRequirements = checkUserRequirement({
    categorySlug: payload.category.slug,
    order: newOrder,
  })

  const { subtotal, total } = countTotal(newCart, state.order)
  newOrder = { ...newOrder, subtotal, total }
  updateUserCart(newCart)
  return {
    ...state,
    cart: newCart,
    order: newOrder,
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
  let newOrder = { ...state.order }

  newOrder.requirements[payload.categorySlug] = {
    ...newOrder.requirements[payload.categorySlug],
    [payload.fieldName]: payload.fieldValue,
  }

  newOrder.missingRequirements = checkUserRequirement({
    categorySlug: payload.categorySlug,
    order: newOrder,
  })

  return {
    ...state,
    order: newOrder,
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

export const setCart = (state: GlobalState, payload): GlobalState => {
  const newOrder = { ...state.order }
  const { total, subtotal } = countTotal(payload, state.order)
  newOrder.total = total
  newOrder.subtotal = subtotal

  //   TODO: set category requirements from db

  //   TODO: TEMP! verify each product requirement
  payload.forEach((product) => {
    //   store category requirement
    if (product.category?.requirement) {
      const newRequirement = {
        categorySlug: product.category.slug,
        categoryName: product.category.name,
        categoryLogo: product.category.logoImg,
        ...product.category.requirement,
      }
      if (
        !isRequirementInOrder(newOrder.categoryRequirements, newRequirement)
      ) {
        newOrder.categoryRequirements.push(newRequirement)
      }
    }

    newOrder.missingRequirements = checkUserRequirement({
      categorySlug: product.category?.slug,
      order: newOrder,
    })
  })

  return {
    ...state,
    cart: payload,
    order: {
      ...state.order,
      total,
      subtotal,
    },
  }
}
