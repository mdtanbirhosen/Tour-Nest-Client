import ReactPlayer from "react-player";
import Title from "../../../../components/Title/Title";
import Button from "../../../../components/Button/Button";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";


const OverView = () => {
  // React-Spring hover effect for buttons
 

  return (
    <motion.div
      initial={{ opacity: 0, y: 50 }} // Starting state
      animate={{ opacity: 1, y: 0 }} // Animate to visible state
      transition={{ duration: 0.8, ease: "easeOut" }} // Animation timing
      className="p-6 bg-white rounded-lg shadow-lg text-center"
    >
      <Title
        title="Discover the World with TOUR NEST"
        subTitle="Explore Bangladesh's beauty and culture with our all-in-one platform designed to make your travel plans easier, more exciting, and unforgettable."
      ></Title>

      <div className="flex justify-center">
        
          <ReactPlayer
            url="https://www.youtube.com/embed/TUMoDxI0xeU?si=5oG-kdJfhEj96oad&amp;clip=UgkxPB_3DkgfzD4X7tRxxf__WJBuqWGuOLPw&amp;clipt=EO3kKBjN4yo"
            controls
            width="100%"
            height="400px"
            className="rounded-lg shadow-lg"
          />
        
      </div>
      <div className="mt-6 space-x-4 flex justify-center">
        <motion.div
          whileHover={{ scale: 1.03 }}
          whileTap={{ scale: 0.9 }}
          transition={{ duration: 0.2 }}
        >
          <Link to={"/trips"}>
            
              <Button text="Explore Packages"></Button>
            
          </Link>
        </motion.div>
        <motion.div
          whileHover={{ scale: 1.03 }}
          whileTap={{ scale: 0.9 }}
          transition={{ duration: 0.2 }}
        >
          
            <Button text="Watch Full Video"></Button>
          
        </motion.div>
      </div>
      <motion.div
        initial={{ opacity: 0, y: 50 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, delay: 0.5 }}
        className="mt-8"
      >
        <div className="collapse bg-base-200">
          <input type="checkbox" />
          <div className="collapse-title text-xl font-medium">
            Key Features of TOUR NEST
          </div>
          <div className="collapse-content text-left">
            <ul className="list-disc pl-6 text-gray-700">
              <li>Role-based user management (Tourist, Tour Guide, Admin).</li>
              <li>
                Responsive design for all devices, including mobile, tablet, and
                desktop.
              </li>
              <li>Authentication system with login, registration, and Google login.</li>
              <li>Private route security with persistent login states.</li>
              <li>
                Sweet alerts/toasts for CRUD operations and successful actions.
              </li>
              <li>JWT-based authentication with secure token storage.</li>
              <li>
                Dynamic homepage sections like packages, tour guides, and user
                stories.
              </li>
              <li>
                Advanced package booking system with tour guide assignments.
              </li>
              <li>
                Admin features include user management, candidate approvals, and
                package management.
              </li>
              <li>
                Tour guide dashboard for managing assigned tours and stories.
              </li>
              <li>Stripe payment integration for booking confirmation.</li>
              <li>
                Notifications for offers and special discounts (optional).
              </li>
              <li>
                Framer Motion animations for an enhanced user experience.
              </li>
              <li>
                React-query implementation for efficient data fetching.
              </li>
              <li>Pagination for large datasets in dashboards.</li>
              <li>
                Community page with user stories and sharing options via
                React-Share.
              </li>
              <li>
                Forgot password functionality for user account recovery.
              </li>
              <li>
                MongoDB&apos;s `$sample` operator for fetching random data
                dynamically.
              </li>
              <li>
                Interactive and detailed dashboards for tourists, tour guides,
                and admins.
              </li>
            </ul>
          </div>
        </div>
      </motion.div>
    </motion.div>
  );
};

export default OverView;
