import { createSlice } from "@reduxjs/toolkit";
import axios from "axios";
import { apiuri } from "../constants";
import { encryptStorage1, encryptStorage2 } from "../Encrypt/Encrpt";

const initialState = {

        LogInUser:encryptStorage1.getItem('user')||"",
        MemberList:encryptStorage2.getItem('MemberList')||"",
}

const LoginSlice = createSlice({
        name: 'Login',
        initialState,
        reducers: {
                SignIn: (state, actions) => {

                        state.IsLogIn = true;

                        encryptStorage1.setItem("user",actions.payload)

                        state.LogInUser = actions.payload;

                },

                SignOut: (state) => {

                        state.IsLogIn = false
                        encryptStorage1.removeItem('user')
                        encryptStorage2.removeItem('MemberList')
                        state.LogInUser = {};

                },
                GetMemberList: (state,actions) => {

                        state.MemberList=actions.payload.data

                        encryptStorage2.setItem('MemberList',actions.payload.data);
                }
        }

})


export const { SignIn, SignOut, GetMemberList } = LoginSlice.actions

export default LoginSlice.reducer;