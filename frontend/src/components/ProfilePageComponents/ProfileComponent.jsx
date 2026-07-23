import React from "react";
import UserDetails from "./UserDetails";
import { useDispatch, useSelector } from "react-redux";
import { useRef, useState, useEffect } from "react";
import {
  getStorage,
  ref,
  uploadBytesResumable,
  getDownloadURL,
} from "firebase/storage";
import { app } from "../../firebase.js";
import { getUser, updateUser } from "../../features/user/userAuthSlice.jsx";
import Points from "./Points.jsx";
import { useParams } from "react-router-dom";

const ProfileComponent = () => {
  const { id } = useParams();
  const dispatch = useDispatch();
  const [currentUser, setCurrentUser] = useState({});
  const { user: currentUserFromStore } = useSelector(
    (state) => state.userAuthReducer.user
  );

  useEffect(() => {
    const fetchUserData = async () => {
      try {
        if (id) {
          const { payload } = await dispatch(getUser(id));
          setCurrentUser(payload.user);
        } else {
          setCurrentUser(currentUserFromStore);
        }
      } catch (error) {
        console.error("Error fetching user data:", error);
      }
    };

    fetchUserData();
  }, [id, dispatch, currentUserFromStore]);
  const fileRef = useRef();
  const [values, setValues] = useState({
    email: currentUser?.email,
    username: currentUser?.username,
    password: "",
    photoProfile: currentUser?.profileImage,
  });
  console.log(currentUser);
  // we should add this to the current user
  const [otherValues, setOtherValues] = useState({
    firstName: "",
    lastName: "",
    bio: "",
    phoneNumber: null,
    idendityCard: "",
  });
  const [file, setFile] = useState(null);

  const [imagePercent, setImagePercent] = useState(0);
  const [imageError, setImageError] = useState(false);

  const handleImage = (e) => {
    setFile(e.target.files[0]);
  };
  const onChange = (e) => {
    setValues({ ...values, [e.target.name]: e.target.value });
  };

  const handleChange = (e) => {
    setOtherValues({ ...otherValues, [e.target.name]: e.target.value });
  };
  const uploadToDataBase = () => {
    const storage = getStorage(app);
    const fileName = new Date().getTime() + file.name;
    const storageRef = ref(storage, fileName);
    const uploadTask = uploadBytesResumable(storageRef, file);
    uploadTask.on(
      "state_changed",
      (snapshot) => {
        const progress =
          (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
        console.log(progress);
        setImagePercent(Math.round(progress));
      },
      (error) => {
        console.log(error);
        setImageError(true);
      },
      () => {
        getDownloadURL(uploadTask.snapshot.ref).then((downloadURL) =>
          setValues({ ...values, profileImage: downloadURL })
        );
      }
    );
  };
  const handleUpdate = () => {
    dispatch(updateUser(values));
  };
  useEffect(() => {
    if (file) uploadToDataBase();
  }, [file]);

  //trips he booked
  const bookedTrips = [
    {
      image: "/images/tripBox-img1.jpg",
      destination: "lac vert de yakoren tizi-ouzou",
      date: "the 27feb",
      price: "1600DA",
      Duration: " one day",
    },
    {
      image: "/images/tripBox-img2.jpg",
      destination: "lac vert de yakoren tizi-ouzou",
      date: "the 27Feb",
      price: "1600DA",
      Duration: " one day",
    },
    {
      image: "/images/tripBox-img3.jpg",
      destination: "lac vert de yakoren tizi-ouzou",
      date: "the 27Feb",
      price: "1600DA",
      Duration: " one day",
    },
    {
      image: "/images/tripBox-img3.jpg",
      destination: "lac vert de yakoren tizi-ouzou",
      date: "the 27Feb",
      price: "1600DA",
      Duration: " one day",
    },
    {
      image: "/images/tripBox-img3.jpg",
      destination: "lac vert de yakoren tizi-ouzou",
      date: "the 27Feb",
      price: "1600DA",
      Duration: " one day",
    },
  ];

  console.log({ currentUser });

  return (
    <div className="bg-white  mx-[5%] sm:mx-[40px] md:mx-[60px] px-[10%] sm:px-[5%]  md:px-[50px] rounded-b-[30px] py-[50px]  ">
      <UserDetails
        direction="row"
        values={currentUser}
        handleImage={handleImage}
      />

      <Points point={currentUser?.points} />

      <h2 className="text-yellow-primary font-medium text-[24px] md:text-[28px] my-[30px]">
        My Next Destination{" "}
      </h2>

      <div className="w-full flex justify-center items-center lg:justify-start gap-5 flex-wrap ">
        {bookedTrips.map((trip, key) => (
          <div key={key} className="flex-item   ">
            <div className=" rounded-[30px] shadow-my-shadow overflow-hidden  mb-[60px] max-w-[250px] ">
              <div className="top h-[180px]">
                <img
                  src={trip.image}
                  alt="Destination image"
                  className="w-full h-full object-cover"
                />
              </div>
              <div className="bottom p-[25px]">
                <div className="flex justify-between mb-[15px]">
                  <p className="text-customDark capitalize text-[18px] font-semibold">
                    {trip.date}
                  </p>
                  <p className="text-red-600 capitalize text-[18px] font-semibold">
                    {trip.price}
                  </p>
                </div>
                <h4 className="font-semibold text-[18px]  md:text-[20px] capitalize min-h-[80px] ">
                  {trip.destination}
                </h4>
                <div className="flex justify-between items-center sm:mt-[15px] ">
                  <p className="text-customDark capitalize">{trip.Duration}</p>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default ProfileComponent;
