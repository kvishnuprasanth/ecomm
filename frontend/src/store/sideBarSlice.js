import {createSlice } from '@reduxjs/toolkit'

const initialStateSideBar={
    isSideOpen:false
};


const sideBarSlice=createSlice({
    name:'isSideOpen',
    initialState:initialStateSideBar,
    reducers:{
        setTrue(state){
            state.isSideOpen=true
        },
        setFalse(state){
        state.isSideOpen=false
        },
        toggle(state){
        state.isSideOpen=!state.isSideOpen
        }
    }
})

export const sideBar=sideBarSlice.actions

export default sideBarSlice.reducer
