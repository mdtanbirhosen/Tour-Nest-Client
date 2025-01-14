import { Link } from "react-router-dom";
import useAuth from "../../hooks/useAuth";
import Button from "../Button/Button";
import logo from "../../assets/logo.png";
const Navbar = () => {
  const { user, logOut } = useAuth();
  const links = (
    <>
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
  const profileLinks = (
    <>
      {user && (
        <li>
          <div className="flex flex-col">
            <p className="font-semibold text-lg">{user?.displayName}</p>
            <p className="text-xs">{user?.email}</p>
          </div>
        </li>
      )}
      <hr className="my-2" />
      <li>
        <Link to={"/dashboard"}>Dashboard</Link>
      </li>
      <li>
        {user ? (
          <button onClick={logOut}>logout</button>
        ) : (
          <Link to={"/login"}>
            <button>login</button>
          </Link>
        )}
      </li>
    </>
  );

  return (
    <div className="navbar bg-base-100 bg-opacity-50 text-primary-color">
      <div className="navbar-start">
        <div className="dropdown">
          <div tabIndex={0} role="button" className="btn btn-ghost lg:hidden">
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
          </div>
          <ul
            tabIndex={0}
            className="menu menu-sm dropdown-content bg-base-100 rounded-box z-[1] mt-3 w-52 p-2 shadow"
          >
            {links}
          </ul>
        </div>
        <div className="flex gap-1 items-center">
          <img src={logo} className="h-[40px]" alt="" />
          <a className=" font-semibold text-xl">TOUR NEST</a>
        </div>
      </div>
      <div className="navbar-center hidden lg:flex">
        <ul className="menu menu-horizontal px-1">{links}</ul>
      </div>
      <div className="navbar-end">
        {user ? (
          <Button text="logout" onClick={logOut}></Button>
        ) : (
          <Link to={"/login"}>
            <Button text="login"></Button>
          </Link>
        )}

        <div className="dropdown dropdown-end">
          <div
            tabIndex={0}
            role="button"
            className="btn btn-ghost btn-circle avatar"
          >
            <div className="w-10 rounded-full">
              <img
                alt="Tailwind CSS Navbar component"
                src="https://img.daisyui.com/images/stock/photo-1534528741775-53994a69daeb.webp"
              />
            </div>
          </div>
          <ul
            tabIndex={0}
            className="menu menu-sm dropdown-content bg-base-100 rounded-box z-[1] mt-3 w-56 p-2 shadow"
          >
            {profileLinks}
          </ul>
        </div>
      </div>
    </div>
  );
};

export default Navbar;
