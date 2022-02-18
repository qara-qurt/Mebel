import { createAsyncThunk, createSlice } from '@reduxjs/toolkit'
import axios from 'axios'

const initialState = {
  products:[],
  loading:false,
}

export const fetchCreateProduct = createAsyncThunk(
  'products/fetchCreateProduct',
  async (data,{rejectWithValue}) => {
      const url = 'https://mebel-f0c71-default-rtdb.europe-west1.firebasedatabase.app/products.json'
      console.log(data.photos);
      try{
         const response = await axios.post(url,{
          name:data.name,
          description:data.description,
          price:data.price,
          size:data.size,
          colors:data.colors,
          material:data.material,
          photos:data.photos})
         if(response.status =='200'){
             return response.data
         }
      }catch(error){
          return rejectWithValue(error.messages)
      }
  }
)


export const productSlice = createSlice({
  name: 'products',
  initialState,
  reducers: {
    setProducts: (state,action) => {
      state.products.push(action.payload.data)
    },
  },
  extraReducers:{
    [fetchCreateProduct.pending]:(state)=>{
      state.loading = true
    },
    [fetchCreateProduct.fulfilled]:(state)=>{
      state.loading = false
    },
    [fetchCreateProduct.rejected]:(state)=>{
      state.loading = false
    },
  }
})

export const { setProducts } = productSlice.actions

export default productSlice.reducer