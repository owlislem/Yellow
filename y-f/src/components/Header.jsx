import { useState, useEffect } from "react";
import { Link, useLocation } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { logoutUser } from "../features/user/userAuthSlice";

import MenuIcon from "@mui/icons-material/Menu";
import CloseIcon from "@mui/icons-material/Close";

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

  const location = useLocation();
  return (
    <div
      className={`header ${
        isScrolled ? "shadow-header-shadow bg-white" : "bg-transparent"
      } ${
        location.pathname === "/" ||
        location.pathname.startsWith("/experiences")
          ? ""
          : "shadow-header-shadow bg-white"
      }`}
    >
      {/* Logo */}
      <Link to={"/"}>
        <img
          src="/assets/logo.svg"
          alt="Yellow-Family-logo"
          className="w-[130px] lg:w-[160px]"
        />
      </Link>

      {/* Desktop Menu */}
      <div className="hidden lg:text-[18px] text-[16px] gap-[20px] md:flex lg:gap-[40px] header-menu">
        <Link to={"/"} className="menu-link">
          Home
        </Link>
        <Link to={"/#aboutUS"} className="menu-link">
          About us
        </Link>
        <Link to={"/#destinations"} className="menu-link">
          Destinations
        </Link>
        <Link to={"/#contact"} className="menu-link">
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
              <button className=" border-[2px]  lg:px-[25px] px-[18px] py-[5px] border-yellow-primary rounded-[30px] hover:shadow-lg transform hover:scale-95 transition-all">
                Login
              </button>
            </Link>
            <Link to={"/signup"}>
              <button className=" py-[7px] lg:px-[25px] px-[18px] bg-yellow-primary rounded-[30px] hover:shadow-md transform hover:scale-95 transition-all">
                SignUp
              </button>
            </Link>
          </>
        ) : (
          <div className="flex gap-[25px]">
            <Link to={"/"}>
              <button
                className="border-[2px] py-[5px] px-[25px] border-black rounded-lg"
                onClick={handleLogout}
              >
                Logout
              </button>
            </Link>
            <Link to={"/profile"} className="flex gap-[15px]">
              <h1 className="text-2xl">{currentUser?.user.username}</h1>
              <img
                className="w-[45px] h-[45px] rounded-full bg-slate-700 object-cover"
                src={currentUser?.user.profileImage}
                alt="Profile"
              />
            </Link>
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
            <Link to={"#"} className="menu-link ">
              Home
            </Link>
            <Link to={"#"} className="menu-link">
              About us
            </Link>
            <Link to={"#"} className="menu-link  ">
              Destinations
            </Link>
            <Link to={"#"} className="menu-link">
              Contact
            </Link>
          </div>
          <div className="flex flex-col gap-[20px] mt-[20px]">
            <hr />
            {!currentUser?.user ? (
              <>
                <Link to={"/login"}>
                  <button className="menu-link w-full text-left">Login</button>
                </Link>
                <Link to={"/signup"}>
                  <button className="menu-link w-full text-left">SignUp</button>
                </Link>
              </>
            ) : (
              <div className="flex gap-[25px]">
                <Link to={"/Login"}>
                  <button className="menu-link" onClick={handleLogout}>
                    Logout
                  </button>
                </Link>
                <Link to={"/profile"} className="flex gap-[15px]">
                  <h1 className="text-2xl">{currentUser?.user.username}</h1>
                  <img
                    className="w-[45px] h-[45px] rounded-full bg-slate-700 object-cover"
                    src={currentUser?.user.profileImage}
                    alt="Profile"
                  />
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
