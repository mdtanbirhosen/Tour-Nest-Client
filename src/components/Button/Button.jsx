import PropTypes from "prop-types";
import { useSpring, animated } from "react-spring";
const Button = ({
  text,
  onClick = () => {},
  className = "",
  type = "button",
}) => {
  const buttonSpringStyle = useSpring({
  from: { transform: "scale(1)" },
  to: { transform: "scale(1.05)" },
  config: { tension: 200, friction: 10 },
  reset: true,
});
  return (
    <animated.div style={buttonSpringStyle}>
    <button
      type={type}
      onClick={onClick}
      className={`px-4 py-2 rounded-md text-xs md:text-sm lg:text-base text-white bg-primary-color hover:bg-secondary-color transition duration-200 ${className}`}
    >
      {text}
    </button>
    </animated.div>
  );
};

Button.propTypes = {
  text: PropTypes.string.isRequired,
  onClick: PropTypes.func,
  className: PropTypes.string,
  type: PropTypes.oneOf(["button", "submit", "reset"]),
};

export default Button;




//               <Button text="Explore Packages"></Button>
//             
