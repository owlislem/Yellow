import PropTypes from "prop-types";
const TopTripGallery = ({ gallery }) => {
  return (
    <div className="section-padding pr-0 flex gap-[20px]">
      <div className="flex flex-col gap-[20px]">
        <p className="font-Poppins h3-medium capitalize">
          explore the beauty of our expedition
        </p>
        <h1 className="h1-semibold text-yellow-primary uppercase">gallery</h1>
        <p className="font-roboto body-regular text-gray-P">
          Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
          eiusmod tempor incididunt ut labore
        </p>
      </div>
      <div className="flex">
        {gallery.map((imageUrl, index) => (
          <img src={imageUrl} alt="galleryImage" key={index} />
        ))}
      </div>
    </div>
  );
};
TopTripGallery.propTypes = {
  gallery: PropTypes.array.isRequired,
};
export default TopTripGallery;
