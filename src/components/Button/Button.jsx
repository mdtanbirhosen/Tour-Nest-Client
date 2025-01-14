
import PropTypes from "prop-types";

const Button = ({ text, onClick, className, type }) => {
  return (
    <button
      type={type}
      onClick={onClick}
      className={`px-4 py-2 rounded-md text-white bg-primary-color hover:bg-secondary-color transition duration-200 ${className}`}
    >
      {text}
    </button>
  );
};

Button.propTypes = {
  text: PropTypes.string.isRequired, 
  onClick: PropTypes.func,          
  className: PropTypes.string,      
  type: PropTypes.oneOf(["button", "submit", "reset"]), 
};

Button.defaultProps = {
  onClick: () => {},
  className: "",
  type: "button",
};

export default Button;
