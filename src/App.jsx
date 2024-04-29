import Login from "./Components/Login";
import Registration from "./Components/Registration";
import "./App.css";
import { useState } from "react";



function App() {
    
  const [openType,setOpenType]=useState('login')

  return (
    <>
      {
        (openType === 'login'?<Login />:<Registration />)
      }
    </>
  );
}

export default App;
