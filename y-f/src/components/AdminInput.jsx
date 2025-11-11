/* eslint-disable no-unused-vars */
/* eslint-disable react/prop-types */
import React, { useState } from "react";

const AdminInput = ({ onChange, type, label, ...rest }) => {
  const [focused, setFocused] = useState(false);
  const onBlur = () => {
    setFocused(false);
  };
  const handleFocus = () => {
    setFocused(true);
  };
  return (
    <div className="admin-input_container">
      <label className={` sign-input_label ${(focused || rest.value) && ""} `}>
        {label}
      </label>
      {label === "Description" || "Tags" ? (
        <textarea
          value={rest.value}
          onFocus={handleFocus}
          {...rest}
          className={`admin-textarea outline-none border-none z-10 bg-gray-v1 rounded-[30px] transition text-gray-500 px-[20px] ${
            label === "Description" || label === "Tags"
              ? "h-[80px]"
              : "h-[40px]"
          }`}
          required
          onChange={onChange}
          onBlur={onBlur}
        />
      ) : (
        <input
          value={rest.value}
          onFocus={handleFocus}
          {...rest}
          className={`outline-none z-10 bg-gray-v1 rounded-[30px] transition text-gray-500 px-[20px] ${
            label === "Description" || label === "Tags"
              ? "h-[80px]"
              : "h-[40px]"
          }`}
          required
          onChange={onChange}
          onBlur={onBlur}
        />
      )}
      {/* <input
        value={rest.value}
        onFocus={handleFocus}
        {...rest}
        className={`outline-none z-10 bg-gray-v1 rounded-[30px] transition text-gray-500 px-[20px] ${
          label === "Description" || label === "Tags" ? "h-[80px]" : "h-[40px]"
        }`}
        required
        onChange={onChange}
        onBlur={onBlur}
      /> */}
    </div>
  );
};

export default AdminInput;
