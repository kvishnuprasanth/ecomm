import {createSlice } from '@reduxjs/toolkit'

const initialUserState={
    user:undefined
};


const userSlice=createSlice({
    name:'UserState',
    initialState:initialUserState,
    reducers:{
        setUser(state,action){
            state.user=action.payload
        },
        unsetUser(state){
        state.user=undefined
        }
    }
})

export const userState=userSlice.actions

export default userSlice.reducer
