import { createAsyncThunk, createSlice } from '@reduxjs/toolkit'
import axios from 'axios'



const initialState = localStorage.getItem("likes") == null ? {
    likes:[],
    likesCount :0
}:JSON.parse(localStorage.getItem('likes'))


export const fetchAddLike = createAsyncThunk(
    'like/fetchAddLike',
    async (data, { rejectWithValue }) => {
      const url = `https://mebel-f0c71-default-rtdb.europe-west1.firebasedatabase.app/products/${data.id}.json`
      try {
          const productResponse = await axios.get(url)
          const response = await axios.put(url,{...productResponse.data,views:productResponse.data.views+1})
          if(response.status =='200'){
             return data
           }
        }catch(error){
            return rejectWithValue(error.messages)
        }
    }
)


export const likeSlice = createSlice({
  name: 'like',
  initialState,
  reducers: {
    deleteLike:(state,action)=>{
      state.likesCount--
      state.likes = state.likes.filter(item=>{
        return item.id!==action.payload
      })
      localStorage.setItem('likes',JSON.stringify(state))
    }
  },
  extraReducers:{
    [fetchAddLike.fulfilled]:(state,action)=>{
      if(state.likes.length == 0){
        state.likes.push(action.payload)
        state.likesCount++
      }else{
         let isSimilar = false;
         state.likes.forEach(val=>{
           if(val.id == action.payload.id){
             isSimilar = true
           }
         })
         if(!isSimilar){
          state.likes.push(action.payload)
          state.likesCount++
         }
      }
      localStorage.setItem('likes',JSON.stringify(state))
    }
  }
})

export const { addLike,deleteLike } = likeSlice.actions

export default likeSlice.reducer