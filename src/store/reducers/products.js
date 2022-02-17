import { createSlice } from '@reduxjs/toolkit'

const initialState = {
  products:[]
}

export const productSlice = createSlice({
  name: 'products',
  initialState,
  reducers: {
    setProducts: (state,action) => {
      state.products.push(action.payload.data)
    },
  },
})

export const { setProducts } = productSlice.actions

export default productSlice.reducer