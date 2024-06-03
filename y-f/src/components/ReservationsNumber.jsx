import { PropTypes } from "prop-types";
import {
  faUser,
  faUserGroup,
  faUserSlash,
  faUsers,
} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

const ReservationsNumber = ({ increment, decrement, value }) => {
  return (
    <div className="flex gap-[5px] items-center w-[90px] h-[30px] border border-black-v2 rounded-[20px] p-[10px]">
      {!value && <FontAwesomeIcon icon={faUserSlash} className="w-[20px]" />}
      {value === 1 && <FontAwesomeIcon icon={faUser} className="w-[20px]" />}
      {value === 2 && (
        <FontAwesomeIcon icon={faUserGroup} className="w-[20px]" />
      )}
      {value > 2 && <FontAwesomeIcon icon={faUsers} className="w-[20px]" />}

      <div>
        <input
          value={value}
          type="text"
          className={`outline-none w-[20px] h-[20px] p-0 m-0 bg-transparent ${
            value ? "text-black" : "text-gray-v5"
          }`}
          size={3}
          onChange={() => console.log(value)}
        />
      </div>
      <div className="flex flex-col justify-start">
        <button
          type="button"
          onClick={increment}
          className="h-[15px] w-[15px] flex items-center justify-center"
        >
          +
        </button>
        <button
          type="button"
          onClick={decrement}
          className="h-[15px] w-[15px] flex items-center justify-center"
        >
          -
        </button>
      </div>
    </div>
  );
};

export default ReservationsNumber;
ReservationsNumber.propTypes = {
  increment: PropTypes.func,
  decrement: PropTypes.func,
  value: PropTypes.number,
};
