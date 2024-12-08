import {createSlice } from '@reduxjs/toolkit'

const initialCartNumber={
    cartNumber:0
};


const cartNumberSlice=createSlice({
    name:'cartNumber',
    initialState:initialCartNumber,
    reducers:{
        setCartNumber(state,action){
            state.cartNumber=action.payload
        },
        setinc(state,action){
        state.cartNumber=state.cartNumber+action.payload
        },
        setdec(state,action){
            state.cartNumber=state.cartNumber-action.payload
        }
    }
})

export const cartNumberAction=cartNumberSlice.actions

export default cartNumberSlice.reducer
