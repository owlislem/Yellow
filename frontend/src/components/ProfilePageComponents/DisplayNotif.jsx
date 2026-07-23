import { IoClose } from "react-icons/io5";
import empty from "./../../assets/blank-profile-picture-973460_1280.png";

const DisplayNotif = ({ isOpen, onClose, notification }) => {
  if (!isOpen) return null;
  const handleOverlayClick = (e) => {
    if (e.target === e.currentTarget) {
      onClose();
    }
  };
  return (
    <div
      onClick={handleOverlayClick}
      className="z-10 fixed top-0 left-0 right-0 bottom-0 flex justify-center items-center bg-black bg-opacity-60"
    >
      <div className="border-l-[10px] border-l-yellow-primary  bg-white pl-4 pr-3 pb-5  sm:pb-8 pt-3 rounded-[10px] max-w-[1000px] m-4 sm:m-[5%] md:m-[10%] w-full">
        <div className="flex justify-end">
          <button
            className="text-black-v3 hover:text-gray-800 "
            onClick={onClose}
          >
            <IoClose />
          </button>
        </div>
        <div className="flex items-start gap-4">
          <div className=" flex-shrink-0">
            <img
              src={empty}
              alt=""
              className=" w-[50px] h-[50px] sm:w-[55px] sm:h-[55px] rounded-full object-cover"
            />
          </div>
          <div className="flex flex-col">
            <h2 className="text-[18px] sm:text-xl font-semibold mb-2 uppercase  ">
              {notification.object}
            </h2>
            <p className="text-[14px] sm:text-[18px]">{notification.message}</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default DisplayNotif;
