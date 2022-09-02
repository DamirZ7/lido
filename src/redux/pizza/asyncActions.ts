import { createAsyncThunk } from '@reduxjs/toolkit'
import axios from 'axios'
import { Pizza, SearchPizzaParams } from './types'

export const fetchPizzas = createAsyncThunk<Pizza[], SearchPizzaParams>(
  'pizza/fetchPizzasStatus',
  async (params) => {
    const { category, search, sortBy } = params
    // console.log(params)
    // console.log(sortBy)
    const { data } = await axios.get<Pizza[]>(
      `https://628f0d9a0e69410599d480ad.mockapi.io/items?${category}&sortBy=${sortBy}&order=desc${search}`,
    )

    return data
  },
)
