import {createSlice } from '@reduxjs/toolkit'

const initialStateLoginForm={
    isEmail:true
};


const LoginFormSlice=createSlice({
    name:'isEmail',
    initialState:initialStateLoginForm,
    reducers:{
        setTrue(state){
            state.isEmail=true
        },
        setFalse(state){
        state.isEmail=false
        },
        toggle(state){
        state.isEmail=!state.isEmail
        }
    }
})

export const afterEmail=LoginFormSlice.actions

export default LoginFormSlice.reducer
