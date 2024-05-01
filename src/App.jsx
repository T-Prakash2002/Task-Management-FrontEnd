import SideBar from "./Components/Sidebar";
import { useState } from "react";
import "./App.css";


function App() {
  const [IsLogIn, setIsLogIn] = useState(false);

  return (
    <>
      
    <SideBar IsLogIn={IsLogIn} setIsLogIn={setIsLogIn} />
    
    </>
  );
}

export default App;
