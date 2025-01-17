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
        <main className="min-h-[calc(100vh-66px)] lg:min-h-screen w-full bg-gradient-to-b from-basic-bg via-white to-dashboard-bg p-2 md:p-5">
          <Outlet></Outlet>
          
        </main>
      </div>
    </div>
  );
};

export default Dashboard;
