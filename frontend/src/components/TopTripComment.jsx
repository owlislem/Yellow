import PropTypes from "prop-types";
import Rating from "./Rating";

const TopTripComment = ({ username, comment, rating }) => {
  return (
    <div>
      <div>
        <img />
      </div>
      <div>
        <h1></h1>
        <Rating rating={5} />
      </div>
    </div>
  );
};
TopTripComment.propTypes = {
  username: PropTypes.string.isRequired,
  comment: PropTypes.string.isRequired,
  rating: PropTypes.number.isRequired,
};
export default TopTripComment;
