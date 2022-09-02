export type Pizza = {
  id: string
  title: string
  price: number
  count: number
  imageUrl: string
  sizes: number[]
  types: string[]
  description: string
}

export enum Status {
  LOADING = 'loading',
  SUCCESS = 'success',
  FAILED = 'failed',
}

export interface PizzaSliceState {
  items: Pizza[]
  status: 'loading' | 'success' | 'failed'
}

export type SearchPizzaParams = {
  category: string
  search: string
  sortBy: string
}
