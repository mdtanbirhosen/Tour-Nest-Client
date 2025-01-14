import { Link } from "react-router-dom";

const Drawer = () => {
  const sidebarContent = (
    <>
      {/* Sidebar content here */}
      {/* dashboard links */}
         
      <li><Link to={'/dashboard/'}>Manage profile</Link></li>
      <li><Link to={'/dashboard/MyBookings'}>My Bookings</Link></li>
      <li><Link to={'/dashboard/ManageStories'}> Manage Stories</Link></li>
      <li><Link to={'/dashboard/AddStories'}>Add Stories</Link></li>
      <li><Link to={'/dashboard/JoinAsTourGuide'}>Join as tour guide</Link></li>

      <div className="divider"></div>
      {/* basic links */}
      <li>
        <Link to={"/"}>Home</Link>
      </li>
    </>
  );
  return (
    <div className="drawer lg:drawer-open">
      <input id="my-drawer-2" type="checkbox" className="drawer-toggle" />
      <div className="drawer-content flex flex-col items-center justify-center">
        {/* Page content here */}
        <label
          htmlFor="my-drawer-2"
          className="btn btn-primary drawer-button lg:hidden"
        >
          Open drawer
        </label>
      </div>
      <div className="drawer-side">
        <label
          htmlFor="my-drawer-2"
          aria-label="close sidebar"
          className="drawer-overlay"
        ></label>
        <ul className="menu bg-base-200 text-base-content min-h-full lg:w-60 p-4">
          {sidebarContent}
        </ul>
      </div>
    </div>
  );
};

export default Drawer;
