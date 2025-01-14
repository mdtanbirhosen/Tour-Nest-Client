import { Outlet } from "react-router-dom";
import Drawer from "../pages/Dashboard/Drawer/Drawer";

const Dashboard = () => {
  return (
    <div className="bg-[#EED3B1]">
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
