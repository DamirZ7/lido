import axios from 'axios'
import { createSlice, createAsyncThunk, PayloadAction } from '@reduxjs/toolkit'
import { RootState } from '../store'
import { CartItem } from './cartSlice'
import { Sort } from './filterSlice'

type Pizza = {
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

interface PizzaSliceState {
  items: Pizza[]
  status: 'loading' | 'success' | 'failed'
}

const initialState: PizzaSliceState = {
  items: [],
  status: Status.LOADING, // loading | success | error
}

export type SearchPizzaParams = {
  category: string
  search: string
  sortBy: string
}

export const fetchPizzas = createAsyncThunk<Pizza[], SearchPizzaParams>(
  'pizza/fetchPizzasStatus',
  async (params) => {
    const { category, search, sortBy } = params
    console.log(params)
    console.log(sortBy)
    const { data } = await axios.get<Pizza[]>(
      `https://628f0d9a0e69410599d480ad.mockapi.io/items?${category}&sortBy=${sortBy}&order=desc${search}`,
    )

    return data
  },
)

const pizzaSlice = createSlice({
  name: 'pizza',
  initialState,
  reducers: {
    setItems(state, action: PayloadAction<Pizza[]>) {
      state.items = action.payload
    },
  },
  extraReducers: (builder) => {
    builder.addCase(fetchPizzas.fulfilled, (state, action) => {
      state.items = action.payload
      state.status = Status.SUCCESS
    })
    builder.addCase(fetchPizzas.pending, (state, action) => {
      state.status = Status.LOADING
      state.items = []
    })
    builder.addCase(fetchPizzas.rejected, (state, action) => {
      state.status = Status.FAILED
      state.items = []
    })
  },
  // extraReducers: {
  //   [fetchPizzas.pending]: (state) => {
  //     state.status = 'loading'
  //     state.items = []
  //   },
  //   [fetchPizzas.fulfilled]: (state, { payload }) => {
  //     state.items = payload
  //     state.status = 'success'
  //   },
  //   [fetchPizzas.rejected]: (state, action) => {
  //     state.status = 'failed'
  //     state.items = []
  //   },
  // },
})

export const selectPizzaData = (state: RootState) => state.pizza

export const { setItems } = pizzaSlice.actions

export default pizzaSlice.reducer
