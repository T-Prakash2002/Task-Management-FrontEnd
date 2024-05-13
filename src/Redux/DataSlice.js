import { createSlice } from "@reduxjs/toolkit";
import { encryptStorage1, encryptStorage2 } from "../Encrypt/Encrpt";


const initialState = {

        IsLogIn:localStorage.getItem('IsLogIn')||false,
        LogInUser:encryptStorage1.getItem('user')||{},
        Token:encryptStorage1.getItem('userToken')||'',
        MemberList:encryptStorage1.getItem('MemberList')||[],
        TaskList:[],
        Edit:{},
        InfoTask:{},
        CurRoute:""
}

const LoginSlice = createSlice({
        name: 'Login',
        initialState,
        reducers: {
                SignIn: (state, actions) => {


                        encryptStorage1.setItem("user",actions.payload.data);
                        localStorage.setItem("IsLogIn",true);
                        state.LogInUser = encryptStorage1.getItem('user');
                        state.IsLogIn=true;
                        // encryptStorage1.setItem('userToken',actions.payload.token)

                },

                SignOut: (state) => {

                        state.IsLogIn=false
                        state.LogInUser={}
                        encryptStorage1.removeItem('user')
                        // encryptStorage1.removeItem('MemberList')
                        // localStorage.setItem("IsLogIn",false)
                        // encryptStorage1.removeItem('TaskList')
                        encryptStorage1.setItem('userToken','')
                        localStorage.removeItem("IsLogIn");


                },
                GetMemberList: (state,actions) => {

                        encryptStorage1.setItem('MemberList',actions.payload.data);
                        state.MemberList=actions.payload.data;
                       
                },
                CreateTask:(state,actions)=>{

                        state.TaskList.push(actions.payload.data);

                        // console.log(state.TaskList)

                },
                GetTaskList:(state,actions)=>{

                        encryptStorage1.setItem('TaskList',actions.payload.data)
                        state.TaskList=actions.payload.data;

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