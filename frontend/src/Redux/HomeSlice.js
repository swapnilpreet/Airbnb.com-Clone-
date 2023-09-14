// import React from 'react'



// const HomeSlice = () => {
//   return (
//     <div>HomeSlice</div>
//   )
// }

// export default HomeSlice

import { createSlice } from "@reduxjs/toolkit"


export const HomeSlice = createSlice({
    name: 'homes',
    initialState:{
        homes:[],
        singleHome:[],
    },
    reducers:{
        SetHomes:(state,action)=>{
            state.homes = action.payload
        },
        SetSingleHome:(state,action)=>{
            state.singleHome= action.payload
        }
    }
})

export const {SetHomes,SetSingleHome}=HomeSlice.actions;