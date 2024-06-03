import { faStar } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { PropTypes } from "prop-types";
const Rating = ({ rating }) => {
  const starArray = Array.from({ length: 5 }, (_, index) => ({
    filled: index < Math.floor(rating),
  }));
  return (
    <div>
      {starArray.map((star, index) => (
        <FontAwesomeIcon
          key={index}
          icon={faStar}
          className={`small-regular ${
            star.filled ? "text-yellow-primary" : "text-gray-v2"
          }`}
        />
      ))}
    </div>
  );
};

export default Rating;
Rating.propTypes = {
  rating: PropTypes.number.isRequired,
};
