import 'little-state-machine'
import { Category, Order, Product, Rating, User } from '@prisma/client'

declare module 'little-state-machine' {
  interface GlobalState {
    globalTheme: 'dark' | 'light'
    cart: (Product & {
      amount: number
      category: Category
    })[]
    order: {
      user: { name: string; email: string } | {}
      requirements: CustomObject
      categoryRequirements: CustomObject[]
      missingRequirements: CustomObject
      subtotal: number
      tax: number
      discount: number
      total: number
    }
    updatingDB: boolean
    updatedDB: boolean
  }
}
