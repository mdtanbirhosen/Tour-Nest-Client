import { createBrowserRouter } from "react-router-dom";
import App from "../App";
import BasicLayout from "../Layout/BasicLayout";
import Dashboard from "../Layout/Dashboard";
import Home from "../pages/Home/Home";
import Login from "../pages/Login/Login";
import Register from "../pages/Register/Register";

const router = createBrowserRouter([
  {
    path: "/",
    element: <App></App>,
    children: [
      {
        path: "/",
        element: <BasicLayout></BasicLayout>,
        children: [
          {
            path: '/',
            element:<Home></Home>
          },
          {
            path: '/trips',
            
          }
        ],
      },
      {
        path: "/dashboard",
        element: <Dashboard></Dashboard>,
        children: [
          {
            path:'/dashboard',
            
          }
        ],
      },
      {
        path:'/login',
        element:<Login></Login>
      },
      {
        path:'/register',
        element:<Register></Register>
      },
    ],
  },
]);

export default router;
