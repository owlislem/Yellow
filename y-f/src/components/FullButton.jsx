import PropTypes from "prop-types";
const FullButton = (props) => {
  return (
    <button className="py-[8px] px-6 rounded-full bg-yellow-400 transition-all duration-300 capitalize text-black text-[18px] font-custom font-medium hover:shadow-md hover:scale-95 h-[45px] ">
      {props.text}
    </button>
  );
};

// Define prop types for the component
FullButton.propTypes = {
  text: PropTypes.string.isRequired,
};

export default FullButton;
