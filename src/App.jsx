import SideBar from "./Components/Sidebar";
import { useState } from "react";
import "./App.css";
import { useSelector,useDispatch } from 'react-redux'


function App() {
  // const [IsLogIn, setIsLogIn] = useState(false);
  
  const IsLogIn=useSelector(state=>state.LoginDetails.IsLogIn)
  // const user=useSelector(state=>state.LoginDetails.LogInUser)
  
  return (
    <>
      <SideBar IsLogIn={IsLogIn}  />
    </>
  );
}

export default App;
