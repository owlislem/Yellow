import { PropTypes } from "prop-types";
import ReservationsNumber from "./ReservationsNumber";
import { useEffect, useState } from "react";
const Reservation = ({ destination }) => {
  const [value, setValue] = useState(0);
  useEffect(() => console.log(value), [value]);
  const increment = () => {
    setValue((prevValue) => prevValue + 1);
  };

  const decrement = () => {
    if (value > 0) {
      setValue((prevValue) => prevValue - 1);
    }
  };
  return (
    <div className="mx-[25px] md:mx-[50px]  lg:mx-[150px] p-[20px] common-radius bg-gray-v4 flex flex-col gap-[15px]">
      <div className="flex justify-between items-center">
        <h1 className="h3-semibold capitalize">{destination.title}</h1>
        <div className="text-gray-v5">
          <p className="text-red font-medium inline-block">
            {destination.price}
          </p>{" "}
          / person
        </div>
      </div>
      <div className="flex justify-between items-center">
        <p className="text-gray-v5 inline-block">for {destination.duration}</p>
        <ReservationsNumber
          increment={increment}
          decrement={decrement}
          value={value}
        />
      </div>
      <div className="flex items-center justify-between">
        <div className="rounded-[20px] border-2 border-black w-fit p-[5px]">
          6 Juin 2024
        </div>
        <button className="main-button capitalize">book now</button>
      </div>
    </div>
  );
};

export default Reservation;
Reservation.propTypes = {
  destination: PropTypes.object.isRequired,
};
