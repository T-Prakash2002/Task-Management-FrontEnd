import ReactDOM from "react-dom/client";
import App from "./App.jsx";
import "./index.css";
import { createBrowserRouter,RouterProvider } from "react-router-dom";
import Login from './Components/Login'
import Registration from './Components/Registration';
import Task from "./Components/Task.jsx";
import Profile from "./Components/Profile.jsx";
import DashBoard from "./Components/DashBoard.jsx";
import { Provider } from 'react-redux'
import { store } from "./Redux/store.js";

import Navbar from "./Navbar.jsx";



const router = createBrowserRouter([
  {
    path: "/",
    element: <App />,
    children:[
      {
        path:'login',
        element:<Login />
      },{
        path:'register',
        element:<Registration />
      },{
        path:'dashboard',
        element:<DashBoard />
      },{
        path:'task',
        element:<Task />
      },{
        path:'profile',
        element:<Profile />
      }
    ]
  },
]);

// store.subscribe(() => console.log(store.getState()))

ReactDOM.createRoot(document.getElementById("root")).render(
  
    <Provider store={store}>
        <RouterProvider router={router}/>
    </Provider> 
  
);
