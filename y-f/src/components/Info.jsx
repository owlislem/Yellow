import React from "react";
import { PropTypes } from "prop-types";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCheck } from "@fortawesome/free-solid-svg-icons";
const Info = (props) => {
  return (
    <div className="px-[25px] md:px-[50px] lg:px-[150px] md:ml-[40px]">
      <ul className="flex flex-col gap-[40px]">
        <li className="flex list-disc">
          <h3 className="info-title">daparture:</h3>
          <p>{props.departurePlace}</p>
        </li>
        <li className="flex list-disc">
          <h3 className="info-title">daparture Time:</h3>
          <p>{props.departureTime}</p>
        </li>
        <li className="flex list-disc">
          <h3 className="info-title">return Time:</h3>
          <p>{props.returnTime}</p>
        </li>
        <li className="flex list-disc">
          <h3 className="info-title">dress Code:</h3>
          <p>{props.dressCode}</p>
        </li>
        <li className="flex list-disc">
          <h3 className="info-title">included:</h3>
          <div className="included-grid gap-[10px] w-[50%]">
            {props.included.map((item, index) => {
              return (
                <div key={index} className="flex items-center">
                  <FontAwesomeIcon
                    icon={faCheck}
                    className="text-yellow-primary text-[12px] border-[0.5px] rounded-full border-yellow-primary p-[2px] mr-[5px]"
                  />
                  <span className="inline-block">{item}</span>
                </div>
              );
            })}
          </div>
        </li>
      </ul>
    </div>
  );
};

export default Info;
Info.propTypes = {
  departurePlace: PropTypes.string.isRequired,
  departureTime: PropTypes.string.isRequired,
  returnTime: PropTypes.string.isRequired,
  dressCode: PropTypes.string.isRequired,
  included: PropTypes.array.isRequired,
};
