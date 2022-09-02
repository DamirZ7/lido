import { createSlice, PayloadAction } from '@reduxjs/toolkit'
import { FilterSliceState, Sort, sortPropertyEnum } from './types'

export const initialState: FilterSliceState = {
  searchValue: '',
  categoryId: 0,
  sort: {
    name: 'популярности',
    sortProperty: sortPropertyEnum.RATING,
  },
}

const filterSlice = createSlice({
  name: 'filter',
  initialState,
  reducers: {
    setCategoryId(state, action: PayloadAction<number>) {
      state.categoryId = action.payload
    },
    setSearchValue(state, action: PayloadAction<string>) {
      state.searchValue = action.payload
    },
    setSort(state, action: PayloadAction<Sort>) {
      state.sort = action.payload
    },
    setFilters(state, action: PayloadAction<FilterSliceState>) {
      if (Object.keys(action.payload).length) {
        state.categoryId = Number(action.payload.categoryId)
        state.sort = action.payload.sort
      } else {
        state.categoryId = 1
        state.sort = {
          name: 'популярности',
          sortProperty: sortPropertyEnum.RATING,
        }
      }
    },
  },
})

export const { setCategoryId, setSort, setFilters, setSearchValue } = filterSlice.actions

export default filterSlice.reducer
