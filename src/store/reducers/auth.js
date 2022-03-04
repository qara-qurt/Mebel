import { createAsyncThunk, createSlice } from '@reduxjs/toolkit'
import axios from 'axios'

const initialState = {
  isAuth:false,
  user: null,
  money:null,
  loading: false,
  status:null
}

export const fetchLogin = createAsyncThunk(
    'auht/fetchLogin',
    async ({email,password},{rejectWithValue}) => {
        const url = 'https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword?key=AIzaSyBrrpXXSliTe7Zbq1cwnoBib0lG0ck4nfE'
        const databaseUrl = 'https://mebel-f0c71-default-rtdb.europe-west1.firebasedatabase.app/users.json'
        try{
           const response = await axios.post(url,{email:email,password:password,returnSecureToken:true})
           if(response.status =='200'){
            localStorage.setItem('UserId',response.data.localId)
            let money
            const userResponse = await axios.get(databaseUrl)
            const keys = Object.keys(userResponse.data)
            keys.forEach(el=>{
                if(userResponse.data[el]['id']==localStorage.getItem('UserId')){
                    localStorage.setItem('AuthId',el)
                    money = userResponse.data[el]['money']
                } 
            })
              return {...response.data,money:money}
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
         const response = await axios.post(url,{email:email,password:password,returnSecureToken:true})
         if(response.status == '200'){
             const userResponse = await axios.post(databaseUrl,{id:response.data.localId, email:email,money:0})
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
        localStorage.removeItem('Money')
        localStorage.removeItem('AuthId')
    },
    autoLogin: (state) => {
        const token = localStorage.getItem('Token')
        const userId = localStorage.getItem('UserId')
        const email = localStorage.getItem('Email')
        const money = localStorage.getItem('Money')
        if(token!=null && userId!=null && email!=null && money!=null){
            state.loading = false
            state.user = email
            state.money = money
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
        state.money = action.payload.money
        localStorage.setItem('Token',action.payload.idToken)
        localStorage.setItem('Email', action.payload.email)
        localStorage.setItem('Money', action.payload.money)
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