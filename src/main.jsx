import ReactDOM from "react-dom/client";
import App from "./App.jsx";
import "./index.css";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import Login from "./Components/Login";
import Registration from "./Components/Registration";
import Task from "./Components/Task.jsx";
import Profile from "./Components/Profile.jsx";
import DashBoard from "./Components/DashBoard.jsx";
import { Provider } from "react-redux";
import { store } from "./Redux/store.js";
import EditTask from "./Components/EditTask.jsx";
import ParticularTask from "./Components/ParticularTask.jsx";
import Index from "./Components/Index.jsx";


const router = createBrowserRouter([
  {
    path: "/",
    element: <App />,
    children: [
      {
        path:'',
        element:<Index />
      },
      {
        path: "login",
        element: <Login />,
      },
      {
        path: "register",
        element: <Registration />,
      },
      {
        path: "dashboard",
        element: <DashBoard />,
      },
      {
        path: "task",
        element: <Task />,
      },
      {
          path:'particularTask',
          element:<ParticularTask />
        },
      {
        path: "profile",
        element: <Profile />,
      },
      {
        path: "EditTask",
        element: <EditTask />,
      },
    ],
  },
]);

// store.subscribe(() => console.log(store.getState()))

console.log("menu")

ReactDOM.createRoot(document.getElementById("root")).render(
  <Provider store={store}>
    <RouterProvider router={router} />
  </Provider>
);
