import { MdOutlineKeyboardArrowDown } from "react-icons/md";
import vector from "./../assets/Vector.svg";
import { useSelector } from "react-redux";

const ProfileNavbar = () => {
  const { user: currentUser } = useSelector(
    (state) => state.userAuthReducer.user
  );
  return (
    <div className="profile-nav h-[80px] fixed flex justify-end items-center bg-white w-[80%] ml-auto z-20">
      <div className="profile-infos flex justify-end items-center gap-[20px] px-[40px]">
        <img src={vector} className="w-[21px] h-[21px]" />
        <img
          className="w-[55px] h-[55px] object-cover rounded-full"
          src={currentUser?.profileImage}
        />
        <p>{currentUser.username}</p>
        <MdOutlineKeyboardArrowDown />
      </div>
    </div>
  );
};

export default ProfileNavbar;
