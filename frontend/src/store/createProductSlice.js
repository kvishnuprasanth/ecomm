import {createSlice } from '@reduxjs/toolkit'

const initialCreateProductForm={
    isCreateProductOpen:false
};


const createProductSlice=createSlice({
    name:'isCreateProductOpen',
    initialState:initialCreateProductForm,
    reducers:{
        setTrue(state){
            state.isCreateProductOpen=true
        },
        setFalse(state){
        state.isCreateProductOpen=false
        },
        toggle(state){
        state.isCreateProductOpen=!state.isCreateProductOpen
        }
    }
})

export const createProductForm=createProductSlice.actions

export default createProductSlice.reducer
