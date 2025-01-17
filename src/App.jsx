import { Outlet } from "react-router-dom";
import { Toaster } from "react-hot-toast";
import useAuth from "./hooks/useAuth";
import Loading from "./components/Loading/Loading";
function App() {
  const {loading} = useAuth();
  return (
    <>
    <Toaster></Toaster>
    {
      loading?<Loading></Loading>:<Outlet></Outlet>
    }
      
    </>
  );
}

export default App;
