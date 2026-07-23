import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import ReviewCard from "./ReviewCard";
import { reviews } from "./index";
import {
  faCircleArrowLeft,
  faCircleArrowRight,
} from "@fortawesome/free-solid-svg-icons";
import { useRef } from "react";
import Rating from "./Rating";

const Reviews = () => {
  const scrollableContentRef = useRef(null);
  const handleRightClick = () => {
    const scrollableContent = scrollableContentRef.current;
    if (scrollableContent) {
      scrollableContent.scrollLeft += 810;
    }
  };
  const handleLeftClick = () => {
    const scrollableContent = scrollableContentRef.current;
    if (scrollableContent) {
      scrollableContent.scrollLeft -= 810;
    }
  };
  return (
    <div className="section-padding bg-gray-v1 pb-[50px]">
      <h1 className="h3-medium lg:h2-medium capitalize ">
        what our travelers says?
      </h1>
      <p className="small-regular md:body-regular mb-[50px] md:mb-[30px] gray-p">
        Hear from our happy travelers.
      </p>
      <div className="relative w-fit m-auto">
        <div
          className=" hidden md:flex justify-center mx-auto w-[660px] lg:w-[810px] gap-[20px] px-[10px] py-[10px] lg:py-[20px] scroll shadow-card-shadow common-radius bg-gray-v3"
          ref={scrollableContentRef}
        >
          {reviews.map((review) => {
            return (
              <ReviewCard
                key={review.id}
                imageUrl={review.imageUrl}
                username={review.username}
                rating={review.rating}
                content={review.content}
              />
            );
          })}
        </div>
        <FontAwesomeIcon
          icon={faCircleArrowRight}
          className="reviews_right-arrow hidden md:block"
          onClick={handleRightClick}
        />
        <FontAwesomeIcon
          icon={faCircleArrowLeft}
          className="reviews_left-arrow hidden md:block"
          onClick={handleLeftClick}
        />
      </div>
      <div className="phone-reviews md:hidden">
        <swiper-container
          effect="cards"
          grabCursor={true}
          direction="horizontal"
          scrollbar="false"
          autoplay-delay="5000"
          speed="900"
        >
          {reviews.map((review) => {
            return (
              <swiper-slide key={review.id}>
                <div className="w-[75px] h-[75px] common-radius">
                  <img
                    src={review.imageUrl}
                    className="common-radius max-w-full max-h-full"
                  />
                </div>
                <p className="body-medium text-center max-w-[100px] paragraph-sizing">
                  {review.username}
                </p>
                <Rating rating={review.rating} />
                <p className="text-center paragraph-sizing max-w-[160px]">
                  {review.content}
                </p>
              </swiper-slide>
            );
          })}
        </swiper-container>
      </div>
    </div>
  );
};

export default Reviews;
