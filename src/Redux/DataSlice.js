import { createSlice } from "@reduxjs/toolkit";


const initialState = {
        IsLogIn:localStorage.getItem("login") || "",
        
        data: 22,
}

const LoginSlice = createSlice({
        name: 'Login',
        initialState,
        reducers: {
                SignIn: (state,actions) => {
                    state.IsLogIn=true;
                    localStorage.setItem("login", actions.payload);
                },
                SignOut: (state,actions) => {
                    state.IsLogIn=false
                    localStorage.setItem("login", "");
                }
        }

})

// Action creators are generated for each case reducer function
export const { SignIn,SignOut } = LoginSlice.actions

export default LoginSlice.reducer;