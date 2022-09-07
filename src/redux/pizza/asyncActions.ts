import { createAsyncThunk } from '@reduxjs/toolkit'
import axios from 'axios'
import { Pizza, SearchPizzaParams } from './types'
import pickBy from 'lodash/pickBy'
import identity from 'lodash/identity'

export const fetchPizzas = createAsyncThunk<Pizza[], SearchPizzaParams>(
  'pizza/fetchPizzasStatus',
  async (params) => {
    const { category, search, sortBy } = params

    // const { data } = await axios.get<Pizza[]>(
    //   `https://628f0d9a0e69410599d480ad.mockapi.io/items?${category}&sortBy=${sortBy}&order=desc${search}`,
    // )
    const { data } = await axios.get<Pizza[]>(`https://628f0d9a0e69410599d480ad.mockapi.io/items`, {
      params: pickBy(
        {
          category,
          sortBy,
          search,
        },
        identity,
      ),
    })

    return data
  },
)
