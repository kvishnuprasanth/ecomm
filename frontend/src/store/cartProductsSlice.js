import {createSlice } from '@reduxjs/toolkit'

const initialcartrState={
    cartProducts:[]
};


const cartProductsSlice=createSlice({
    name:'cartProducts',
    initialState:initialcartrState,
    reducers:{
        setCartProducts(state,action){
            state.cartProducts=action.payload
        },
        unsetCartProducts(state){
        state.cartProducts=[]
        }
    }
})

export const cartProductsActions=cartProductsSlice.actions

export default cartProductsSlice.reducer
