import ReactDOM from "react-dom/client";
import App from "./App.jsx";
import "./index.css";
import { store } from "./Store/store.js";
import { Provider } from 'react-redux'


// import { createBrowserRouter, RouterProvider } from "react-router-dom";
// import Navbar from "./Navbar.jsx";

// const router = createBrowserRouter([
//   {
//     path: "",
//     element: <Navbar />,
//   }
// ]);

ReactDOM.createRoot(document.getElementById("root")).render(
  // <RouterProvider router={router}/>
        <Provider store={store}>
          <App />
        </Provider>
            
        
);
