import { configureStore } from '@reduxjs/toolkit'
import productReducer from './reducers/products'
import cartReducer from './reducers/cart'
import authReducer from './reducers/auth'

export default configureStore({
  reducer:{
    products: productReducer,
    cart: cartReducer,
    auth: authReducer
  }
})