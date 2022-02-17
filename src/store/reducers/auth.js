import { createAsyncThunk, createSlice } from '@reduxjs/toolkit'
import axios from 'axios'

const initialState = {
  isAuth:false,
  user:null,
  loading:false,
  status:null
}

export const fetchLogin = createAsyncThunk(
    'auht/fetchLogin',
    async ({email,password},{rejectWithValue}) => {
        const url = 'https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword?key=AIzaSyBrrpXXSliTe7Zbq1cwnoBib0lG0ck4nfE'
        try{
           const response = await axios.post(url,{email:email,password:password,returnSecureToken:true})
           if(response.status =='200'){
               return response.data
           }
        }catch(error){
            return rejectWithValue(error.messages)
        }
    }
)

export const fetchRegister = createAsyncThunk(
  'auht/fetchRegister',
  async ({email,password},{rejectWithValue}) => {
      const url = 'https://identitytoolkit.googleapis.com/v1/accounts:signUp?key=AIzaSyBrrpXXSliTe7Zbq1cwnoBib0lG0ck4nfE'
      const databaseUrl = 'https://mebel-f0c71-default-rtdb.europe-west1.firebasedatabase.app/users.json'
      try{
         const response = await axios.post(url,{email:email,password:password,returnSecureToken:true,money:0})
         if(response.status == '200'){
             const userResponse = await axios.post(databaseUrl,{id:response.data.localId, email:email})
             localStorage.setItem('authId',userResponse.data.name)
             return response.data
         }
      }catch(error){
          return rejectWithValue(error.messages)
      }
  }
)

export const fetchSendForgotPasswordToEmail = createAsyncThunk(
  'auht/fetchSendForgotPasswordToEmail',
  async ({email},{rejectWithValue}) => {
      const url = 'https://identitytoolkit.googleapis.com/v1/accounts:sendOobCode?key=AIzaSyBrrpXXSliTe7Zbq1cwnoBib0lG0ck4nfE'
      try{
        console.log(email);
         const response = await axios.post(url,{requestType:"PASSWORD_RESET",email:email})
         if(response.status =='200'){
             return response.data
         }
      }catch(error){
          return rejectWithValue(error.messages)
      }
  }
)


export const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    logOut: (state) => {
        state.isAuth = false
        state.loading = false
        state.user = null
        state.status = null
        localStorage.removeItem('Token')
        localStorage.removeItem('UserId')
        localStorage.removeItem('Email')
    },
    autoLogin: (state) => {
        const token = JSON.parse(localStorage.getItem('Token'))
        const userId = JSON.parse(localStorage.getItem('UserId'))
        const email = JSON.parse(localStorage.getItem('Email'))
        if(token!=null && userId!=null && email!=null){
            state.loading = false
            state.user = email
            state.isAuth = true
            state.status = '200'
        }
    },
  },
  extraReducers:{
      //Login
      [fetchLogin.pending]:(state)=>{
        state.loading = true
      },
      [fetchLogin.fulfilled]:(state,action)=>{
        state.loading = false
        state.user = action.payload.email
        state.isAuth = true
        state.status = '200'
        localStorage.setItem('Token',JSON.stringify(action.payload.idToken))
        localStorage.setItem('UserId',JSON.stringify(action.payload.localId))
        localStorage.setItem('Email',JSON.stringify(action.payload.email))
      },
      [fetchLogin.rejected]:(state)=>{
        state.loading = false
        state.status = 'error'
      },
      //Register
      [fetchRegister.pending]:(state)=>{
        state.loading = true
      },
      [fetchRegister.fulfilled]:(state)=>{
        state.loading = false
        state.status = '200'
      },
      [fetchRegister.rejected]:(state)=>{
        state.loading = false
        state.status = 'error'
      },
      //fetchSendForgotPasswordToEmail
      [fetchSendForgotPasswordToEmail.pending]:(state)=>{
        state.loading = true
      },
      [fetchSendForgotPasswordToEmail.fulfilled]:(state)=>{
        state.loading = false
        state.status = '200'
      },
      [fetchSendForgotPasswordToEmail.rejected]:(state)=>{
        state.loading = false
        state.status = 'error'
      },
  }
})

export const { logOut,autoLogin } = authSlice.actions

export default authSlice.reducer