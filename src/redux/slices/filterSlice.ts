import { createSlice, PayloadAction } from '@reduxjs/toolkit'
import { RootState } from '../store'

export enum sortPropertyEnum {
  RATING = 'rating',
  TITLE = 'title',
  PRICE = 'price',
}

export type Sort = {
  name: string
  sortProperty: sortPropertyEnum
}

export interface FilterSliceState {
  searchValue: string
  categoryId: number
  sort: Sort
}

const initialState: FilterSliceState = {
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

export const selectFilter = (state: RootState) => state.filter
export const selectSort = (state: RootState) => state.filter.sort

export const { setCategoryId, setSort, setFilters, setSearchValue } = filterSlice.actions

export default filterSlice.reducer
