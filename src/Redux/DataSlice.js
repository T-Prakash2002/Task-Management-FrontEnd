import { createSlice } from "@reduxjs/toolkit";
import axios from "axios";
import { apiuri } from "../constants";
import { encryptStorage1, encryptStorage2 } from "../Encrypt/Encrpt";

const initialState = {

        LogInUser:encryptStorage1.getItem('user')||"",
        MemberList:encryptStorage1.getItem('MemberList')||"",
        TaskList:encryptStorage1.getItem('TaskList')||"",


}

const LoginSlice = createSlice({
        name: 'Login',
        initialState,
        reducers: {
                SignIn: (state, actions) => {

                        state.IsLogIn = true;

                        encryptStorage1.setItem("user",actions.payload);

                        state.LogInUser = actions.payload;

                },

                SignOut: (state) => {

                        state.IsLogIn = false
                        encryptStorage1.removeItem('user')
                        encryptStorage1.removeItem('MemberList')
                        state.LoginUser={}


                },
                GetMemberList: (state,actions) => {

                        encryptStorage1.setItem('MemberList',actions.payload.data);

                },
                GetTaskList:(state,actions)=>{

                        encryptStorage1.setItem('TaskList',actions.payload.data)

                }

        }

})


export const { 
        SignIn, 
        SignOut, 
        GetMemberList ,
        GetTaskList ,
        
        } = LoginSlice.actions

export default LoginSlice.reducer;