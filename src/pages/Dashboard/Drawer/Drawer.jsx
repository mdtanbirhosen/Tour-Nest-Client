import { Link } from "react-router-dom";

const Drawer = () => {
  const sidebarContent = (
    //  Sidebar content here
    <>
      {/* dashboard links */}
      <li><Link to={"/dashboard/"}>Manage profile</Link></li>
      {/* tourist only routes ----------------------------------------------------------------- */}
      <li><Link to={"/dashboard/touristDashboard/myBookings"}>My Bookings</Link></li>
      <li><Link to={"/dashboard/touristDashboard/addStories"}>Add Stories</Link></li>
      <li><Link to={"/dashboard/touristDashboard/manageStories"}>Manage Stories</Link></li>
      <li><Link to={"/dashboard/touristDashboard/joinAsTourGuide"}>Join as Tour Guide</Link></li>
      {/* tourist guides only routes ----------------------------------------------------------*/}
      <div className="divider text-red-600 font-extrabold">tourist guide only</div>
      <li><Link to={"/dashboard/touristGuideDashboard/myAssignedTours"}>My Assigned Tours</Link></li>
      {/* admins only routed --------------------------------------------------------------------- */}
      <li><Link to={"/dashboard/adminDashboard/addPackage"}>Add Package</Link></li>

      {/* basic links */}
      <div className="divider"></div>
      <li><Link to={"/"}>Home</Link></li>
      <li><Link to={"/trips"}>Trips</Link></li>
      <li><Link to={"/community"}>Community</Link></li>
      <li><Link to={"/aboutUs"}>About Us</Link></li>
    </>
  );
  return (
    <div className="drawer lg:drawer-open z-50 h-full">
      <input id="my-drawer-2" type="checkbox" className="drawer-toggle" />
      <div className="drawer-content flex flex-col items-center justify-center">
      </div>
      <div className="drawer-side">
        <label
          htmlFor="my-drawer-2"
          aria-label="close sidebar"
          className="drawer-overlay"
        ></label>
        <ul className="menu bg-dashboard-bg text-base-content min-h-full lg:w-60 p-4">
          {sidebarContent}
        </ul>
      </div>
    </div>
  );
};

export default Drawer;
