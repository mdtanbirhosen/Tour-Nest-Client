import { Outlet } from "react-router-dom";
import Drawer from "../pages/Dashboard/Drawer/Drawer";
import DashboardNavbar from "../components/DashboardNavbar/DashboardNavbar";

const Dashboard = () => {
  return (
    <div className="bg-basic-bg">
      <nav className="flex lg:hidden">
        <DashboardNavbar></DashboardNavbar>
      </nav>
      <div className="max-w-[1920px] mx-auto flex">
        <aside>
          <Drawer></Drawer>
        </aside>
        <main className="min-h-screen">
          <Outlet></Outlet>
          
        </main>
      </div>
    </div>
  );
};

export default Dashboard;
