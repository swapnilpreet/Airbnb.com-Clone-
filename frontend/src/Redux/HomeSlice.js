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
    },
    reducers:{
        SetHomes:(state,action)=>{
            state.homes = action.payload
        }
    }
})

export const {SetHomes} =HomeSlice.actions;