import { configureStore } from "@reduxjs/toolkit";
import LoginReducer from "./DataSlice";

export const store=configureStore({
    reducer:{
        LoginDetails:LoginReducer
    }
})

