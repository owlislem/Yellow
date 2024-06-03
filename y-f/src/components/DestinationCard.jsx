import PropTypes from "prop-types";

const DestinationCard = (props) => {
  return (
    <div className="common-radius flex flex-col shadow-card-shadow min-w-[180px] md:min-w-[225px] lg:min-w-[250px] overflow-hidden">
      <div className="flex-1">
        <img
          src={props.cardImageUrl}
          alt="destinationImage"
          className="w-full h-full max-w-[100%] max-h-[100%]"
        />
      </div>
      <div className="flex-1 flex flex-col justify-end gap-[10px] p-[10px] md:p-[15px] lg:p-[20px] rounded-bl-[30px] rounded-br-[30px]">
        <div className="flex justify-between items-center">
          <p className="nano-medium lg:small-medium">{props.date}</p>
          <p className="text-red nano-medium lg:small-medium">{props.price}</p>
        </div>
        <h2 className="small-regular md:body-regular lg:body-medium lg:max-w-[200px]">
          {props.title}
        </h2>
        <div className="flex justify-between items-center">
          <p className="nano-medium lg:small-medium gray-p">{props.duration}</p>
          <button className="main-button">Book</button>
        </div>
      </div>
    </div>
  );
};

export default DestinationCard;
DestinationCard.propTypes = {
  cardImageUrl: PropTypes.string.isRequired,
  date: PropTypes.string.isRequired,
  price: PropTypes.string.isRequired,
  title: PropTypes.string.isRequired,
  duration: PropTypes.string.isRequired,
};
