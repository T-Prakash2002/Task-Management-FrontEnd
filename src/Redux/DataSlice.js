import { createSlice } from "@reduxjs/toolkit";
import axios from "axios";
import { apiuri } from "../constants";
import { encryptStorage1, encryptStorage2 } from "../Encrypt/Encrpt";
import { act } from "react";

const initialState = {

        IsLogIn:localStorage.getItem("userToken")||"",
        LogInUser:encryptStorage1.getItem("user")||"",
        MemberList:encryptStorage1.getItem('MemberList')||{},
        TaskList:[],
        Edit:{},
        InfoTask:encryptStorage2.getItem('InfoTask'),
        CurRoute:""
}

const LoginSlice = createSlice({
        name: 'Login',
        initialState,
        reducers: {
                SignIn: (state, actions) => {

                        state.IsLogIn=true
                        encryptStorage1.setItem("user",actions.payload);
                        sessionStorage.setItem("IsLogIn",true)
                        state.LogInUser = actions.payload.data;
                },

                SignOut: (state) => {

                        state.IsLogIn=false
                        encryptStorage1.removeItem('user')
                        encryptStorage1.removeItem('MemberList')
                        sessionStorage.setItem("IsLogIn",false)
                        encryptStorage1.removeItem('TaskList')
                        localStorage.removeItem('userToken')

                },
                GetMemberList: (state,actions) => {

                        encryptStorage1.setItem('MemberList',actions.payload.data);
                        state.MemberList=actions.payload.data;
                       
                },
                CreateTask:(state,actions)=>{

                        state.TaskList.push(actions.payload.data);

                        console.log(state.TaskList)

                },
                GetTaskList:(state,actions)=>{

                        encryptStorage1.setItem('TaskList',actions.payload.data)
                        // state.TaskList=actions.payload.data;
                },
                EditTask:(state,actions)=>{
                        state.Edit=actions.payload;
                        encryptStorage2.setItem('EditTask',actions.payload)
                },
                AboutTask:(state,actions)=>{
                        state.InfoTask=actions.payload;
                        encryptStorage2.setItem('InfoTask',actions.payload)
                },
        }

})

export const { 
        SignIn, 
        SignOut, 
        CreateTask,
        GetMemberList ,
        GetTaskList ,
        EditTask,
        AboutTask,
        
        } = LoginSlice.actions



export default LoginSlice.reducer;