import { PropTypes } from "prop-types";

const ExperienceSlider = ({ imageUrls }) => {
  return (
    <div className="w-full aspect-[400/400] md:aspect-[400/180] lg:aspect-[400/160] mb-[20px] md:mb-[30px] lg:mb-[40px] bg-black rounded-br-[60px] rounded-bl-[60px] overflow-hidden">
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
          <swiper-slide key={index} lazy={true}>
            <img
              src={imageUrl}
              loading="lazy"
              className="max-w-full max-h-full"
            ></img>
          </swiper-slide>
        ))}
      </swiper-container>
    </div>
  );
};
ExperienceSlider.propTypes = {
  imageUrls: PropTypes.array.isRequired,
};

export default ExperienceSlider;
