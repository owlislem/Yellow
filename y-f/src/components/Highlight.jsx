import PropTypes from "prop-types";
const Highlight = ({ title, description, imageUrl, id }) => {
  return (
    <div
      className={`flex justify-between items-center ${
        id % 2 ? "flex-row-reverse" : ""
      }`}
    >
      <div
        className={`w-[50%] common-radius p-[30px] flex flex-col justify-center relative h-[300px] gap-[20px] ${
          id % 2 ? "bg-black pl-[80px]" : "bg-gray-v2 pr-[80px]"
        }`}
      >
        <h1
          className={`h3-semibold mb-[10px] font-roboto capitalize ${
            id % 2 ? "text-yellow-primary" : ""
          }`}
        >
          {title}
        </h1>
        <p className={`base-regular pl-[20px] ${id % 2 ? "text-white" : ""}`}>
          {description}
        </p>
        <div
          className={`common-radius overflow-hidden w-[80%] h-[90%] absolute translate-y-[-50%] top-[52%] ${
            id % 2
              ? "right-[100%] translate-x-[20%]"
              : "left-[100%] translate-x-[-20%]"
          }`}
        >
          <img
            src={imageUrl}
            alt="highlightImage"
            className="max-w-full max-h-full common-radius"
          />
        </div>
      </div>
    </div>
  );
};
Highlight.propTypes = {
  id: PropTypes.number.isRequired,
  title: PropTypes.string.isRequired,
  description: PropTypes.string.isRequired,
  imageUrl: PropTypes.string.isRequired,
};
export default Highlight;
