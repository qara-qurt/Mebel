import { createSlice } from '@reduxjs/toolkit'



const initialState = localStorage.getItem("cart") == null ? {
    cart:[],
    count:0,
    allPrice:0
}:JSON.parse(localStorage.getItem('cart'))

const deleteItem = (state,id) => {
    return state.cart = state.cart.filter((item)=>{
        return item.id!==id
    })
}
const getItemCount = (state,id) => {
    let carts = state.cart
    for(let i = 0;i<=carts.length;i++){
        if(carts[i].id == id){
            return {count:carts[i].count ,price:carts[i].price}
        }
    }
}
const addToLocalStorage = (state) => {
    localStorage.setItem("cart",JSON.stringify(state))
}

export const cartSlice = createSlice({
  name: 'cart',
  initialState,
  reducers: {
    setCart: (state,action) => {
        const newItems = {
            ...action.payload,
            count:1 ,
            price: parseInt(action.payload.price)
        }
        if(state.cart.length===0){
            state.cart.push(newItems)
            state.count++
            state.allPrice+=action.payload.price
        }
        else{
            let tmp = []
            let obj;
            state.cart.forEach((val,idx)=>{
                if(val.id===action.payload.id){
                    tmp.push(true)
                    obj=idx
                }
                else{   
                    tmp.push(false)
                }
            })
            if(tmp.includes(true)) {
                state.cart[obj].count++
                state.allPrice+=action.payload.price
                state.count++
            }else{
                state.cart.push(newItems)
                state.allPrice+=action.payload.price
                state.count++
            }
        }
        addToLocalStorage(state)
    },
    deleteCart:(state,action) => {
        let CountAndPrice = getItemCount(state,action.payload)
        state.count = state.count - CountAndPrice.count
        state.allPrice = state.allPrice - (CountAndPrice.price * CountAndPrice.count)
        deleteItem(state,action.payload)
        addToLocalStorage(state)
    },
    plusCart:(state,action) => {
        state.cart.map(val=>{
            if(val.id===action.payload.id){
                val.count++
                state.count++
                state.allPrice+=action.payload.price
            }
        })
        addToLocalStorage(state)
    },
    minusCart:(state,action) => {
        if(state.count==1){
            state.cart = []
            state.count = 0
            state.allPrice = 0
        }
        state.cart.map(val=>{
            if(val.id===action.payload.id){
                if(val.count>1){
                    val.count--
                    state.count--
                    state.allPrice-=action.payload.price
                }else{
                    deleteItem(state,val.id)
                    state.count--
                    state.allPrice-=action.payload.price
                }
            }
        })
        addToLocalStorage(state)
    },
    
  },
})

export const { setCart,deleteCart,plusCart,minusCart } = cartSlice.actions

export default cartSlice.reducer