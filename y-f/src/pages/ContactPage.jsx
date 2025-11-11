import React, { useState } from "react";
import Input from "../components/Input.jsx";
import phone from "../../public/assets/phone.png";
import message from "../../public/assets/message.png";
import Footer from "../components/Footer";
const ContactPage = () => {
  const [messageDetails, setMessageDetails] = useState({
    name: "",
    emailAddress: "",
    message: "",
  });
  const fields = [
    {
      label: "Name",
      type: "text",
      name: "name",
      value: messageDetails.name,
    },
    {
      label: "Email Address",
      type: "email",
      name: "emailAddress",
      value: messageDetails.emailAddress,
    },
    {
      label: "Message",
      type: "text",
      name: "message",
      value: messageDetails.message,
    },
  ];
  const onChange = (e) => {
    e.preventDefault;
    setMessageDetails({ ...messageDetails, [e.target.name]: e.target.value });
  };
  return (
    <div className="mt-[80px]">
      <div className="flex flex-col items-center gap-[20px] py-[50px] bg-gray-v4">
        <h1 className="capitalize h1-semibold">contact Us</h1>
        <p className="small-regular w-[60%] text-center">
          Have questions or want to join our trekking expeditions? We're here to
          help! don't hesitate to reach out. Our team is here to assist you
          every step of the way
        </p>
      </div>
      <div className="flex justify-center px-[100px] py-[50px] gap-[60px] items-center">
        <div className="flex-1 flex flex-col items-start rounded-[30px] h-[400px] p-[30px] justify-between">
          <div>
            <h2 className="h2-medium capitalize">get in touch</h2>
            <p>
              Fill out the form or reach out directly via email or phone, and
              we'll get back to you as soon as possible.
            </p>
          </div>
          <div className="flex flex-col gap-[20px]">
            <div className="flex gap-[10px] items-center">
              <img
                src={message}
                alt="message"
                className="bg-yellow-primary rounded-[20px] h-[30px] w-[30px]"
              />
              <p>yellowFamilly@gmail.com</p>
            </div>
            <div className="flex gap-[10px] items-center">
              <img
                src={phone}
                alt="phone"
                className="bg-yellow-primary rounded-[30px] w-[30px] h-[30px]"
              />
              <p>0659650407</p>
            </div>
          </div>
          <div className="flex flex-col gap-[10px] w-full">
            <div className="w-full h-[2px] bg-black-v2"></div>
            <p className="body-semibold capitalize">follow us:</p>
            <div className="flex gap-[10px]">
              <div className="flex items-center justify-center h-[30px] w-[30px] bg-yellow-primary rounded-full"></div>
              <div className="flex items-center justify-center h-[30px] w-[30px] bg-yellow-primary rounded-full"></div>
            </div>
          </div>
        </div>

        <div className="flex-1 flex flex-col items-center bg-gray-v4 rounded-[30px] py-[20px] h-[400px]">
          <h2 className="h2-medium mb-[30px] capitalize">send a message</h2>
          <div className="w-[70%] mb-[30px]">
            {fields.map((input) => {
              return (
                <div className="w-full">
                  <Input
                    label={input.label}
                    type={input.type}
                    name={input.name}
                    onChange={onChange}
                    value={input.value || ""}
                  />
                </div>
              );
            })}
          </div>
          <div className="w-[70%] flex justify-end">
            <button className="rounded-[30px] text-white bg-black-v2 px-[20px] py-[7px] capitalize ml-auto">
              submit
            </button>
          </div>
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default ContactPage;
