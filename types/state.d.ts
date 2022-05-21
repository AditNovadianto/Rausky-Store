import 'little-state-machine'

declare module 'little-state-machine' {
  interface GlobalState {
    cart: {
      id: string
      amount: number
    }[]
  }
}
