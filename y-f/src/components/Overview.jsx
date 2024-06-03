import { PropTypes } from "prop-types";
const Overview = (props) => {
  return (
    <div className="px-[25px] md:px-[50px]  lg:px-[150px] mt-[20px] mb-[40px] md:mb-[60px] lg:mb-[80px]">
      <h2 className="capitalize h3-semibold mb-[10px]">overview:</h2>
      <p className="md:ml-[40px] text-gray-p nano-regular md:small-regular">
        {props.overview}
      </p>
      <div className="flex gap-[10px] mt-[10px]  md:ml-[40px]">
        {props.important.map((item, index) => {
          return (
            <div
              key={index}
              className="rounded-[20px] w-[50px] md:w-[60px] lg:w-[70px] border-[1.5px] border-yellow-primary flex items-center justify-center capitalize"
            >
              {item}
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default Overview;
Overview.propTypes = {
  overview: PropTypes.string.isRequired,
  important: PropTypes.array.isRequired,
};
