import { createSlice } from "@reduxjs/toolkit";
import axios from "axios";

const initialState = {
        IsLogIn: localStorage.getItem("login") || "",
        LogInUser: {},
        data: 22,
}

const LoginSlice = createSlice({
        name: 'Login',
        initialState,
        reducers: {
                SignIn: (state, actions) => {

                        state.IsLogIn = true;
                        localStorage.setItem("login", actions.payload.username);

                        state.LogInUser = actions.payload;


                },

                SignOut: (state) => {

                        state.IsLogIn = false
                        localStorage.setItem("login", "");
                        state.LogInUser = {};

                }
        }

})

// Action creators are generated for each case reducer function
export const { SignIn, SignOut } = LoginSlice.actions

export default LoginSlice.reducer;