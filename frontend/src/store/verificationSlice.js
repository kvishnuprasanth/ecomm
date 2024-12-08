import {createSlice } from '@reduxjs/toolkit'

const initialStateVerification={
    isVerify:false
};


const VerificationSlice=createSlice({
    name:'verify',
    initialState:initialStateVerification,
    reducers:{
        setTrue(state){
            state.isVerify=true
        },
        setFalse(state){
        state.isVerify=false
        },
        toggle(state){
        state.isVerify=!state.isVerify
        }
    }
})

export const isVerifyaction=VerificationSlice.actions

export default VerificationSlice.reducer
