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
        CurRoute:"",
        IsLoading:false
        
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
                        encryptStorage1.removeItem('MemberList')
                        encryptStorage1.setItem('userToken','')
                        localStorage.removeItem("IsLogIn");
                        encryptStorage2.removeItem("EditTask")
                        encryptStorage2.removeItem("InfoTask")
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
                deleteTask:(state,actions)=>{
                  state.TaskList=state.TaskList.filter(li=>li._id != actions.payload.id)
                },
                AboutTask:(state,actions)=>{
                        state.InfoTask=actions.payload;
                        encryptStorage2.setItem('InfoTask',actions.payload)
                },
                LoadingTrue:(state,actions)=>{
                        state.IsLoading=true
                },
                LoadingFalse:(state,actions)=>{
                        state.IsLoading=false
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
        deleteTask,
        LoadingTrue,
        LoadingFalse
        } = LoginSlice.actions



export default LoginSlice.reducer;