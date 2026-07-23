import PropTypes from "prop-types";
const Experience = (props) => {
  return (
    <div
      className={` relative h-[260px] md:h-[280px] lg:h-[300px] min-w-[180px] md:min-w-[220px] lg:min-w-[250px] cursor-pointer rounded-[30px] overflow-hidden ${
        props.id % 2 ? "animate-pair" : "animate-impair"
      }`}
    >
      <img
        src={props.imageUrl}
        className="w-full h-full max-w-full max-h-full shadow-destination-shadow common-radius"
      />
      <h2
        className={`title-position nano-medium lg:small-semibold text-center text-white`}
      >
        {props.title}
      </h2>
    </div>
  );
};

export default Experience;
Experience.propTypes = {
  id: PropTypes.number.isRequired,
  imageUrl: PropTypes.string.isRequired,
  title: PropTypes.string.isRequired,
};
