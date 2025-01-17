import PropTypes from "prop-types";

const Button = ({
  text,
  onClick = () => {},
  className = "",
  type = "button",
}) => {
  return (
    <button
      type={type}
      onClick={onClick}
      className={`px-4 py-2 rounded-md text-xs md:text-sm lg:text-base text-white bg-primary-color hover:bg-secondary-color transition duration-200 ${className}`}
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

export default Button;
