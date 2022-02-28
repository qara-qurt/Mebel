import { createAsyncThunk, createSlice } from '@reduxjs/toolkit'
import axios from 'axios'

const initialState = {
  products:[],
  loading:false,
  error:null,
}

export const fetchCreateProduct = createAsyncThunk(
  'products/fetchCreateProduct',
  async (data,{rejectWithValue}) => {
      const url = 'https://mebel-f0c71-default-rtdb.europe-west1.firebasedatabase.app/products.json'
      try{
         const response = await axios.post(url,{
          name:data.name,
          description:data.description,
          price:data.price,
          size:data.size,
          colors:data.colors,
           material: data.material,
           type: data.type,
           date: data.date,
           views:data.views,
          photos:data.photos})
         if(response.status =='200'){
             return response.data
         }
      }catch(error){
          return rejectWithValue(error.messages)
      }
  }
)

export const fetchGetProducts = createAsyncThunk(
  'products/fetchGetProducts',
  async (_,{rejectWithValue}) => {
      const url = 'https://mebel-f0c71-default-rtdb.europe-west1.firebasedatabase.app/products.json'
      try{
         const response = await axios.get(url)
         if(response.status == '200'){
          return Object.keys(response.data).map((product) => ({ id: product, data: response.data[product] }));
         }
      }catch(error){
          return rejectWithValue(error.messages)
      }
  }
)


export const fetchSearchProducts = createAsyncThunk(
  'products/fetchSearchProducts',
  async (search,{rejectWithValue}) => {
    const url = 'https://mebel-f0c71-default-rtdb.europe-west1.firebasedatabase.app/products.json';
    try { 
      const response = await axios.get(url)
      if (response.status == '200') {
        return Object.keys(response.data)
          .map((product) => ({
            id: product,
            data: response.data[product],
          }))
          .filter((item) => {
            return (
              item.data.name.includes(search[0].toUpperCase() + search.slice(1)) ||
              item.data.description.includes(search[0].toUpperCase() + search.slice(1))
            );
          });
      }
    }catch(error) {
      return rejectWithValue(error.messages);
    }
  }
)

export const productSlice = createSlice({
  name: 'products',
  initialState,
  reducers: {
    setLoading:(state,action)=>{
      state.loading = action.payload
    }
  },
  extraReducers:{
    [fetchGetProducts.pending]:(state)=>{
      state.loading = true
    },
    [fetchGetProducts.fulfilled]:(state,action)=>{
      state.loading = false
      state.products = action.payload
    },
    [fetchGetProducts.rejected]:(state)=>{
      state.loading = false
      state.error = 'error'
    },

    ///SEARCH
    [fetchSearchProducts.pending]:(state)=>{
      state.loading = true
    },
    [fetchSearchProducts.fulfilled]: (state, action) => {
      state.loading = false
      state.products = action.payload
    },
    [fetchSearchProducts.rejected]: (state) => {
      state.loading = false
      state.error = 'error'
    }
  }
})

export const { setProducts,setLoading } = productSlice.actions

export default productSlice.reducer