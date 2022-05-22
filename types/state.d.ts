import 'little-state-machine'
import { Category, Product } from '@prisma/client'

declare module 'little-state-machine' {
  interface GlobalState {
    cart: (Product & {
      amount: number
      category: Category
    })[]
    order: {
      subtotal: number
      tax: number
      discount: number
      total: number
    }
  }
}
