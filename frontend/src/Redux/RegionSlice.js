import { createSlice } from "@reduxjs/toolkit"


export const RegionSlice = createSlice({
    name: 'region',
    initialState:{
        region:"",
    },
    reducers:{
        SetRegion:(state,action)=>{
            state.region = action.payload
        }
    }
})

export const {SetRegion} =RegionSlice.actions;