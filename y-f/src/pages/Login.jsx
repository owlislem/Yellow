import { useEffect, useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faTimes } from "@fortawesome/free-solid-svg-icons";
import Input from "../components/Input.jsx";
import { useDispatch, useSelector } from "react-redux";
import { loginUser } from "../features/user/userAuthSlice.jsx";
import { Link } from "react-router-dom";

import { useNavigate } from "react-router-dom";

const Login = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const { loading, user } = useSelector((state) => state.userAuthReducer);
  const a = useSelector((state) => state.userAuthReducer);
  
  const [values, setValues] = useState({
    email: "",
    password: "",
  });
  console.log(user, "anaaaaaaaaaa");
  const [loginFail, setLoginFail] = useState(false);

  const onChange = (e) => {
    setValues({ ...values, [e.target.name]: e.target.value });
  };
  const onSumbit = async (e) => {
    e.preventDefault();
    dispatch(
      loginUser({ email: values.email, password: values.password })
    ).then((result) => {
      setValues({ email: "", password: "" });
      console.log(result + "i ammmmmmmmmm");
      if (result.meta.requestStatus === "fulfilled") {
        navigate("/profile");
      } else {
        setLoginFail(true);
      }
    });
  };

  const inputs = [
    {
      id: 1,
      label: "Email",
      name: "email",
      placeholder: "",
      type: "email",
      errorMessage: "Please enter a valid email address.",
      pattern: "^[w-]+(.[w-]+)*@([w-]+.)+[a-zA-Z]{2,7}$",
      value: values.email,
    },
    {
      id: 2,
      label: "Password",
      name: "password",
      placeholder: "",
      pattern: ".{8,}",
      type: "password",
      errorMessage: "Password must meet minimum requirements.",
      value: values.password,
    },
  ];

  return (
    <>
      <div className="sign-container  h-screen">
        <div
          className="h-screen bg-slate-50 opacity-15 w-[100vw] absolute"
          onClick={() => navigate("/")}
        ></div>

        <div className="sign-card ">
          <div className="sign-card_img-container">
            <img
              src="/assets/signPhoto.svg"
              alt="signPhoto"
              className="max-w-full"
            />
          </div>
          <div className="sign-form_container ">
            <form className="sign-form">
              <h1 className="h3-semibold mb-[10px]">Log In</h1>
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
                    value={input.value}
                  />
                ))}
              </div>
              <div className="flex-center flex-col gap-[15px]">
                <button
                  className={`sign-button ${loading && "opacity-[80]"}`}
                  onClick={onSumbit}
                >
                  {loading ? "Log in ..." : "Log in"}
                </button>
                <div className="flex text-nano-normal">
                  <p className="nano-regular">have don`t have an account ?</p>
                  <Link to="/signup" className="nano-regular  ml-[4px]  ">
                    <button>
                      <span className="text-blue-v1 block underline">
                        sign up
                      </span>
                    </button>
                  </Link>
                </div>
              </div>
              {loginFail && (
                <h1 className="sign-error">login failed, please try again!</h1>
              )}
              <FontAwesomeIcon
                icon={faTimes}
                className="sign-close"
                onClick={() => {
                  navigate("/");
                }}
              />
            </form>
          </div>
        </div>
      </div>
    </>
  );
};

export default Login;
