import {configureStore} from '@reduxjs/toolkit'
import { userSlice } from './userSlice';
import { LoadingSlice } from './LoadingSlice';
import { RegionSlice } from './RegionSlice';
import { HomeSlice } from './HomeSlice';


const store = configureStore({
    reducer:{
        users:userSlice.reducer,
        loaders:LoadingSlice.reducer,
        region:RegionSlice.reducer,
        homes:HomeSlice.reducer,
    }
})

export default store;