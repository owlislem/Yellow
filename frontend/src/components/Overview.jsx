import { PropTypes } from "prop-types";
const Overview = (props) => {
  return (
    <div className="px-[25px] md:px-[50px]  lg:px-[150px] mt-[20px] mb-[40px] md:mb-[60px] lg:mb-[80px]">
      <h2 className="capitalize h3-semibold mb-[10px]">overview:</h2>
      <p className="md:ml-[40px] text-gray-p nano-regular md:small-regular">
        {props.overview}
      </p>
    </div>
  );
};

export default Overview;
