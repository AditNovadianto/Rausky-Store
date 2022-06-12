import 'little-state-machine'
import { Category, Order, Product, User } from '@prisma/client'

declare module 'little-state-machine' {
  interface GlobalState {
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
    orderFinish: Order & {
      products: (Product & {
        category: Category
      })[]
      user: User
    }
    updatingDB: boolean
    updatedDB: boolean
  }
}
