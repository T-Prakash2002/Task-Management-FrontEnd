import SideBar from "./Components/Sidebar";
import { useEffect, useState } from "react";
import "./App.css";
import { useSelector,useDispatch } from 'react-redux'
import axios, { AxiosError } from "axios";
import { apiuri } from "./constants";
import { GetMemberList,GetTaskList } from "./Redux/DataSlice";




function App() {
  
  const IsLogIn=useSelector(state=>state.LoginDetails.IsLogIn);

  console.log("App")

  return (
    <>
    
      <SideBar IsLogIn={IsLogIn}  />
      
    </>
  );
}

export default App;
