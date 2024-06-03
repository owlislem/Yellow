import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faInstagram } from "@fortawesome/free-brands-svg-icons";
import { Link } from "react-router-dom";
const Hero = () => {
  return (
    <div className="flex items-center  lg:h-[100vh] hero">
      <div className="flex flex-col gap-[20px] md:gap-[30px] lg:gap-[40px] justify-center">
        <h1 className="max-w-[650px] h3-semibold md:h2-semibold lg:h1-semibold uppercase text-center md:text-start">
          Explore Dzair with the{" "}
          <span className="inline-block text-yellow-primary">Yellow</span>{" "}
          family
        </h1>
        <p className="paragraph-sizing max-w-[600px] text-center md:text-start">
          Explore Algeria`s beauty with yellow family. Trek the Atlas Mountains,
          experience the Sahara - your adventure starts here.
        </p>
        <div className="flex gap-[20px] items-center justify-center md:justify-start">
          <button className="main-button nano-regular md:small-regular">
            explore Tours
          </button>

          <Link to="https://www.instagram.com/yellow___family/">
            <FontAwesomeIcon
              icon={faInstagram}
              className="hidden md:inline-block md:w-[30px] md:h-[30px] lg:w-[34px] lg:h-[34px] text-yellow-primary hover:scale-95  transition mt-[4px]"
            />
          </Link>
        </div>
      </div>
    </div>
  );
};

export default Hero;
