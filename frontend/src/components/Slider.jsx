import { PropTypes } from "prop-types";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faChevronLeft,
  faChevronRight,
} from "@fortawesome/free-solid-svg-icons";
const Slider = ({ imageUrls }) => {
  return (
    <div className="relative px-[25px] md:px-[50px]  lg:px-[150px] aspect-[400/200] md:aspect-[400/180] lg:aspect-[400/140] mb-[20px] md:mb-[30px] lg:mb-[40px] common-radius">
      <swiper-container
        space-between="20"
        direction="horizontal"
        mousewheel-force-to-axis="true"
        navigation="true"
        scrollbar="false"
        pagination-clickable="true"
        navigation-next-el=".custom-next-button"
        navigation-prev-el=".custom-prev-button"
        pagination-dynamic-bullets="true"
        autoplay-delay="5000"
        loop="true"
        speed="900"
      >
        {imageUrls.map((imageUrl, index) => (
          <swiper-slide key={index} lazy="true">
            <img src={imageUrl} loading="lazy" className="" />
          </swiper-slide>
        ))}
        {imageUrls.map((imageUrl, index) => (
          <swiper-slide key={index} lazy="true">
            <img
              src={imageUrl}
              loading="lazy"
              className="max-w-full max-h-full"
            />
          </swiper-slide>
        ))}
        {imageUrls.map((imageUrl, index) => (
          <swiper-slide key={index} lazy="true">
            <img
              src={imageUrl}
              loading="lazy"
              className="max-w-full max-h-full"
            />
          </swiper-slide>
        ))}
        <div className="swiper-pagination pagination"></div>
      </swiper-container>
      <button className="slider-button custom-next-button right-[60px] lg:right-[160px]">
        <FontAwesomeIcon icon={faChevronRight} />
      </button>
      <button className="slider-button custom-prev-button left-[60px] lg:left-[160px]">
        <FontAwesomeIcon icon={faChevronLeft} />
      </button>
    </div>
  );
};

Slider.propTypes = {
  imageUrls: PropTypes.array.isRequired,
};
export default Slider;
