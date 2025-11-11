import PropTypes from "prop-types";
const TopTripGallery = ({ imageUrls }) => {
  return (
    <div className="section-padding pr-0 flex flex-col gap-[20px]">
      <div className="flex flex-col gap-[10px] items-center mb-[30px]">
        <p className="font-Poppins h3-medium capitalize">
          explore the beauty of our expedition
        </p>
        <h1 className="h1-semibold text-yellow-primary uppercase">gallery</h1>
        <p className="font-roboto body-regular text-gray-P text-center">
          Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
          eiusmod tempor incididunt ut labore
        </p>
      </div>
      <div className="w-full aspect-[400/400] md:aspect-[400/180] lg:aspect-[400/160] mb-[20px] md:mb-[30px] lg:mb-[40px] bg-black   overflow-hidden">
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
    </div>
  );
};

export default TopTripGallery;
