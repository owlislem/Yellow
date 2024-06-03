import { useDispatch, useSelector } from "react-redux";
import { useRef, useState, useEffect } from "react";
import {
  getStorage,
  ref,
  uploadBytesResumable,
  getDownloadURL,
} from "firebase/storage";
import { app } from "../firebase.js";
import { updateUser } from "../features/user/userAuthSlice.jsx";
import Input from "../components/Input.jsx";

function Profile() {
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
  console.log(values);
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
  const inputs = [
    {
      id: 1,
      label: "Email",
      name: "email",
      placeholder: "Email",
      type: "email",
      errorMessage: "Please enter a valid email address.",
      pattern: "[a-z0-9._%+-]+@[a-z0-9.-]+\\.[a-z]{2,4}$",
      value: values.email,
    },
    {
      id: 2,
      label: "Username",
      name: "username",
      placeholder: "Username",
      type: "text",
      errorMessage: "Name must be 3 to 15 characters long.",
      pattern: ".{3,15}",
      value: values.username,
    },
  ];
  return (
    <div className="h-[80vh] flex justify-center items-center flex-col gap-[25px] relative">
      <h1 className="text-2xl font-semibold">Profile</h1>
      <div className="flex justify-center items-center flex-col">
        <img
          className="w-[85px] h-[85px] object-cover rounded-full"
          src={file ? values?.profileImage : currentUser?.profileImage}
          onClick={() => fileRef.current.click()}
        />
        <div className="mt-[5px] block">
          {imagePercent ? (
            imagePercent < 100 ? (
              <p className="font-mono text-xl">{`Uploading... ${imagePercent}% complete.`}</p>
            ) : (
              <p className="font-mono text-xl text-green-800">
                {"Upload complete!"}
              </p>
            )
          ) : imageError ? (
            <p className="text-red-300">
              {"Error: Upload failed. Please try again."}
            </p>
          ) : (
            <></>
          )}
        </div>
      </div>
      <input
        type="file"
        className="hidden"
        ref={fileRef}
        accept="image/*"
        onChange={handleImage}
      />

      <form className="w-[100vw] max-w-[480px] flex flex-col gap-[35px]">
        {inputs.map((input) => (
          <Input
            key={input.id}
            label={input.label}
            placeholder={input.placeholder}
            type={input.type}
            name={input.name}
            errorMessage={input.errorMessage}
            pattern={input.pattern}
            defaultValue={currentUser[input.name]}
            onChange={onChange}
          />
        ))}
      </form>
      <div className="flex justify-between items-center w-[100vw] max-w-[480px] py-[25px]">
        <button
          className="bg-violet-800 px-[25px] py-[15px] text-white text-xl rounded-lg"
          onClick={handleUpdate}
        >
          Update
        </button>
        <button className="bg-red-600 px-[25px] py-[15px] text-white text-xl rounded-lg ">
          Delete Account
        </button>
      </div>
    </div>
  );
}

export default Profile;
