import { PropTypes } from "prop-types";
const TopTripInfo = ({ label, icon }) => {
  return (
    <div className=" flex flex-col gap-[10px] items-center justify-center h-fit w-fit">
      <div className="bg-yellow-primary bg-opacity-[22%] rounded-[20px] p-[15px] flex felx-center justify-center w-[60px] h-[60px]">
        {icon}
      </div>
      <p className="small-medium text-gray-v6">{label}</p>
    </div>
  );
};

export default TopTripInfo;

TopTripInfo.propTypes = {
  label: PropTypes.string.isRequired,
  icon: PropTypes.object.isRequired,
};
