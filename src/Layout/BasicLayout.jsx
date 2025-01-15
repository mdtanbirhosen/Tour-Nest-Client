import { Outlet, useLocation } from "react-router-dom";
import Navbar from "../components/Navbar/Navbar";
import Footer from "../components/Footer/Footer";
import Banner from "../pages/BasicLayout/Home/Banner/Banner";

const BasicLayout = () => {
  const {pathname} = useLocation()
  return (
    <div className="bg-basic-bg">
      <header>
        <Navbar></Navbar>
        {
          pathname ==='/' && <Banner></Banner>
        }
      </header>
      <main className="max-w-screen-2xl mx-auto min-h-[calc(100vh-200px)] px-2 md:px-5">
        <Outlet></Outlet>
      </main>
      <footer>
        <Footer></Footer>
      </footer>
    </div>
  );
};

export default BasicLayout;
