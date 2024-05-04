import { createSlice } from "@reduxjs/toolkit";
import axios from "axios";
import { apiuri } from "../constants";

const initialState = {
        IsLogIn: localStorage.getItem("login") || "",
        LogInUser:{},
        MemberList:{}
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

                },
                GetMemberList:(state,actions)=>{

                        state.MemberList=  actions.payload.data
                        localStorage.setItem('MemberList',actions.payload.data)
                        
                }
                
        }

})

// Action creators are generated for each case reducer function
export const { SignIn, SignOut , GetMemberList } = LoginSlice.actions

export default LoginSlice.reducer;