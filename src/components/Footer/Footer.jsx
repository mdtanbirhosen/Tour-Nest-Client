import { FaGithub, FaLinkedin, FaTwitter } from "react-icons/fa";
import logo from '../../assets/logo.png'
import { Link } from "react-router-dom";
import useAdmin from "../../hooks/useAdmin";
import useTourGuide from "../../hooks/useTourGuide";

const Footer = () => {
  const [isAdmin] = useAdmin();
  const [isTourGuide] = useTourGuide();
  return (
    <footer className="bg-white rounded-2xl max-w-screen-2xl mx-auto  text-primary-color p-6 flex flex-col md:flex-row justify-between items-center md:items-start gap-6">
      {/* Logo Section */}
      <div className="flex items-center gap-3">
        <img
          src={logo} // Replace with the actual path to your logo
          alt="TourNest Logo"
          className="w-12 h-12"
        />
        <h3 className="text-xl font-bold">TourNest</h3>
      </div>

      {/* Navigation Links Section */}
      <div className="flex flex-col md:flex-row gap-6 md:gap-12">
        {/* Dashboard Links */}
        <div>
          <h4 className="text-lg font-semibold mb-2">Dashboard Links</h4>
          <ul className="space-y-2">
            <li>
              <Link to={"/dashboard/"}>Manage Profile</Link>
            </li>
            {/* Tourist only routes */}
            {!isAdmin && !isTourGuide && (
              <>
                <li>
                  <Link to={"/dashboard/touristDashboard/myBookings"}>My Bookings</Link>
                </li>
                <li>
                  <Link to={"/dashboard/touristDashboard/joinAsTourGuide"}>Join as Tour Guide</Link>
                </li>
              </>
            )}
            {/* For tourists and tour guides */}
            {!isAdmin && (
              <>
                <li>
                  <Link to={"/dashboard/touristDashboard/manageStories"}>Manage Stories</Link>
                </li>
                <li>
                  <Link to={"/dashboard/touristDashboard/addStories"}>Add Stories</Link>
                </li>
              </>
            )}
            {/* Tour guide only routes */}
            {isTourGuide && (
              <li>
                <Link to={"/dashboard/touristGuideDashboard/myAssignedTours"}>My Assigned Tours</Link>
              </li>
            )}
            {/* Admin only routes */}
            {isAdmin && (
              <>
                <li>
                  <Link to={"/dashboard/adminDashboard/addPackage"}>Add Package</Link>
                </li>
                <li>
                  <Link to={"/dashboard/adminDashboard/manageUsers"}>Manage Users</Link>
                </li>
                <li>
                  <Link to={"/dashboard/adminDashboard/manageCandidates"}>Manage Candidates</Link>
                </li>
              </>
            )}
          </ul>
        </div>

        {/* Basic Links */}
        <div>
          <h4 className="text-lg font-semibold mb-2">Quick Links</h4>
          <ul className="space-y-2">
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
          </ul>
        </div>
      </div>

      {/* Social Links Section */}
      <div>
        <h4 className="text-lg font-semibold mb-2">Connect with the Developer</h4>
        <div className="flex gap-4">
          <a
            href="https://github.com/your-profile" // Replace with your GitHub profile URL
            target="_blank"
            rel="noopener noreferrer"
            className="text-gray-400 hover:text-white text-2xl"
          >
            <FaGithub />
          </a>
          <a
            href="https://linkedin.com/in/your-profile" // Replace with your LinkedIn profile URL
            target="_blank"
            rel="noopener noreferrer"
            className="text-gray-400 hover:text-white text-2xl"
          >
            <FaLinkedin />
          </a>
          <a
            href="https://twitter.com/your-profile" // Replace with your Twitter profile URL
            target="_blank"
            rel="noopener noreferrer"
            className="text-gray-400 hover:text-white text-2xl"
          >
            <FaTwitter />
          </a>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
