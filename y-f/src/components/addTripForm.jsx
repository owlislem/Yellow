import { useState } from "react";
import AdminInput from "./AdminInput";
import { useDispatch } from "react-redux";
import { addTour } from "../features/tour/tourSlice";

const AddTripForm = () => {
  const dispatch = useDispatch();
  const [tripDetails, setTripDetails] = useState({
    Destination: "",
    DepartureDate: "",
    ReturnDate: "",
    Description: "",
    Tags: [],
    DeparturePlace: "",
    ReturnPlace: "",
    DTime: "",
    RTime: "",
    DressCode: "",
    Includes: "",
    Program: [[""]],
    Image: [""],
    NTickets: null,
    Price: null,
    DeadLine: null,
  });
  const onChange = (e) => {
    setTripDetails({ ...tripDetails, [e.target.name]: e.target.value });
  };
  const onSubmit = async (e) => {
    e.preventDefault();
    dispatch(addTour(tripDetails)).then((result) => {
      setTripDetails({
        Destination: "",
        DepartureDate: "",
        ReturnDate: "",
        Description: "",
        Tags: [],
        DeparturePlace: "",
        ReturnPlace: "",
        DTime: "",
        RTime: "",
        DressCode: "",
        Includes: "",
        Program: [""],
        Image: [""],
        NTickets: null,
        Price: null,
        DeadLine: null,
      });
    });
  };
  const addStep = () => {
    setTripDetails({
      ...tripDetails,
      Program: [...tripDetails.Program, [""]],
    });
  };

  const handleAddDetail = (stepIndex) => {
    const updatedProgram = tripDetails.Program.map((step, index) => {
      if (index === stepIndex) {
        return [...step, ""];
      }
      return step;
    });
    setTripDetails({
      ...tripDetails,
      Program: updatedProgram,
    });
  };
  const handleChange = (e, stepIndex, detailIndex) => {
    const { name, value } = e.target;
    const updatedProgram = tripDetails.Program.map((step, index) => {
      if (index === stepIndex) {
        return step.map((detail, idx) => {
          if (idx === detailIndex) {
            return value;
          }
          return detail;
        });
      }
      return step;
    });
    setTripDetails({
      ...tripDetails,
      Program: updatedProgram,
    });
  };
  return (
    <div className="section-padding flex flex-col gap-y-[50px]">
      <div className="flex justify-between border-b-2 border-[#d9d9d9] px-[20px]">
        <h2 className="capitalize h3-semibold">add new trip</h2>
        <button>add</button>
      </div>
      <div>
        <div className="flex gap-[20px] justify-center md:justify-between flex-wrap">
          <div className="flex-1">
            <AdminInput
              label="Destination"
              type="text"
              name="Destination"
              onChange={onChange}
              value={tripDetails.Destination || ""}
            />
          </div>
          <div className="flex-1">
            <AdminInput
              label="Departure Date"
              type="string"
              name="DepartureDate"
              onChange={onChange}
              value={tripDetails.DepartureDate || ""}
            />
          </div>
          <div className="flex-1">
            <AdminInput
              label="Return Date"
              type="string"
              name="ReturnDate"
              onChange={onChange}
              value={tripDetails.ReturnDate || ""}
            />
          </div>
        </div>
        <div className="flex justify-between gap-[10px] flex-wrap">
          <div className="md:w-[55%] w-full">
            <AdminInput
              label="Description"
              type="textArea"
              name="Description"
              onChange={onChange}
              value={tripDetails.Description || ""}
            />
          </div>
          <div className="md:w-[35%] w-full">
            <AdminInput
              label="Tags"
              type="string"
              name="Tags"
              onChange={onChange}
              value={tripDetails.Tags || ""}
            />
          </div>
        </div>
      </div>
      <div>
        <h2 className="capitalize h3-semibold">more details</h2>
        <div className="flex flex-wrap gap-[30px]">
          <div className="flex flex-wrap md:flex-nowrap gap-[15px] flex-1">
            <div className="flex-1">
              <AdminInput
                label="Departure Place"
                type="string"
                name="DeparturePlace"
                onChange={onChange}
                value={tripDetails.DeparturePlace || ""}
              />
            </div>
            <div className="flex-1">
              <AdminInput
                label="Return Place"
                type="string"
                name="ReturnPlace"
                onChange={onChange}
                value={tripDetails.ReturnPlace || ""}
              />
            </div>
          </div>
          <div className="flex flex-wrap md:flex-nowrap gap-[15px] flex-1">
            <div className="flex-1">
              <AdminInput
                label="Departure Time"
                type="string"
                name="DTime"
                onChange={onChange}
                value={tripDetails.DTime || ""}
              />
            </div>
            <div className="flex-1">
              <AdminInput
                label="Return Time"
                type="string"
                name="RTime"
                onChange={onChange}
                value={tripDetails.RTime || ""}
              />
            </div>
          </div>
        </div>
        <div className="flex  gap-[15px] flex-wrap">
          <div className="flex-1">
            <AdminInput
              label="Dress Code"
              type="string"
              name="DressCode"
              onChange={onChange}
              value={tripDetails.DressCode || ""}
            />
          </div>
          <div className="flex-1">
            <AdminInput
              label="What Includes"
              type="string"
              name="Includes"
              onChange={onChange}
              value={tripDetails.Includes || ""}
            />
          </div>
        </div>
      </div>
      <div>
        <h2 className="capitalize h3-semibold">Program</h2>
        <div className="mb-[20px]">
          {tripDetails.Program.map((step, stepIndex) => (
            <div key={stepIndex}>
              <h3>Step {stepIndex + 1}</h3>
              {step.map((detail, detailIndex) => (
                <div key={detailIndex}>
                  <AdminInput
                    key={detailIndex}
                    label={`Detail ${detailIndex + 1}`}
                    type="string"
                    name={`Program[${stepIndex}][${detailIndex}]`}
                    onChange={(e) => handleChange(e, stepIndex, detailIndex)} // Assuming handleChange is the function to update tripDetails
                    value={detail}
                  />
                </div>
              ))}
              <button onClick={() => handleAddDetail(stepIndex)}>
                Add Detail
              </button>
            </div>
          ))}
        </div>
        <div className="flex gap-[8px] items-center">
          <button
            className="h-[30px] w-[30px] rounded-[10px] bg-gray-v3 "
            onClick={addStep}
          >
            +
          </button>
          <p className="inline capitalize text-[#535252]">add task</p>
        </div>
      </div>
      <div className="flex justify-between items-center">
        <div>
          <h2>Images / videos</h2>
          <p>Add some images and videos related to the trip destination</p>
        </div>
        <button>add +</button>
      </div>
      <div>
        <h2>Booking requirements</h2>
        <div className="flex gap-[20px] flex-wrap">
          <div className="flex flex-1 gap-[20px] flex-wrap">
            <div className="flex flex-1 gap-[10px] flex-wrap md:flex-nowrap">
              <div className="flex-1">
                <AdminInput
                  label="number of tickets"
                  type="string"
                  name="NTickets"
                  onChange={onChange}
                  value={tripDetails.NTickets || ""}
                />
              </div>
              <div className="flex-1">
                <AdminInput
                  label="Price"
                  type="string"
                  name="Price"
                  onChange={onChange}
                  value={tripDetails.Price || ""}
                />
              </div>
            </div>
          </div>
          <div className="flex-1">
            <div className="lg:w-2/3">
              <AdminInput
                label="dead line"
                type="string"
                name="DeadLine"
                onChange={onChange}
                value={tripDetails.DeadLine || ""}
              />
            </div>
          </div>
        </div>
      </div>
      <button onClick={onSubmit} className="main-button w-fit ml-auto">
        finish
      </button>
    </div>
  );
};

export default AddTripForm;
