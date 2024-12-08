import {createSlice } from '@reduxjs/toolkit'

const initialStateSignUpForm={
    isSignup:true
};


const SignUpFormSlice=createSlice({
    name:'isSignup',
    initialState:initialStateSignUpForm,
    reducers:{
        setTrue(state){
            state.isSignup=true
        },
        setFalse(state){
        state.isSignup=false
        },
        toggle(state){
        state.isSignup=!state.isSignup
        }
    }
})

export const afterSignUp=SignUpFormSlice.actions

export default SignUpFormSlice.reducer
