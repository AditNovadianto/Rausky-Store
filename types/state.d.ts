import 'little-state-machine'
import { Category, Product } from '@prisma/client'

declare module 'little-state-machine' {
  interface GlobalState {
    cart: (Product & {
      amount: number
      category: Category
    })[]
    order: {
      requirements: {
        fieldName: string
        fieldValue: string
        category: string
      }[]
      subtotal: number
      tax: number
      discount: number
      total: number
    }
  }
}
