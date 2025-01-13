
import { FaGithub, FaLinkedin, FaTwitter } from "react-icons/fa";

const Footer = () => {
  return (
    <footer className="bg-gray-800 text-gray-200 p-6 flex flex-col md:flex-row justify-between items-center">
      {/* Logo Section */}
      <div className="flex items-center gap-3">
        <img
          src="/path/to/logo.png" // Replace with the actual path to your logo
          alt="TourNest Logo"
          className="w-12 h-12"
        />
        <h3 className="text-xl font-bold">TourNest</h3>
      </div>

      {/* Social Links Section */}
      <div className="mt-4 md:mt-0">
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
