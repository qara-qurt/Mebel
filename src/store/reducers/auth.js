import { createAsyncThunk, createSlice } from '@reduxjs/toolkit'
import axios from 'axios'

const initialState = {
  isAuth:false,
  user: null,
  loading: false,
  status: null,
  role:null
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
            let role
            const userResponse = await axios.get(databaseUrl)
            const keys = Object.keys(userResponse.data)
            keys.forEach(el=>{
                if(userResponse.data[el]['id']==localStorage.getItem('UserId')){
                    localStorage.setItem('AuthId',el)
                  role = userResponse.data[el]['role']
                } 
            })
              return {...response.data,role:role}
           }
        }catch(error){
            return rejectWithValue(error.messages)
        }
    }
)

export const fetchRegister = createAsyncThunk(
  'auht/fetchRegister',
  async ({email,password,role="USER"},{rejectWithValue}) => {
      const url = 'https://identitytoolkit.googleapis.com/v1/accounts:signUp?key=AIzaSyBrrpXXSliTe7Zbq1cwnoBib0lG0ck4nfE'
      const databaseUrl = 'https://mebel-f0c71-default-rtdb.europe-west1.firebasedatabase.app/users.json'
      try{
         const response = await axios.post(url,{email:email,password:password,returnSecureToken:true})
         if(response.status == '200'){
             await axios.post(databaseUrl,{id:response.data.localId, email:email,role:role})
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
        state.role = ""
        localStorage.removeItem('Token')
        localStorage.removeItem('UserId')
        localStorage.removeItem('Email')
        localStorage.removeItem('AuthId')
        localStorage.removeItem('Role')
    },
    autoLogin: (state) => {
        const token = localStorage.getItem('Token')
        const userId = localStorage.getItem('UserId')
        const role = localStorage.getItem('Role')
        const email = localStorage.getItem('Email')
        if(token!=null && userId!=null && email!=null){
            state.loading = false
            state.user = email
            state.isAuth = true
            state.status = '200'
            state.role = role
        }
    },
  },
  extraReducers:{
      //Login
      [fetchLogin.pending]:(state)=>{
        state.loading = true
      },
    [fetchLogin.fulfilled]: (state, action) => {
        state.loading = false
        state.user = action.payload.email
        state.isAuth = true
        state.status = '200'
        state.role = action.payload.role
        localStorage.setItem('Token', action.payload.idToken)
        localStorage.setItem('Role',action.payload.role)
        localStorage.setItem('Email', action.payload.email)
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