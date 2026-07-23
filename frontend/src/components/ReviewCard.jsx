import { PropTypes } from "prop-types";
import Rating from "./Rating";
const ReviewCard = (props) => {
  return (
    <div className="w-[200px] min-w-[200px] lg:min-w-[250px] lg:w-[250px] flex flex-col gap-[10px] justify-center items-center bg-white p-[20px] lg:p-[40px] common-radius shadow-review-shadow">
      <div className="w-[65px] h-[65px] lg:w-[75px] lg:h-[75px] rounded-full overflow-hidden">
        <img src={props.imageUrl} className="max-w-full max-h-full" />
      </div>
      <p className="paragraph-sizing text-center">{props.username}</p>
      <Rating rating={props.rating} />
      <p className="paragraph-sizing text-center">{props.content}</p>
    </div>
  );
};

export default ReviewCard;
ReviewCard.propTypes = {
  imageUrl: PropTypes.string.isRequired,
  username: PropTypes.string.isRequired,
  rating: PropTypes.number.isRequired,
  content: PropTypes.string.isRequired,
};
