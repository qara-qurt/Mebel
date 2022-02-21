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

// const deleteImgFromCloud = async (photos) =>{
//   photos.map(async (photo) => {
//     console.log(photo.publicId);
//     const res = await axios.post('https://api.cloudinary.com/v1_1/mebelproject/image/destroy', photo.publicId)
//     if (res.status == 200) {
//       console.log(res);
//     }
//   })
// }

export const productSlice = createSlice({
  name: 'products',
  initialState,
  reducers: {
    setProducts: (state,action) => {
      state.products.push(action.payload.data)
    },
    setLoading:(state,action)=>{
      state.loading = action.payload
    }
  },
  extraReducers:{
  }
})

export const { setProducts,setLoading } = productSlice.actions

export default productSlice.reducer