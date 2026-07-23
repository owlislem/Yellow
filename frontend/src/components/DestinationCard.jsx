import PropTypes from "prop-types";

const DestinationCard = (props) => {
  let departureDate = new Date(props.departureDate);
  const departureDay = departureDate.getDate();
  let returneDate = new Date(props.returneDate);
  const returneDay = returneDate.getDate();
  let createdAt = new Date(props.createdAt);
  const departureMonth = departureDate.getMonth();
  function getOrdinalSuffix(departureDay) {
    let suffix;

    switch (departureDay % 10) {
      case 1:
        suffix = departureDay % 100 === 11 ? "th" : "st";
        break;
      case 2:
        suffix = departureDay % 100 === 12 ? "th" : "nd";
        break;
      case 3:
        suffix = departureDay % 100 === 13 ? "th" : "rd";
        break;
      default:
        suffix = "th";
    }

    return suffix;
  }
  function getMonthName(monthNumber) {
    switch (monthNumber) {
      case 1:
        return "January";
      case 2:
        return "February";
      case 3:
        return "March";
      case 4:
        return "April";
      case 5:
        return "May";
      case 6:
        return "June";
      case 7:
        return "July";
      case 8:
        return "August";
      case 9:
        return "September";
      case 10:
        return "October";
      case 11:
        return "November";
      case 12:
        return "December";
      default:
        return "Invalid month number";
    }
  }
  let toDay = new Date();

  function calculateDuration(startDate, endDate) {
    const startMilliseconds = startDate.getTime();
    const endMilliseconds = endDate.getTime();

    const differenceMilliseconds = endMilliseconds - startMilliseconds;

    const millisecondsInADay = 1000 * 60 * 60 * 24;
    const millisecondsInAHour = 1000 * 60 * 60;
    const millisecondsInAMinute = 1000 * 60;
    const millisecondsInASecond = 1000;
    const durationInDays = Math.floor(
      differenceMilliseconds / millisecondsInADay
    );
    const durationInHours = Math.floor(
      differenceMilliseconds / millisecondsInAHour
    );
    const durationInMinutes = Math.floor(
      differenceMilliseconds / millisecondsInAMinute
    );
    const durationInSeconds = Math.floor(
      differenceMilliseconds / millisecondsInASecond
    );
    if (durationInDays > 0) {
      return { value: durationInDays, unit: "day" };
    } else if (durationInHours > 0) {
      return { value: durationInHours, unit: "hour" };
    } else if (durationInMinutes > 0) {
      return { value: durationInMinutes, unit: "minute" };
    } else {
      return { value: durationInSeconds, unit: "second" };
    }
  }
  const duration = calculateDuration(createdAt, toDay).value;
  const unit = calculateDuration(createdAt, toDay).unit;
  console.log(unit);
  return (
    <div className="common-radius flex flex-col shadow-card-shadow min-w-[180px] md:min-w-[225px] lg:min-w-[250px] overflow-hidden">
      <div className="flex-1">
        <img
          src={props.image}
          alt="destinationImage"
          className="w-full h-full max-w-[100%] max-h-[100%]"
        />
      </div>
      <div className="flex-1 flex flex-col justify-end gap-[10px] p-[10px] md:p-[15px] lg:p-[20px] rounded-bl-[30px] rounded-br-[30px]">
        <div className="flex justify-between items-center">
          <p className="nano-medium lg:small-medium">
            {`${departureDay}${getOrdinalSuffix(departureDay)}
            ${getMonthName(departureMonth)}`}
          </p>
          <p className="text-red nano-medium lg:small-medium">{props.price}</p>
        </div>
        <h2 className="small-regular md:body-regular lg:body-medium lg:max-w-[200px]">
          {props.destination}
        </h2>
        <div className="flex justify-between items-center">
          <p className="nano-medium lg:small-medium gray-p">{`${duration} ${
            duration > 1 ? `${unit}s` : unit
          }`}</p>
          <button className="main-button">Book</button>
        </div>
      </div>
    </div>
  );
};

export default DestinationCard;
