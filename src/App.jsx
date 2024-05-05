import SideBar from "./Components/Sidebar";
import { useEffect, useState } from "react";
import "./App.css";
import { useSelector,useDispatch } from 'react-redux'
import axios, { AxiosError } from "axios";
import { apiuri } from "./constants";
import { GetMemberList } from "./Redux/DataSlice";




function App() {
  
  const user=useSelector(state=>state.LoginDetails.LogInUser);
  const dispatch=useDispatch()

 useEffect(() => {
    if (user.role === "Admin") {

      axios.get(`${apiuri}/getMemberList`)
      .then(({data})=>{
        
        dispatch(GetMemberList({ data: data }));

      }).catch((err)=>{
         if(err.toJSON().message==="Network Error"){
          alert('Connection is Poor!!,Chek your Connection');
         }
      })
    }
  },[]);
  
  return (
    <>
    
      <SideBar IsLogIn={user}  />
      
    </>
  );
}

export default App;
