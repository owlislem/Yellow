import FaceLaughSvg from "./FaceLaughSvg";
import MessageSvg from "./MessageSvg";
import RoadSvg from "./RoadSvg";
import StarSvg from "./StarSvg";
import TopTripInfo from "./TopTripInfo";
import PropTypes from "prop-types";
const TopTripInfos = ({ travelersNumber, rating, reviewsNumber, distance }) => {
  return (
    <div className="flex gap-[40px] md:gap-[60px] lg:gap-[80px] m-auto w-fit mb-[50px]">
      <TopTripInfo label={travelersNumber} icon={<FaceLaughSvg />} />
      <TopTripInfo label={rating} icon={<StarSvg />} width={50} height={50} />
      <TopTripInfo label={reviewsNumber} icon={<MessageSvg />} />
      <TopTripInfo label={distance} icon={<RoadSvg />} />
    </div>
  );
};
TopTripInfos.propTypes = {
  travelersNumber: PropTypes.string.isRequired,
  rating: PropTypes.string.isRequired,
  reviewsNumber: PropTypes.string.isRequired,
  distance: PropTypes.string.isRequired,
};
export default TopTripInfos;
