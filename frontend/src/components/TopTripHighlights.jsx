import PropTypes from "prop-types";
import Highlight from "./Highlight";
const TopTripHighlights = ({ highlights }) => {
  return (
    <div className="section-padding mb-[200px]">
      <div className="text-center tracking-wider font-Poppins mb-[100px]">
        <h1 className="h1-semibold uppercase text-gray-v2">highlights</h1>
        <p className="h3-semibold capitalize text-yellow-primary mt-[-35px]">
          trip highlights
        </p>
      </div>
      <div className="flex-col flex gap-[100px]">
        {highlights.map((highlight, index) => (
          <Highlight
            key={index}
            id={index}
            title={highlight.title}
            description={highlight.description}
            imageUrl={highlight.imageUrl}
          />
        ))}
      </div>
    </div>
  );
};
TopTripHighlights.propTypes = {
  highlights: PropTypes.array.isRequired,
};
export default TopTripHighlights;
