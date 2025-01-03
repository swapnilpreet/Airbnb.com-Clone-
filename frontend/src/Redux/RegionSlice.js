import { createSlice } from "@reduxjs/toolkit"


export const RegionSlice = createSlice({
    name: 'region',
    initialState:{
        region:"",
        category:"",
    },
    reducers:{
        SetRegion:(state,action)=>{
            state.region = action.payload
        },
        SetCategory:(state,action)=>{
            console.log("SetCategory:",action.payload)
            state.category = action.payload
        }
    }
})

export const {SetRegion,SetCategory} =RegionSlice.actions;