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
      <li>
        <Link to={"/trips"}>Trips</Link>
      </li>
      <li>
        <Link to={"/community"}>Community</Link>
      </li>
      <li>
        <Link to={"/aboutUs"}>About Us</Link>
      </li>
    </>
  );
  return (
    <div className="drawer lg:drawer-open ">
      <input id="my-drawer-2" type="checkbox" className="drawer-toggle" />
      <div className="drawer-content flex flex-col items-center justify-center">
        {/* Page content here */}
        
        
        
        {/* old code ... */}
        {/* <label
          htmlFor="my-drawer-2"
          className="btn btn-ghost drawer-button lg:hidden ab"
        >
          <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-5 w-5"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M4 6h16M4 12h8m-8 6h16"
              />
            </svg>
        </label> */}
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
