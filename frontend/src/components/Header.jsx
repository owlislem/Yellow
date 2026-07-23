import { useState, useEffect } from "react";
import { Link, useLocation } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { logoutUser } from "../features/user/userAuthSlice";

import MenuIcon from "@mui/icons-material/Menu";
import CloseIcon from "@mui/icons-material/Close";
import LogoutIcon from "@mui/icons-material/Logout";
import KeyboardArrowUpIcon from "@mui/icons-material/KeyboardArrowUp";
import KeyboardArrowDownOutlinedIcon from "@mui/icons-material/KeyboardArrowDownOutlined";
import AccountCircleOutlinedIcon from "@mui/icons-material/AccountCircleOutlined";
import FullButton from "./FullButton";

// Function to handle smooth scrolling
const scrollToSection = (sectionId) => {
  const section = document.getElementById(sectionId);
  if (section) {
    section.scrollIntoView({ behavior: "smooth" });
  }
};

const Header = () => {
  // State variables
  const currentUser = useSelector((state) => state.userAuthReducer.user);
  const dispatch = useDispatch();
  const [isScrolled, setIsScrolled] = useState(false);
  const [isSideMenuOpen, setIsSideMenuOpen] = useState(false);

  // Logout function
  const handleLogout = () => {
    dispatch(logoutUser());
  };
  // login function

  // Scroll event listener
  useEffect(() => {
    const handleScroll = () => {
      const scrollTop = window.scrollY;
      setIsScrolled(scrollTop > 0);
    };

    window.addEventListener("scroll", handleScroll);

    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  // Toggle side menu function
  const toggleSideMenu = () => {
    setIsSideMenuOpen(!isSideMenuOpen);
  };

  // Close side menu when clicking outside
  useEffect(() => {
    const handleOutsideClick = (event) => {
      if (
        isSideMenuOpen &&
        !event.target.closest(".side-menu") &&
        !event.target.closest(".header-menu")
      ) {
        setIsSideMenuOpen(false);
      }
    };

    document.addEventListener("mousedown", handleOutsideClick);

    return () => {
      document.removeEventListener("mousedown", handleOutsideClick);
    };
  }, [isSideMenuOpen]);

  /////////////////////////////////////////////////////////////////
  const location = useLocation(); // Use location to get the current URL

  useEffect(() => {
    if (location.hash) {
      const sectionId = location.hash.replace("#", "");
      scrollToSection(sectionId);
    }
  }, [location]);
  ///////////////////////////////////////////////////////////////////
  const [isOpen, setIsOpen] = useState(false);
  const HandleDropMenu = () => {
    setIsOpen(!isOpen);
  };

  //user levels
  const getTravelLevel = (points) => {
    if (points >= 80) {
      return "Master Traveler";
    } else if (points >= 60) {
      return "Expert Traveler";
    } else if (points >= 40) {
      return "Seasoned Traveler";
    } else if (points >= 20) {
      return "Frequent Traveler";
    } else {
      return "New Traveler";
    }
  };
  return (
    <div
      className={`flex z-50 justify-between absolute w-full px-[15px] md:px-[30px] py-[20px] lg:px-[70px] items-center bg-transparent  ${
        isScrolled
          ? "sticky top-0 shadow-md bg-white bg-opacity-50 backdrop-filter backdrop-blur-lg"
          : ""
      }`}
    >
      {/* Logo */}
      <Link to={"/"}>
        <img
          src="/images/yellowFamily-logo-removebg-preview.png"
          alt="Yellow-Family-logo"
          className="w-[130px] lg:w-[160px]"
        />
      </Link>

      {/* Desktop Menu */}
      <div className="hidden lg:text-[18px] text-[16px] gap-[20px] md:flex lg:gap-[40px] header-menu">
        <Link to={"/#Hero"} className="menu-link hover:text-customYellow">
          Home
        </Link>
        <Link to={"/#About"} className="menu-link hover:text-customYellow">
          About us
        </Link>
        <Link to={"/#Next"} className="menu-link hover:text-customYellow">
          Destinations
        </Link>
        <Link to={"/contactUs"} className="menu-link hover:text-customYellow">
          Contact
        </Link>
      </div>

      {/* Mobile Menu Icon */}
      <div className="md:hidden flex items-center">
        <button
          className="text-customDark md:hidden hover:text-customYellow"
          onClick={toggleSideMenu}
        >
          {isSideMenuOpen ? null : <MenuIcon />}
        </button>
      </div>

      {/* Auth Buttons */}
      <div className="hidden text-[16px] lg:text-[18px] md:flex gap-[10px]">
        {!currentUser?.user ? (
          <>
            <Link to={"/login"}>
              <button className="h-[45px] border-[2px]  lg:px-[25px] px-[18px] py-[5px] border-yellow-primary rounded-[30px] hover:shadow-lg transform hover:scale-95 transition-all">
                Login
              </button>
            </Link>
            <Link to={"/SignUp"}>
              <FullButton text="SignUp" />
            </Link>
          </>
        ) : (
          <div className="flex gap-[25px]">
            <button
              onClick={HandleDropMenu}
              className={`border-2 font-lg  rounded-[50px] px-3 py-1 border-customYellow  ${
                isOpen
                  ? " bg-customYellow text-black"
                  : " bg-transparent text-customYellow"
              }`}
            >
              <AccountCircleOutlinedIcon
                sx={{ fontSize: 30 }}
              ></AccountCircleOutlinedIcon>
              {isOpen ? (
                <KeyboardArrowUpIcon
                  sx={{ fontSize: 30, marginLeft: "10px" }}
                />
              ) : (
                <KeyboardArrowDownOutlinedIcon
                  sx={{ fontSize: 30, marginLeft: "10px" }}
                />
              )}
            </button>

            {isOpen && (
              <div className="bg-white py-6 px-6 absolute right-[75px]  mt-14 shadow-my-shadow  rounded-tl-[20px] rounded-bl-[20px] rounded-br-[20px]">
                <div className="flex items-center my-[10px]">
                  <img
                    className="w-[45px] h-[45px] rounded-full bg-slate-700 object-cover"
                    src={currentUser?.user.profileImage}
                    alt="Profile"
                  />
                  <div className="ml-[5px]">
                    <h1 className="text-[16px] font-medium">
                      {currentUser?.user.username}
                    </h1>
                    <h3 className="text-grey-500 text-[13px]">
                      {getTravelLevel(currentUser.points)}
                    </h3>
                  </div>
                </div>
                <hr />
                <div className="flex flex-col text-[15px] font-medium text-gray-700 my-[10px]">
                  <Link
                    to={`/profile/${currentUser?.user._id}`}
                    className="hover:text-customYellow"
                  >
                    View Profile
                  </Link>
                  <Link
                    to="/profile?component=notifications"
                    className="hover:text-customYellow"
                  >
                    Notifications
                  </Link>
                </div>
                <hr />
                <Link to={"/Login"}>
                  <button
                    className="menu-link text-[16px] text-black font-medium my-[10px] hover:text-customYellow"
                    onClick={handleLogout}
                  >
                    Logout
                    <LogoutIcon sx={{ fontSize: 20, marginLeft: 1 }} />
                  </button>
                </Link>
              </div>
            )}
          </div>
        )}
      </div>

      {/* Side Menu */}
      {isSideMenuOpen && (
        <div className="side-menu md:hidden bg-white top-0 right-0 h-dvh md:h-[70%] py-[50px] px-[40px] w-[275px]  absolute shadow-md text">
          <button
            className="text-customDark absolute top-[20px] right-[20px] md:hidden hover:text-customYellow"
            onClick={toggleSideMenu}
          >
            {isSideMenuOpen ? <CloseIcon /> : null}
          </button>
          <div className=" flex flex-col gap-[20px]   ">
            <Link to={"/#Hero"} className="menu-link ">
              Home
            </Link>
            <Link to={"/#About"} className="menu-link">
              About us
            </Link>
            <Link to={"/#Next"} className="menu-link  ">
              Destinations
            </Link>
            <Link to={"/#"} className="menu-link">
              Contact
            </Link>
          </div>
          <div className="flex flex-col gap-[20px] mt-[20px] ">
            <hr />
            {!currentUser?.user ? (
              <>
                <Link to={`/login`}>
                  <button className="menu-link w-full text-left">Login</button>
                </Link>
                <Link to={"/signup"}>
                  <button className="menu-link w-full text-left">SignUp</button>
                </Link>
              </>
            ) : (
              <div className="flex flex-col gap-[10px]">
                <Link
                  to={`/profile/${currentUser?.user.name}`}
                  className="hover:text-customYellow"
                >
                  View Profile
                </Link>
                <Link to={"/Login"}>
                  <button
                    className="menu-link  text-[16px] text-black font-medium my-[10px] hover:text-customYellow"
                    onClick={handleLogout}
                  >
                    Logout
                    <LogoutIcon sx={{ fontSize: 20, marginLeft: 1 }} />
                  </button>
                </Link>
              </div>
            )}
          </div>
        </div>
      )}
    </div>
  );
};

export default Header;
