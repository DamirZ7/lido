import { createSlice, PayloadAction } from '@reduxjs/toolkit'

import { fetchPizzas } from './asyncActions'
import { Pizza, PizzaSliceState, SearchPizzaParams, Status } from './types'

const initialState: PizzaSliceState = {
  items: [],
  status: Status.LOADING, // loading | success | error
}

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

export const { setItems } = pizzaSlice.actions

export default pizzaSlice.reducer
