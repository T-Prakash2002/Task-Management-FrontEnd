import SideBar from "./Components/Sidebar";
import { useEffect, useState } from "react";
import "./App.css";
import { useSelector,useDispatch } from 'react-redux'
import axios, { AxiosError } from "axios";
import { apiuri } from "./constants";
import { GetMemberList,GetTaskList } from "./Redux/DataSlice";




function App() {
  
  const IsLogIn=useSelector(state=>state.LoginDetails.IsLogIn);

  return (
    <div className="App">
    
      <SideBar IsLogIn={IsLogIn}  />

      
    

    {/* <footer className="bg-body-tertiary text-center border ">
          <div
            className="text-center p-3 bg-body-secondary"
          >
            &copy; 2024 Copyright
            
          </div>
        </footer> */}
      </div>
  );
}

export default App;
