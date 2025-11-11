import React from 'react'
import UserDetails from './UserDetails'
import { TiArrowSortedDown } from "react-icons/ti";
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


const EditProfile = () => {

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
     // we should add this to the current user 
    bio:"",
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


  const inputs=[
    {
      id:"username",
      name:"username",
      label:"User Name",
      type:"text",
    },
    {
      id:"email",
      name:"email",
      label:"Email Adress",
      type:"email",
    }

  ]



  return (
    <div className='bg-white rounded-b-[30px] mx-[5%] sm:mx-[40px] lg:mx-[60px]  md:pl-10 px-8 md:px-[80px] lg:px-[5%]     py-[50px]'>  
    <div className='flex flex-col md:flex-row md:justify-start md:items-start hustify-center items-center '>
            <UserDetails direction="row md:col " values={values} handleImage={handleImage} />          
            <div className='flex flex-col lg:px-[45px] gap-8 sm:ml-5 md:ml-5 lg:ml-0  '>
            <h1 className='text-yellow-primary font-medium text-[24px] md:text-[28px] mt-4 '>Profil Edit</h1>
            <div className='flex flex-col lg:flex-row gap-10  '>
              <div className='flex flex-col '>
                <label htmlFor='firstName' className='font-medium text-[16px]'>Name</label>
                <input 
                  type="text" 
                  onChange={onChange}
                  defaultValue={values.firstName}
                  name="firstName"
                  className='editInput h-[30px] w-[150px] md:h-[44px] md:w-[220px]' />
              </div>

              <div className='flex flex-col '>
                <label htmlFor='"lastName' className='font-medium text-[16px]'>Last Name</label>
                <input 
                  onChange={onChange}
                  type="text" 
                  name="lastName" 
                  defaultValue={values.lastName}
                  className='editInput  w-[150px] h-[30px] md:h-[44px] sm:w-[220px] ' 
                  />

              </div>
            </div>

            {inputs.map((input)=>(
              <div className='flex flex-col' key={input.id}>
                  <label htmlFor={input.id} className='font-medium text-[16px] '>{input.label}</label>
                  <input  
                    name={input.name}
                    onChange={onChange}
                    type={input.type}
                    defaultValue={currentUser[input.name]}
                    className='editInput h-[30px] w-[230px] sm:w-full md:h-[44px] md:w-[330px] ' />
                </div>
            ))}
            {/* when you add phone number to values you can add it to the map function */}
            <div className='flex flex-col'>
              <label htmlFor='phoneNumber' className='font-medium text-[16px]'>Phone Number</label>
              <input 
                type="tel" 
                name="phoneNumber" 
                defaultValue={values.phoneNumber}
                onChange={onChange}
                className='editInput h-[30px] w-[230px] sm:w-full md:h-[44px] md:w-[330px]'
                />

            </div>

            <div>
            <label className='font-medium text-[16px]'>identity card </label>
            <p className='text-[12px] md:mr-[100px]'>For added security and to ensure the authenticity of your profilr , please apload a scanned copy or photo of your identity card</p>
            <div className=' relative w-[140px] h-[30px] bg-gray-v5 hover:bg-black-v2 transition-all duration-[500] flex items-center justify-center hover:pointer mt-[10px] rounded-[3px]  '>
                  <p className='text-white'>upload photo</p>
                  <TiArrowSortedDown className='text-white ml-[2px]'/>
                  <input
                   type="file" 
                   name="idendityCard" 
                   onChange={onChange} 
                   className=' opacity-0 w-[140px] absolute' />
              </div>
            </div>

            <h1 className='text-yellow-primary font-medium text-[24px] md:text-[28px]'>About Me</h1>
            <div className='flex flex-col -mr-4 '>
            <label htmlFor="bio" className='font-medium text-[16px] '>Your Bio</label>
             <textarea 
              name="bio" 
              id="bio" 
              value={values.bio}
              onChange={onChange}
              className=' editInput w-full h-[100px] md:w-[350px]  p-4 resize-none'>
            </textarea> 

            </div>
            <div className='flex justify-end '>
            <button 
              onClick={handleUpdate}
              className='py-[7px] px-[18px] bg-yellow-primary rounded-[30px] w-[100px] btn '>Save</button>
            </div>

        </div>
      </div>

    </div>
  )
}

export default EditProfile