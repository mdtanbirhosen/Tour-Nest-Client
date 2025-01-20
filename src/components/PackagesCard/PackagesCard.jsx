import PropTypes from "prop-types";
import { Link } from "react-router-dom";
import Button from "../Button/Button";
import { motion } from "framer-motion";
import { useSpring, animated } from "react-spring";

const PackagesCard = ({ randomPackage }) => {
  const { _id, name, price, tourType, images } = randomPackage;

  // React-Spring hover effect for the button
  const buttonSpringStyle = useSpring({
    from: { transform: "scale(1)" },
    to: { transform: "scale(1.05)" },
    config: { tension: 200, friction: 10 },
    reset: true,
  });

  return (
    <motion.div
      className="card card-compact bg-base-100 shadow-xl"
      whileHover={{
        scale: 1.03,
        boxShadow: "0px 10px 15px rgba(0, 0, 0, 0.2)",
      }}
      transition={{ duration: 0.3 }}
    >
      <figure>
        <motion.img
          src={images[0]}
          className="w-full h-[200px] md:h-[250px] object-cover"
          alt={name}
          initial={{ scale: 1 }}
          whileHover={{ scale: 1.1 }}
          transition={{ duration: 0.3 }}
        />
      </figure>
      <div className="card-body">
        <h2 className="card-title">{name}</h2>
        <p>
          <strong>Tour Type:</strong> {tourType}
        </p>
        <p>
          <strong>Price:</strong> {price}
        </p>
        <div className="card-actions">
          <Link to={`/packageDetails/${_id}`}>
            <animated.div style={buttonSpringStyle}>
              <Button text="View Details"></Button>
            </animated.div>
          </Link>
        </div>
      </div>
    </motion.div>
  );
};

PackagesCard.propTypes = {
  randomPackage: PropTypes.object.isRequired,
};

export default PackagesCard;
