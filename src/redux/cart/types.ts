export type CartItem = {
  id: string
  title: string
  price: number
  count: number
  imageUrl: string
  size: number
  type: string
  description: string
}

export interface CartSliceState {
  totalPrice: number
  items: CartItem[]
}
