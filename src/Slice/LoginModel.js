import { createSlice} from '@reduxjs/toolkit'
import { mentors,students } from '../constants'


const initialState={
    mentors:[...mentors],
    students:[...students]
}

const LoginModel=createSlice({
    name:'login',
    initialState,
    reducer:{
        Login:(state)=>{
            
        }
    }
})

export const {Login}=LoginModel.actions;
export default LoginModel.reducer;