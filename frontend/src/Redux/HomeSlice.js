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
        userHomes:[],
    },
    reducers:{
        SetHomes:(state,action)=>{
            state.homes = action.payload
        },
        SetSingleHome:(state,action)=>{
            state.singleHome= action.payload
        },
        SetUserHome:(state,action)=>{
            state.userHomes= action.payload
        }

    }
})

export const {SetHomes,SetUserHome,SetSingleHome}=HomeSlice.actions;