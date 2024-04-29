import {Login,Registration} from "./Components/Login";
import "./App.css";
import { useState } from "react";

function App() {
    
  const [openType,setOpenType]=useState('register')

  return (
    <>
      {
        (openType=='login'?<Login />:<Registration />)
      }
    </>
  );
}

export default App;
