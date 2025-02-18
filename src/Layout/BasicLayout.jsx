import { Outlet, useLocation } from "react-router-dom";
import Navbar from "../components/Navbar/Navbar";
import Footer from "../components/Footer/Footer";
import Banner from "../pages/BasicLayout/Home/Banner/Banner";

const BasicLayout = () => {
  const {pathname} = useLocation()
  return (
    <div className="bg-basic-bg">
      <header className="mt-[68px]">
        <Navbar></Navbar>
        {
          pathname ==='/' && <Banner></Banner>
        }
      </header>
      <main className="max-w-screen-2xl mx-auto min-h-[calc(100vh-200px)] px-2 md:px-5">
        <Outlet></Outlet>
      </main>
      <footer className="py-10 px-2 text-center md:text-left">
        <Footer></Footer>
      </footer>
    </div>
  );
};

export default BasicLayout;
