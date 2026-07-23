import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { useRef, useState, useEffect } from "react";
import {
  getStorage,
  ref,
  uploadBytesResumable,
  getDownloadURL,
} from "firebase/storage";
import { app } from "../../firebase.js";
import { updateUser } from "../../features/user/userAuthSlice.jsx";

const UserDetails = ({ direction, values, handleImage }) => {
  const dispatch = useDispatch();
  const fileRef = useRef();

  const userInfo = {
    bio: "",
    level: "Master Level",
  };

  //user levels
  const getTravelLevel = (points) => {
    if (points >= 80) {
      return "Master Traveler";
    } else if (points >= 60) {
      return "Expert Traveler";
    } else if (points >= 40) {
      return "Seasoned Traveler";
    } else if (points >= 20) {
      return "Frequent Traveler";
    } else {
      return "New Traveler";
    }
  };

  return (
    <div>
      <div
        className={`bg-gray-v3  px-4 sm:px-[35px] rounded-[30px] ${
          direction == "row"
            ? "py-[35px] "
            : " pt-[50px] pb-[50px]   w-[260px] sm:w-[285px]"
        }`}
      >
        <div
          className={`flex flex-col   ${
            direction == "row"
              ? "sm:flex-row justify-start sm:items-start"
              : "sm:flex-col justify-center  "
          }  gap-5 items-center   md:items-center`}
        >
          <div className="flex-shrink-0">
            <img
              src={values?.profileImage}
              onClick={() => fileRef.current.click()}
              className=" object-cover w-[70px] h-[70px]  md:w-[90px] md:h-[90px] lg:w-[110px] lg:h-[110px] rounded-[50%] "
            />
            <input
              type="file"
              className="hidden"
              ref={fileRef}
              accept="image/*"
              onChange={handleImage}
            />
          </div>

          <div
            className={`flex flex-col items-center text-center  justify-center ${
              direction == "row" ? " sm:items-start " : " sm:items-center "
            } `}
          >
            <h1 className="text-[20px] sm:text-[24px] md:text-[30px] font-medium -mt-[15px] sm:-mt-[0px] mb-[10px] sm:mb-[0px] capitalize text-center ">
              {values.username}
            </h1>
            <p className="py-1 text-[20px]">{getTravelLevel(values.points)} </p>
            {/* after ading bio to current user informations put currentUser.bio */}
            <p
              className={`md:text-[16px] lg:text-[18px] text-center font-light ${
                direction == "row" ? "sm:text-start" : "sm:text-center"
              } `}
            >
              {values.bio}{" "}
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};
export default UserDetails;
