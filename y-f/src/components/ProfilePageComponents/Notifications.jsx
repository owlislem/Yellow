import React from 'react'
import UserDetails from './UserDetails'
import { useDispatch, useSelector } from "react-redux";
import { useRef, useState, useEffect } from "react";
import {
  getStorage,
  ref,
  uploadBytesResumable,
  getDownloadURL,
} from "firebase/storage";
import { app } from "../../firebase.js";
import { updateUser } from "../../features/user/userAuthSlice.jsx";
import OneNotif from './OneNotif.jsx';
import DisplayNotif from './DisplayNotif.jsx';


const Notifications = () => {

        const { user: currentUser } = useSelector(
          (state) => state.userAuthReducer.user
        );
        const dispatch = useDispatch();
        const fileRef = useRef();
        const [values, setValues] = useState({
          email: currentUser.email,
          username: currentUser.username,
          password: "",
          photoProfile: currentUser.profileImage,

        });
        // we should add this to the current user 
        const [otherValues, setOtherValues] = useState({
          firstName:"",
          lastName:"",
          bio:"",
          phoneNumber:null,
          idendityCard:"",

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

        const handleChange = (e)=>{
          setOtherValues({ ...otherValues, [e.target.name]: e.target.value });
        }
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
              console.log(error)
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

        const [notifications, setNotifications] = useState([
            { id: 1, object:"new trip 1", message: 'our new trip is here are you ready to explore algeria with us', seen: false },
            { id: 2, object:"new trip", message: 'our new trip is here are you ready to explore algeria with us', seen: false },
            { id: 3, object:"new trip", message: 'our new trip is here are you ready to explore algeria with us', seen: false },
            { id: 4, object:"new trip", message: 'our new trip is here are you ready to explore algeria with us', seen: false },
            { id: 5, object:"new trip", message: 'our new trip is here are you ready to explore algeria with us', seen: false },
            { id: 6, object:"new trip", message: 'our new trip is here are you ready to explore algeria with us', seen: false },
            { id: 7, object:"new trip 7", message: 'our new trip is here are you ready to explore algeria with us', seen: false },
            { id: 8, object:"new trip 8", message: 'our new trip is here are you ready to explore algeria with us', seen: false },
          ]);

          const markAsSeen = (id) => {
            setNotifications((prevNotifications) =>
              prevNotifications.map((notif) =>
                notif.id === id ? { ...notif, seen: true } : notif
              )
            );
          };

          const [filter, setFilter] = useState('all');
          const [displayState, setDisplayState] = useState({
            isOpen: false,
            notification: null,
          });

          const handleFilterChange = (newFilter) => {
            setFilter(newFilter);
          };

          const filteredNotifications = notifications.filter(notification => 
            filter === 'all' || (filter === 'unread' && !notification.seen)).reverse();

            const openNotif = (notification) => {
              setDisplayState({
                isOpen: true,
                notification,
              });
            };

            const closeNotif = () => {
              setDisplayState({
                  isOpen: false,
                  notification: null,
                });
              };



          return (
            <div className=' flex  md:gap-5 bg-white rounded-b-[30px] mx-[5%] sm:mx-[40px] lg:mx-[60px]  md:pl-10 px-2 md:px-[80px] lg:-px-[0px] pt-[10px] sm:pt-[20px] md:pt-[50px] pb-[50px] '>
              <div className='hidden lg:block'>
              <UserDetails direction="col" values={values} handleImage={handleImage} /> 

              </div>

                <div className=' w-full flex flex-col gap-5'>
                    <h2 className=' text-yellow-primary font-medium text-[24px] md:text-[28px]'>Notifications</h2>
                    <div className='flex  items-center sm:justify-start gap-2 font-medium text-black-v3 '>
                        <button 
                            onClick={() => handleFilterChange('all')}
                            className={`py-[4px] px-[10px] sm:py-[7px] sm:px-[18px] ${filter === 'all'?'bg-yellow-primary':''} border-2 border-yellow-primary  rounded-[30px] w-[100px] btn transition-all duration-400`}>All</button>
                        <button 
                            onClick={() => handleFilterChange('unread')}
                            className={`py-[4px] px-[10px] sm:py-[7px] sm:px-[18px] ${filter === 'unread'?'bg-yellow-primary':''} border-2 border-yellow-primary rounded-[30px] w-[100px] btn transition-all duration-400`}>Unread</button>
                    </div>
                    <div className='flex flex-col  '>
                    {filteredNotifications.map((notification, index) => (
                        <OneNotif
                        key={notification.id}
                        notification={notification}
                        markAsSeen={markAsSeen}
                        openNotif={openNotif}
                        showBorder={index !== notifications.length - 1}
                        />
                    ))}

                     </div>
                     <DisplayNotif
                        isOpen={displayState.isOpen}
                        onClose={closeNotif}
                        notification={displayState.notification}
                    />

                </div>


            </div>
          );
        };

        export default Notifications;