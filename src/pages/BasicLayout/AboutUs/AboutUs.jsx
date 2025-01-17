import { Helmet } from "react-helmet-async";
import Title from "../../../components/Title/Title";
import { Button } from "@mui/material";
import { FaFacebook, FaGithub, FaLinkedin } from "react-icons/fa";
import Typewriter from "typewriter-effect";
import { motion } from "framer-motion";

const AboutUs = () => {
  const projects = [
    {
      id: 1,
      name: "Hotel Booking Platform",
      description:
        "A modern, interactive, and secure system for booking hotel rooms with features like authentication, search filters, and payment integration.",
      technologies: ["React", "Tailwind CSS", "Firebase", "Stripe"],
      link: "/projects/hotel-booking-platform",
    },
    {
      id: 2,
      name: "Tourism Management System - TourNest",
      description:
        "A comprehensive platform for managing tours, offering features like responsive design, CRUD operations, and integrations with tools like TanStack Query and React libraries.",
      technologies: ["React", "Tailwind CSS", "Stripe", "Framer Motion"],
      link: "/projects/tournest",
    },
    {
      id: 3,
      name: "The Tourist Guide",
      description:
        "An informational platform showcasing popular destinations, culture, cuisine, and activities in Bangladesh with role-based access for tourists, guides, and admins.",
      technologies: ["React", "DaisyUI", "Framer Motion", "Firebase"],
      link: "/projects/tourist-guide",
    },
  ];

  return (
    <div>
      <Helmet>
        <title>About US || TOUR NEST</title>
      </Helmet>
      <section className="mb-10">
        {/* About Us Title */}
        <Title
          title="About Us"
          subTitle={
            "Here is some info about the developer. You can see other projects and skills about the developer."
          }
        ></Title>

        {/* About Developer Section */}
        <motion.div
          className="bg-white p-2 md:p-5 rounded-lg"
          initial={{ opacity: 0, y: 50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
        >
          <div className="w-full md:w-1/2">
            <h5 className="mb-4">
              <span>Developer</span> <br />
              <span className="text-primary-color">
                <span className="font-medium text-3xl md:text-5xl lg:text-6xl">
                  Md.Tanbir
                </span>{" "}
                Hossen
              </span>
            </h5>
            <h2 className="text-3xl md:text-5xl lg:text-6xl mb-4">
              <Typewriter
                options={{
                  strings: ["Jr. Web Developer", "Frontend Developer"],
                  autoStart: true,
                  loop: true,
                  deleteSpeed: 50,
                }}
              />
            </h2>

            {/* Social Media Links */}
            <div className="flex flex-wrap gap-4 py-5">
              <a
                href="https://www.facebook.com/danger.ahaed.sstanbir.001/"
                target="_blank"
                rel="noopener noreferrer"
                className="hover:text-primary-color"
              >
                <FaFacebook className="text-4xl " />
              </a>
              <a
                href="https://github.com/mdtanbirhosen"
                target="_blank"
                rel="noopener noreferrer"
                className="hover:text-primary-color"
              >
                <FaGithub className="text-4xl " />
              </a>
              <a
                href="https://www.linkedin.com/in/md-tanbir-hosen-669056251/"
                className="hover:text-primary-color"
                title="LinkedIn coming soon!"
              >
                <FaLinkedin className="text-4xl  opacity-50 cursor-not-allowed" />
              </a>
            </div>

            {/* Action Buttons */}
            <div className="flex flex-wrap gap-4">
              <a href="#contact-me">
                <Button
                  variant="contained"
                  className="bg-primary-color hover:bg-primary-color-dark text-white"
                >
                  Hire Me
                </Button>
              </a>
              <a href="/resume.pdf" download="Md_Tanbir_Hossen_Resume.pdf">
                <Button
                  variant="contained"
                  className="bg-gray-600 hover:bg-gray-800 text-white"
                >
                  Download Resume
                </Button>
              </a>
            </div>
          </div>
        </motion.div>
      </section>

      {/* Projects Section */}
      <section className="mb-10">
        <Title
          title="Projects"
          subTitle="Here are some of the projects I've worked on."
        ></Title>
        <motion.div
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"
          initial="hidden"
          animate="visible"
          variants={{
            hidden: { opacity: 0, scale: 0.8 },
            visible: { opacity: 1, scale: 1, transition: { staggerChildren: 0.2 } },
          }}
        >
          {projects.map((project) => (
            <motion.div
              key={project.id}
              className="bg-white shadow-lg p-4 rounded-lg border hover:shadow-xl transition-shadow duration-300"
              whileHover={{ scale: 1.02 }}
            >
              <h3 className="text-2xl font-semibold text-primary-color mb-2">
                {project.name}
              </h3>
              <p className="text-gray-700 mb-3">{project.description}</p>
              <p className="text-sm text-gray-500 mb-4">
                <strong>Technologies:</strong> {project.technologies.join(", ")}
              </p>
              <a
                href={project.link}
                className="text-primary-color underline font-medium"
              >
                View Project
              </a>
            </motion.div>
          ))}
        </motion.div>
      </section>
    </div>
  );
};

export default AboutUs;
