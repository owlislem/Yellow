import { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import DialogDeleteConfrm from "./DialogDeleteConfrm";
import Alert from "@mui/material/Alert";
import Stack from "@mui/material/Stack";
import { useNavigate } from "react-router-dom";
import {
  cancelBooking,
  confirmBooking,
  getBookings,
} from "../features/booking/bookingSlice";

const ArrayOfBookings = ({ render, setRender }) => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [deleteConfirm, setDeleteConfirm] = useState(false);

  const [dropdownOpen, setDropdownOpen] = useState(null);
  const [data, setData] = useState([]);
  const [limitUser, setLimitUser] = useState(5);

  const toggleDropdown = (index) => {
    if (dropdownOpen === index) {
      setDropdownOpen(null);
    } else {
      setDropdownOpen(index);
    }
  };

  useEffect(() => {
    (async () => {
      console.log("aaaaaaa");
      const { payload } = await dispatch(getBookings(limitUser));
      console.log(payload + "hoooooooooo"); // Assuming bookings is the field containing the data
      setData(payload.booking);
    })();
  }, [limitUser, render]);

  const formatDate = (date) => {
    return new Date(date).toLocaleDateString();
  };

  const [open, setOpen] = useState(false);
  const [id, setId] = useState("");
  console.log(open, id);

  return (
    <>
      <DialogDeleteConfrm
        open={open}
        setOpen={setOpen}
        id={id}
        setDeleteConfirm={setDeleteConfirm}
        render={render}
        setRender={setRender}
      />
      <div className="overflow-auto rounded-lg shadow hidden md:block">
        {deleteConfirm && (
          <Stack sx={{ width: "100%" }} spacing={2}>
            <Alert variant="filled" severity="success">
              The booking has been deleted.
            </Alert>
          </Stack>
        )}
        <table className="w-full">
          <thead className="bg-gray-50 border-b-2 border-gray-200">
            <tr>
              <th className="p-3 text-sm font-semibold tracking-wide text-left">
                ID
              </th>
              <th className="p-3 text-sm font-semibold tracking-wide text-left">
                User
              </th>
              <th className="p-3 text-sm font-semibold tracking-wide text-left">
                Trip
              </th>
              <th className="p-3 text-sm font-semibold tracking-wide text-left">
                N°Ticket
              </th>
              <th className="p-3 text-sm font-semibold tracking-wide text-left">
                Status
              </th>
              <th className="p-3 text-sm font-semibold tracking-wide text-left">
                Date of Booking
              </th>
              <th className="p-3 text-sm font-semibold tracking-wide text-left">
                Actions
              </th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-100">
            {data.map((item, index) => (
              <tr
                key={index}
                className={index % 2 === 0 ? "bg-white" : "bg-gray-50"}
              >
                <td className="p-3 text-sm text-gray-700 whitespace-nowrap">
                  #{item._id}
                </td>
                <td className="p-3 text-sm text-gray-700 whitespace-nowrap">
                  {item.user.username}
                </td>
                <td className="p-3 text-sm text-gray-700 whitespace-nowrap">
                  {item.tour.Destination}
                </td>
                <td className="p-3 text-sm text-gray-700 whitespace-nowrap">
                  {item.NTicket}
                </td>
                <td
                  className={`p-3 text-sm whitespace-nowrap ${
                    item.status === "Confirmed"
                      ? "text-green-500"
                      : item.status === "Canceled"
                      ? "text-red-500"
                      : "text-gray-700"
                  }`}
                >
                  {item.status}
                </td>
                <td className="p-3 text-sm text-gray-700 whitespace-nowrap">
                  {formatDate(item.dateOfBooking)}
                </td>
                <td className="p-3 text-sm text-gray-700 whitespace-nowrap relative">
                  <button
                    onClick={() => toggleDropdown(index)}
                    className="text-gray-500 hover:text-gray-700 focus:outline-none"
                  >
                    &#8942;
                  </button>
                  {dropdownOpen === index && (
                    <div className="absolute right-0 mt-2 w-48 bg-white rounded-md shadow-lg z-10">
                      <ul className="py-1">
                        {item.status === "Pending" && (
                          <>
                            <li
                              className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 cursor-pointer"
                              onClick={async () => {
                                await dispatch(confirmBooking(item._id));
                                setRender((prev) => !prev);
                              }}
                            >
                              Confirm
                            </li>

                            <li
                              className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 cursor-pointer"
                              onClick={async () => {
                                await dispatch(cancelBooking(item._id));
                                setRender((prev) => !prev);
                              }}
                            >
                              Cancel
                            </li>
                          </>
                        )}
                      </ul>
                    </div>
                  )}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 md:hidden">
        {data.map((item, index) => (
          <div key={index} className="bg-white space-y-3 p-4 rounded-lg shadow">
            <div className="flex items-center space-x-2 text-sm">
              <div className="text-blue-500 font-bold">#{item._id}</div>
              <div className="text-gray-500">{item.user.name}</div>
              <div>{formatDate(item.dateOfBooking)}</div>
              <div>
                <span
                  className={`p-1.5 text-xs font-medium uppercase tracking-wider rounded-lg bg-opacity-50 ${
                    item.status === "Confirmed"
                      ? "text-green-800 bg-green-200"
                      : item.status === "Canceled"
                      ? "text-red-800 bg-red-200"
                      : "text-gray-800 bg-gray-200"
                  }`}
                >
                  {item.status}
                </span>
              </div>
            </div>
            <div className="text-sm font-medium text-black">
              {item.tour.Destination}
            </div>
            <div className="text-sm">
              <button
                onClick={() => toggleDropdown(index)}
                className="text-gray-500 hover:text-gray-700 focus:outline-none"
              >
                &#8942;
              </button>
              {dropdownOpen === index && (
                <div className="mt-2 w-48 bg-white rounded-md shadow-lg z-10">
                  <ul className="py-1">
                    <li
                      className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 cursor-pointer"
                      onClick={() => navigate(`/profile/${item.user._id}`)}
                    >
                      View Profile
                    </li>
                    <li
                      className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 cursor-pointer"
                      onClick={() => {
                        setId(item._id);
                        setOpen(true);
                      }}
                    >
                      Delete
                    </li>
                  </ul>
                </div>
              )}
            </div>
          </div>
        ))}
      </div>
      <div className="flex justify-end items-end gap-[15px]">
        <button
          className="px-[25px] py-[12px] bg-[#FFD600] rounded-full my-[20px]"
          onClick={() => setLimitUser((prev) => prev + 5)}
        >
          See All
        </button>
        {limitUser > 5 && (
          <button
            className="px-[25px] py-[12px] bg-[#FFD600] rounded-full my-[20px]"
            onClick={() => setLimitUser(() => data.length - 5)}
          >
            Less
          </button>
        )}
      </div>
    </>
  );
};

export default ArrayOfBookings;
