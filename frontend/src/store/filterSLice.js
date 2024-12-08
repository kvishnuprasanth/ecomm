import {createSlice } from '@reduxjs/toolkit'

const initialFilter={
    filter:[]
};


const filterSLice=createSlice({
    name:'filter',
    initialState:initialFilter,
    reducers:{
        remove(state,action){
        state.filter = state.filter.filter(e => e !== action.payload)
        },
        reset(state){
            state.filter =[]
        },
        setfilter(state,action){
            state.filter =action.payload
        }
    }
})

export const filteractions=filterSLice.actions

export default filterSLice.reducer
