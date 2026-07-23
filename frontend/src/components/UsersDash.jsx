import { IoSearch } from "react-icons/io5";
import iconsUser from "../assets/icon-user.svg";
import iconsTrip from "../assets/icon-trip.svg";
import { useDispatch, useSelector } from "react-redux";
import {
  countBooking,
  countSumPrice,
  countTour,
  countUser,
} from "../features/tour/tourSlice";

import { useSearchParams } from "react-router-dom";
import { useEffect, useState } from "react";
import ArrayOfUser from "./ArrayOfUser";
import DialogDeleteConfrm from "./DialogDeleteConfrm";
function UsersDash() {
  const dispatch = useDispatch();
  const [state, setState] = useState({
    tourState: 0,
    userState: 0,
    bookingState: 0,
    sumPrice: 0,
  });
  const [render, setRender] = useState(false);

  useEffect(() => {
    (async () => {
      const { payload } = await dispatch(countUser());
      setState((state) => ({ ...state, userState: payload?.userCount }));
    })();
    (async () => {
      const { payload } = await dispatch(countTour());
      console.log(payload);
      setState((state) => ({ ...state, tourState: payload?.tourCount }));
    })();
    (async () => {
      const { payload } = await dispatch(countBooking());
      console.log(payload);
      setState((state) => ({ ...state, bookingState: payload?.bookingCount }));
    })();
    (async () => {
      const { payload } = await dispatch(countSumPrice());
      console.log(payload);
      setState((state) => ({ ...state, sumPrice: payload?.totalSum }));
    })();
  }, [dispatch, render]);
  console.log(state);

  const [dest, setDesti] = useSearchParams({ dest: "" });

  const { user: currentUser } = useSelector(
    (state) => state.userAuthReducer.user
  );
  const cardList = [
    {
      id: 1,
      cardTitle: "Total Users",
      cardInfo: state.userState,
      image: iconsUser,
    },
    {
      id: 2,
      cardTitle: "Total Trips",
      cardInfo: state.tourState,
      image: iconsTrip,
    },
    {
      id: 3,
      cardTitle: "Bookings",
      cardInfo: state.bookingState,
      image: iconsTrip,
    },
    {
      id: 4,
      cardTitle: "Revenue DA",
      cardInfo: state.sumPrice,
      image: iconsTrip,
    },
  ];
  console.log(cardList + "anaaa fdfsdfsd");
  console.log(currentUser);
  return (
    <div className="w-full h-full bg-gray-v2">
      <div className="h-[80px] flex justify-between items-center fixed z-10 bg-inherit w-[80%] px-[60px]">
        <h1 className="text-[40px] font-[500]">
          {location.pathname.split("/")[2]}
        </h1>
        <div className="relative">
          <IoSearch className="absolute right-[20px] top-[25%]" />

          <input
            type="text"
            className="w-[120px] md:w-[280px] h-[42px] py-[20px] indent-[15px]"
            placeholder="Search"
            style={{ borderRadius: "30px", border: "1px solid black" }}
            onClick={(e) =>
              setDesti((prev) => {
                prev.set(dest, e.target.value);
                return prev;
              })
            }
          />
        </div>
      </div>
      <div className="dashbord-cards pt-[100px] px-[40px]">
        {cardList.map((card) => {
          return (
            <div
              key={card.id}
              className="flex flex-col md:flex-row flex-1 justify-center min-[150px] items-center py-[15px] gap-[15px] bg-white rounded-[20px]"
            >
              <img
                className="icon-side max-w-[50px] w-[50px] rounded-full"
                src={card.image}
              />
              <div className="info-side flex flex-col justify-center items-center">
                <p className="number font-bold text-center text-[30px]">
                  {card.cardInfo}
                </p>
                <p className="sub-info text-center text-[18px] text-[#00000087]">
                  {card.cardTitle}
                </p>
              </div>
            </div>
          );
        })}
      </div>
      <div className="my-[40px] p-[20px]">
        <ArrayOfUser render={render} setRender={setRender} />
      </div>
    </div>
  );
}

export default UsersDash;
