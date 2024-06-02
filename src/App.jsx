import SideBar from "./Components/Sidebar";
import { useEffect, useState } from "react";
import "./App.css";
import { useSelector,useDispatch } from 'react-redux'
import axios, { AxiosError } from "axios";
import { apiuri } from "./constants";
import { GetMemberList,GetTaskList } from "./Redux/DataSlice";
import Loading from "./Loading";




function App() {
  
  const {IsLogIn,IsLoading}=useSelector(state=>state.LoginDetails);

  return (
    <div className="App">
    
      {
        (IsLoading)?<Loading />:<SideBar IsLogIn={IsLogIn} />
      }    

    </div>
  );
}

export default App;
