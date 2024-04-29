import { configureStore } from '@reduxjs/toolkit'

import LoginModel from '../Slice/LoginModel'



export const store=configureStore({
    reducer:{
        data:LoginModel
    }
})

// console.log(store.getState())