import { configureStore } from '@reduxjs/toolkit'
import productReducer from './reducers/products'
import cartReducer from './reducers/cart'

export default configureStore({
  reducer:{
    products: productReducer,
    cart: cartReducer
  }
})