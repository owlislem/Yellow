import React, { useState, useEffect } from "react";
import ProfileComponent from "../components/ProfilePageComponents/ProfileComponent";
import EditProfile from "../components/ProfilePageComponents/EditProfile";
import Notifications from "../components/ProfilePageComponents/Notifications";
import Profile from "./Profile";
import { useLocation, useParams } from "react-router-dom";
import Points from "../components/ProfilePageComponents/Points";
import { useSelector } from "react-redux";

const ProfilePageMe = () => {
  const location = useLocation();
  const query = new URLSearchParams(location.search);
  const initialComponent = query.get("component") || "profile";
  const { id } = useParams();

  const [activeComponent, setActiveComponent] = useState(initialComponent);
  const { user: currentUser } = useSelector(
    (state) => state.userAuthReducer.user
  );

  useEffect(() => {
    setActiveComponent(initialComponent);
  }, [initialComponent]);

  const renderComponent = () => {
    switch (activeComponent) {
      case "profile":
        return <ProfileComponent />;
      case "notifications":
        return currentUser._id === id && <Notifications />;
      case "edit":
        return currentUser._id === id && <EditProfile />;
      default:
        return <ProfileComponent />;
    }
  };

  return (
    <div className="min-h-screen bg-gray-v3">
      <div className="pl-[10%] sm:pl-[80px] md:pl-[100px]">
        <h1 className="pt-[80px] mb-[10px] text-[24px] sm:text-[32px] md:text-[40px] tracking-[2px]">
          Account
        </h1>
        <div className="flex gap-5 sm:gap-10 sm:text-[20px] font-medium">
          <button
            className={`hover:text-yellow-primary hover:border-b-2 border-yellow-primary ${
              activeComponent === "profile"
                ? "text-yellow-primary border-b-2"
                : ""
            }`}
            onClick={() => setActiveComponent("profile")}
          >
            Profile
          </button>
          {currentUser._id === id && (
            <>
              <button
                className={`hover:text-yellow-primary hover:border-b-2 border-yellow-primary ${
                  activeComponent === "notifications"
                    ? "text-yellow-primary border-b-2"
                    : ""
                }`}
                onClick={() => setActiveComponent("notifications")}
              >
                Notifications
              </button>
              <button
                className={`hover:text-yellow-primary hover:border-b-2 border-yellow-primary ${
                  activeComponent === "edit"
                    ? "text-yellow-primary border-b-2"
                    : ""
                }`}
                onClick={() => setActiveComponent("edit")}
              >
                Edit
              </button>
            </>
          )}
        </div>
      </div>

      {renderComponent()}
      {/* <Profile/> */}
    </div>
  );
};

export default ProfilePageMe;
