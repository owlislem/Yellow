import { faPhone } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

const Contact = () => {
  return (
    <div className="bg-black py-[20px] md:py-[30px] lg:py-[40px] text-white flex flex-col gap-[30px] justify-between section-padding">
      <div className="flex justify-between">
        <h1 className="h2-semibold lg:h1-semibold capitalize">contact us</h1>
        <div className="flex gap-[5px] items-center justify-between">
          <FontAwesomeIcon icon={faPhone} className="text-yellow-primary" />
          <p>(406) 555-0120</p>
        </div>
      </div>
      <div className="flex flex-col md:flex-row justify-between gap-[30px] items-center  md:items-end">
        <p className="paragraph-sizing md:max-w-[50%] text-center md:text-start">
          if you have any questions , or if you want to know more details about
          the trip . please feel free to contact us
        </p>
        <button className="main-button text-black h-fit">contact us</button>
      </div>
    </div>
  );
};

export default Contact;
