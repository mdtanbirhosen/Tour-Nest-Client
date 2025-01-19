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
import TourGuideProfile from "../pages/BasicLayout/TourGuideProfile/TourGuideProfile";
import PrivateRoutes from "./PrivateRoutes";
import JoinAsTourGuide from "../pages/Dashboard/TouristDashboard/JoinAsTourGuide/JoinAsTourGuide";
import Payment from "../pages/Dashboard/TouristDashboard/MyBookings/Payment/Payment";
import MyAssignedTours from "../pages/Dashboard/TouristGuideDashboard/MyAssignedTours/MyAssignedTours";
import AddStories from "../pages/Dashboard/commonInDashboard/AddStories/AddStories";
import ManageStories from "../pages/Dashboard/commonInDashboard/ManageStories/ManageStories";
import EditStory from "../pages/Dashboard/commonInDashboard/ManageStories/EditStory";
import AddPackage from "../pages/Dashboard/AdminDashboard/AddPackage/AddPackage";

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
            loader: ({params})=> fetch(`https://tour-nest-server-side.vercel.app/package/${params.id}`)
          },
          {
            path:'/tourGuideProfile/:id',
            element: <TourGuideProfile></TourGuideProfile>,
            loader: ({params})=> fetch(`https://tour-nest-server-side.vercel.app/tourGuideProfile/${params.id}`)

          }
          
        ],
      },
      {
        path: "/dashboard",
        element: <PrivateRoutes><Dashboard></Dashboard></PrivateRoutes>,
        children: [
          // common in dashboard 
          {
            index:true,
            element: <PrivateRoutes><ManageProfile></ManageProfile></PrivateRoutes>
          },

          // ----------------------------------------------------------------------------------------------------------------------------------------
          // Tourist only dashboard
          {
            path: '/dashboard/touristDashboard',
            element:<PrivateRoutes><TouristDashboard></TouristDashboard></PrivateRoutes>,
            children:[
              {
                path: '/dashboard/touristDashboard/myBookings',
                element: <PrivateRoutes><MyBookings></MyBookings></PrivateRoutes>
              },
              {
                path: '/dashboard/touristDashboard/payment/:id',
                element: <PrivateRoutes><Payment></Payment></PrivateRoutes>,
                loader: ({params})=> fetch(`https://tour-nest-server-side.vercel.app/booking/${params.id}`)
              },
              {
                path: '/dashboard/touristDashboard/joinAsTourGuide',
                element:<PrivateRoutes><JoinAsTourGuide></JoinAsTourGuide></PrivateRoutes>
              },
              {
                path: '/dashboard/touristDashboard/addStories',
                element:<PrivateRoutes><AddStories></AddStories></PrivateRoutes>
              },
              {
                path: '/dashboard/touristDashboard/manageStories',
                element:<PrivateRoutes><ManageStories></ManageStories></PrivateRoutes>
              },
              {
                path: '/dashboard/touristDashboard/editStory/:id',
                element:<PrivateRoutes><EditStory></EditStory></PrivateRoutes>
              },
            ]

          },
          
          // -------------------------------------------------------------------------------------------------------------------------------------
          // Tourist guides only dashboard
          {
            path:'/dashboard/touristGuideDashboard',
            element: <PrivateRoutes><TouristGuideDashboard></TouristGuideDashboard></PrivateRoutes>,
            children:[
              {
                path:'/dashboard/touristGuideDashboard/myAssignedTours',
                element:<PrivateRoutes><MyAssignedTours></MyAssignedTours></PrivateRoutes>
              }
            ]
          },
          // ---------------------------------------------------------------------------------------------------------------------------------------------
          // Admins only dashboard
          {
            path: '/dashboard/adminDashboard',
            element: <PrivateRoutes><AdminDashboard></AdminDashboard></PrivateRoutes>,
            children:[
              {
                path:'/dashboard/adminDashboard/addPackage',
                element: <PrivateRoutes><AddPackage></AddPackage></PrivateRoutes>
              }
              ,
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
