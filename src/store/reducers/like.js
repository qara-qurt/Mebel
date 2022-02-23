import { createSlice } from '@reduxjs/toolkit'



const initialState = localStorage.getItem("likes") == null ? {
    likes:[],
    likesCount :0
}:JSON.parse(localStorage.getItem('likes'))

export const likeSlice = createSlice({
  name: 'like',
  initialState,
  reducers: {
    addLike:(state,action)=>{
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
    },
    deleteLike:(state,action)=>{
      state.likesCount--
      state.likes = state.likes.filter(item=>{
        return item.id!==action.payload
      })
      localStorage.setItem('likes',JSON.stringify(state))
    }
  },
})

export const { addLike,deleteLike } = likeSlice.actions

export default likeSlice.reducer