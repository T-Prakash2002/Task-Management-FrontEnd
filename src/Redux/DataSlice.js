import { createSlice } from "@reduxjs/toolkit";
import { mentors, students } from "../constants";



const initialState = {
        IsLogIn:false,
        // data:[{...mentors},{...students}]
        data: 22,
}

const LoginSlice = createSlice({
        name: 'Login',
        initialState,
        reducers: {
                SignIn: (state,actions) => {
                    state.IsLogIn=true
                },
                SignOut: (state,actions) => {
                    state.IsLogIn=false
                }
        }

})

// Action creators are generated for each case reducer function
export const { SignIn,SignOut } = LoginSlice.actions

export default LoginSlice.reducer;