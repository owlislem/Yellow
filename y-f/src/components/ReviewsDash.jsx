import { IoSearch } from "react-icons/io5";
import { useSearchParams } from "react-router-dom";
import { MdKeyboardArrowDown } from "react-icons/md";
import { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { getTours } from "../features/tour/tourSlice";
import {
  acceptReview,
  getReviews,
  getReviewsInTour,
  notAcceptReview,
} from "../features/review/reviewSlice";
import { CiMenuKebab } from "react-icons/ci";
import starIcon from "./../assets/StarIcons.svg";
import { IoMdAddCircle } from "react-icons/io";
import { MdDelete } from "react-icons/md";

function ReviewsDash() {
  const [dest, setDesti] = useSearchParams({ dest: "" });
  const [listTrip, setListTrip] = useState([]);
  const [mainTrip, setMainTrip] = useState("");
  const [idTrip, setIdTrip] = useState("665a6eeeafaa4d21cf0624e5");
  const [reviews, setReviews] = useState([]);
  const [reviewsAccepted, setReviewsAccepted] = useState([]);
  const [activeModal, setActiveModal] = useState(null); // Track the active modal

  const [modal, setModal] = useState(false);
  const [render, setRender] = useState(false);
  console.log(listTrip);
  const dispatch = useDispatch();
  useEffect(() => {
    (async () => {
      const { payload } = await dispatch(getTours());
      setListTrip(payload.tours);
      setMainTrip(payload.tours[0].Destination);
    })();
  }, [dispatch]);

  useEffect(() => {
    (async () => {
      const { payload } = await dispatch(getReviewsInTour(idTrip));
      setReviews(payload.reviews);
    })();
  }, [idTrip, render]);
  useEffect(() => {
    (async () => {
      const { payload } = await dispatch(getReviews());
      setReviewsAccepted(payload.reviews);
    })();
  }, [render]);
  const [displayList, setDisplayList] = useState(false);
  console.log(reviews);

  return (
    <div className="w-full h-full bg-gray-v2 ">
      <div className="h-[80px] flex justify-between items-center fixed z-10 bg-inherit w-[80%] px-[60px] ">
        <h1 className="text-[25px] md:text-[40px] font-[500]">
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
      <div className="pt-[120px] py-[30px] px-[50px] text-[30px] font-[500] flex justify-between flex-wrap">
        <p className="text-[#464646]">Trip reviews</p>
        <p
          className="font-[400] text-[20px] flex items-center gap-[5px]"
          onClick={() => setDisplayList(true)}
        >
          {mainTrip} <MdKeyboardArrowDown />
        </p>
        {displayList && (
          <div
            className="inset-0 fixed bg-[rgba(0,0,0,0.5)] z-50 flex justify-center items-center"
            onClick={() => setDisplayList(false)}
          >
            <div
              className="py-[50px] px-[70px] bg-gray-200 overflow-auto"
              style={{ borderRadius: "10px" }}
            >
              {listTrip.map((list) => {
                return (
                  <p
                    key={list._id}
                    onClick={() => {
                      setMainTrip(list.Destination);
                      setIdTrip(list._id);
                    }}
                    className="text-black text-[16px] py-5 relative pl-[20px] before:absolute before:left-0 before:content-['||'] before:text-yellow-500"
                  >
                    {list.Destination}
                  </p>
                );
              })}
            </div>
          </div>
        )}
      </div>
      <div className="flex relative justify-between mx-[20px]">
        {reviews.map((review) => {
          return (
            <div
              key={review.id}
              className="flex gap-[15px] items-center p-[20px] justify-between w-full bg-white before:absolute before:left-0 before:top-0 before:content-[''] before:w-[8px] before:h-[100%] before:bg-[#FFD600]"
            >
              <img
                src={review.user.profileImage}
                className="w-[42px] h-[42px]"
              />
              <div className="w-[95%]">
                <p className="font-bold">{review.user.username}</p>
                <p>{review.reviewContent}</p>
                <div className="flex">
                  {Array.from({ length: review.rating }, (_, i) => (
                    <img key={i} src={starIcon} alt="Star" />
                  ))}
                </div>
              </div>
              <div className="relative">
                <CiMenuKebab onClick={() => setActiveModal(review.id)} />
                {activeModal === review.id && (
                  <div className="absolute bg-gray-v1 px-[22px] py-[10px] flex flex-col gap-[10px] left-[-80px] top-[50px] shadow-md rounded-md">
                    <p
                      className="flex gap-[5px] items-center "
                      onClick={async () => {
                        console.log("hahah");
                        await dispatch(acceptReview(review._id));
                        setRender((prev) => !prev);
                        console.log("hahah");
                      }}
                    >
                      <IoMdAddCircle className="text-[20px]" />
                      Add
                    </p>
                    <p className="flex gap-[5px] items-center ">
                      <MdDelete className="text-[20px]" />
                      Delete
                    </p>
                  </div>
                )}
              </div>
            </div>
          );
        })}
      </div>
      <div>
        <h1 className="text-[#464646] text-[30px] font-[500] p-[20px]">
          Home Page Reviews
        </h1>
        <div className="flex flex-col relative justify-between mx-[20px]">
          {reviewsAccepted.map((review) => {
            return (
              <div
                key={review.id}
                className="flex gap-[15px] items-center p-[20px] justify-between w-full bg-white before:absolute before:left-0 before:top-0 before:content-[''] before:w-[8px] before:h-[100%] before:bg-[#FFD600]"
              >
                <img
                  src={review.user.profileImage}
                  className="w-[42px] h-[42px]"
                />
                <div className="w-[95%]">
                  <p className="font-bold">{review.user.username}</p>
                  <p>{review.reviewContent}</p>
                  <div className="flex">
                    {Array.from({ length: review.rating }, (_, i) => (
                      <img key={i} src={starIcon} alt="Star" />
                    ))}
                  </div>
                </div>
                <div className="relative">
                  <CiMenuKebab onClick={() => setActiveModal(review.id)} />
                  {activeModal === review.id && (
                    <div className="absolute bg-gray-v1 px-[22px] py-[10px] flex flex-col gap-[10px] left-[-80px] top-[50px] shadow-md rounded-md">
                      <p
                        className="flex gap-[5px] items-center "
                        onClick={async () => {
                          await dispatch(notAcceptReview(review.id));
                          setRender((prev) => !prev);
                        }}
                      >
                        <MdDelete className="text-[20px]" />
                        Delete
                      </p>
                    </div>
                  )}
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}

export default ReviewsDash;
