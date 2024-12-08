import {createSlice } from '@reduxjs/toolkit'

const initialSubTotal={
    subTotal:0
};


const subTotalSlice=createSlice({
    name:'subTotal',
    initialState:initialSubTotal,
    reducers:{
        setSubTotal(state,action){
            state.subTotal=action.payload
        },
        addSubTotal(state,action){
            // console.log(typeof action.payload);
            state.subTotal=state.subTotal+action.payload
        },
        decSubTotal(state,action){
            state.subTotal=state.subTotal-action.payload
        }
    }
})

export const subTotalActions=subTotalSlice.actions

export default subTotalSlice.reducer
