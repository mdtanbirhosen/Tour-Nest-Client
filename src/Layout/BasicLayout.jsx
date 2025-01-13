import { Outlet } from "react-router-dom";
import Navbar from "../components/Navbar/Navbar";
import Footer from "../components/Footer/Footer";

const BasicLayout = () => {
  return (
    <div className="bg-bg-color">
      <header>
        <Navbar></Navbar>
      </header>
      <main className="max-w-screen-2xl mx-auto min-h-[calc(100vh-200px)] ">
        <Outlet></Outlet>
      </main>
      <footer>
        <Footer></Footer>
      </footer>
    </div>
  );
};

export default BasicLayout;
