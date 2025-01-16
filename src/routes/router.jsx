import { createBrowserRouter } from "react-router-dom";
import App from "../App";
import BasicLayout from "../Layout/BasicLayout";
import Dashboard from "../Layout/Dashboard";
import Home from '../pages/BasicLayout/Home/Home'
import Community from '../pages/BasicLayout/Community/Community'
import Login from "../pages/Login/Login";
import Register from "../pages/Register/Register";
import ManageProfile from "../pages/Dashboard/commonInDashboard/ManageProfile/ManageProfile";
import TouristDashboard from "../pages/Dashboard/TouristDashboard/TouristDashboard";
import MyBookings from "../pages/Dashboard/TouristDashboard/MyBookings/MyBookings";
import TouristGuideDashboard from "../pages/Dashboard/TouristGuideDashboard/TouristGuideDashboard";
import AdminDashboard from "../pages/Dashboard/AdminDashboard/AdminDashboard";
import ManageUsers from "../pages/Dashboard/AdminDashboard/ManageUsers/ManageUsers";
import ManageCandidates from "../pages/Dashboard/AdminDashboard/ManageCandidates/ManageCandidates";
import AboutUs from "../pages/BasicLayout/AboutUs/AboutUs";
import Trips from "../pages/BasicLayout/Trips/Trips";
import PackageDetails from "../pages/BasicLayout/PackageDetails/PackageDetails";

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
            path: '/Trips',
            element:<Trips></Trips>
          },
          {
            path: '/aboutUs',
            element:<AboutUs></AboutUs>
          },
          {
            path: '/community',
            element:<Community></Community>
          },
          {
            path:'/packageDetails/:id',
            element:<PackageDetails></PackageDetails>,
            loader: ({params})=> fetch(`http://localhost:5000/package/${params.id}`)
          }
          
        ],
      },
      {
        path: "/dashboard",
        element: <Dashboard></Dashboard>,
        children: [
          // common in dashboard 
          {
            index:true,
            element: <ManageProfile></ManageProfile>
          },
          // Tourist only dashboard
          {
            path: '/dashboard/touristDashboard',
            element:<TouristDashboard></TouristDashboard>,
            children:[
              {
                path: '/dashboard/touristDashboard/myBookings',
                element: <MyBookings></MyBookings>
              }
            ]

          },
          // Tourist guides only dashboard
          {
            path:'/dashboard/guideDashboard',
            element: <TouristGuideDashboard></TouristGuideDashboard>,
            children:[
              {

              }
            ]
          },
          // Admins only dashboard
          {
            path: '/dashboard/adminDashboard',
            element: <AdminDashboard></AdminDashboard>,
            children:[
              {
                path: '/dashboard/adminDashboard/manageUsers',
                element: <ManageUsers></ManageUsers>
              },
              {
                path: '/dashboard/adminDashboard/manageCandidates',
                element: <ManageCandidates></ManageCandidates>
              }
            ]
          }
        ],
      },
      // authentication 
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
