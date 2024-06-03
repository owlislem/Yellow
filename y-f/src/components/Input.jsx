import propTypes from "prop-types";
import { useState } from "react";
import "./Input.css";
const Input = ({ label, errorMessage, onChange, ...rest }) => {
  const [focused, setFocused] = useState(false);
  const onBlur = () => {
    setFocused(false);
  };
  const handleFocus = () => {
    setFocused(true);
  };

  return (
    <div className="sign-input_container">
      <label
        className={` sign-input_label ${
          (focused || rest.value) && "sign-input__focused_label"
        } `}
      >
        {label}
      </label>
      <input
        value={rest.value}
        onFocus={handleFocus}
        {...rest}
        className={` border-b outline-none z-10 bg-transparent transition text-gray-500 ${
          focused ? "border-black" : "border-gray-400"
        }`}
        required
        onChange={onChange}
        onBlur={onBlur}
      />
      {rest.value && !new RegExp(rest.pattern).test(rest.value) && (
        <span className="text-red-600">{errorMessage}</span> // Display error message if pattern doesn't match
      )}
    </div>
  );
};
Input.propTypes = {
  type: propTypes.string,
  label: propTypes.string,
  name: propTypes.string,
  placeholder: propTypes.string,
  errorMessage: propTypes.string,
  onChange: propTypes.func,
};
export default Input;
