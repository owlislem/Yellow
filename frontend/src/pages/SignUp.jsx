import { useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faTimes } from "@fortawesome/free-solid-svg-icons";
import Input from "../components/Input.jsx";
import { useDispatch, useSelector } from "react-redux";
import { signupUser } from "../features/user/userAuthSlice.jsx";
import { useNavigate, Link } from "react-router-dom";

const Signup = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const { loading } = useSelector((state) => state.userAuthReducer);

  const [values, setValues] = useState({
    username: null,
    email: null,
    password: "",
    confirmPassword: "",
  });
  const [signupFail, setSignupFail] = useState(false);

  const onChange = (e) => {
    setValues({ ...values, [e.target.name]: e.target.value });
  };
  const onSumbit = async (e) => {
    e.preventDefault();
    dispatch(signupUser(values)).then((result) => {
      setValues({
        username: null,
        email: null,
        password: "",
        confirmPassword: "",
      });
      if (result.meta.requestStatus === "fulfilled") {
        navigate("/profile");
      } else {
        setSignupFail(true);
      }
    });
  };

  const inputs = [
    {
      id: 1,
      label: "Username",
      name: "username",
      placeholder: "",
      type: "text",
      errorMessage: "Name must be 3 to 15 characters long.",
      pattern: ".{3,15}",
      value: values.username,
    },
    {
      id: 2,
      label: "Email",
      name: "email",
      placeholder: "",
      type: "email",
      errorMessage: "Please enter a valid email address.",
      pattern: "^[w-]+(.[w-]+)*@([w-]+.)+[a-zA-Z]{2,7}$",
      value: values.email,
    },
    {
      id: 3,
      label: "Password",
      name: "password",
      placeholder: "",
      pattern: ".{8,}",
      type: "password",
      errorMessage: "Password must meet minimum requirements.",
      value: values.password,
    },
    {
      id: 4,
      label: "Confirm Password",
      name: "confirmPassword",
      placeholder: "",
      pattern: values.password,
      type: "password",
      errorMessage: "Password Dont match",
      value: values.confirmPassword,
    },
  ];

  return (
    <div className=" sign-container">
      <div
        className="h-screen bg-slate-50 opacity-15 w-[100vw] absolute"
        onClick={() => navigate("/")}
      ></div>
      <div className="sign-card">
        <div className="sign-card_img-container">
          <img
            src="/assets/signPhoto.svg"
            alt="signPhoto"
            className="max-w-full"
          />
        </div>
        <div className="sign-form_container">
          <form className="sign-form">
            <h1 className="h3-semibold mb-[10px]">Create Account</h1>
            <div className="flex flex-col mb-auto">
              {inputs.map((input) => (
                <Input
                  key={input.id}
                  label={input.label}
                  placeholder={input.placeholder}
                  type={input.type}
                  name={input.name}
                  errorMessage={input.errorMessage}
                  pattern={input.pattern}
                  onChange={onChange}
                  value={input.value || ""}
                />
              ))}
            </div>
            <div className="flex-center flex-col gap-[15px]">
              <button
                className={`sign-button ${loading && "opacity-[80]"}`}
                onClick={onSumbit}
              >
                {loading ? "Sign Up ..." : "Sign Up"}
              </button>
              <div className="flex text-nano-normal">
                <p className="nano-regular">have you already an account ?</p>
                <Link to="/login" className="nano-regular  ml-[4px]  ">
                  <button>
                    <span className="text-blue-v1 block underline">login</span>
                  </button>
                </Link>
              </div>
            </div>

            {signupFail && (
              <h1 className="sign-error">sign up failed, please try again!</h1>
            )}

            <FontAwesomeIcon
              icon={faTimes}
              className="sign-close"
              onClick={() => navigate("/")}
            />
          </form>
        </div>
      </div>
    </div>
  );
};

export default Signup;
