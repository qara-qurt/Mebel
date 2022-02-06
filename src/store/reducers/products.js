import { createSlice } from '@reduxjs/toolkit'

const initialState = {
  products:[]
}

export const counterSlice = createSlice({
  name: 'products',
  initialState,
  reducers: {
    setProducts: (state,action) => {
      state.products.push(action.payload.data)
    },
  },
})

export const { setProducts } = counterSlice.actions

export default counterSlice.reducer