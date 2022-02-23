import { configureStore } from '@reduxjs/toolkit'
import productReducer from './reducers/products'
import cartReducer from './reducers/cart'
import authReducer from './reducers/auth'
import likeReducer from './reducers/like'

export default configureStore({
  reducer:{
    products: productReducer,
    cart: cartReducer,
    auth: authReducer,
    like: likeReducer
  }
})