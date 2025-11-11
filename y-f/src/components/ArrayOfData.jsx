import { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { getTours } from "../features/tour/tourSlice";

const ArrayOfData = () => {
  const dispatch = useDispatch();
  const [dropdownOpen, setDropdownOpen] = useState(null);
  const [data, setData] = useState([]);

  const toggleDropdown = (index) => {
    if (dropdownOpen === index) {
      setDropdownOpen(null);
    } else {
      setDropdownOpen(index);
    }
  };

  useEffect(() => {
    (async () => {
      const { payload } = await dispatch(getTours());
      console.log(payload.tours);
      setData(payload.tours);
    })();
  }, [dispatch]);

  const formatDate = (date) => {
    return new Date(date).toLocaleDateString();
  };

  const getStatus = (deadline) => {
    return new Date(deadline) > new Date() ? "Active" : "Inactive";
  };

  return (
    <>
      <div className="overflow-auto rounded-lg shadow hidden md:block">
        <table className="w-full">
          <thead className="bg-gray-50 border-b-2 border-gray-200">
            <tr>
              <th className="p-3 text-sm font-semibold tracking-wide text-left">
                Destination
              </th>
              <th className="p-3 text-sm font-semibold tracking-wide text-left">
                Departure Date
              </th>
              <th className="p-3 text-sm font-semibold tracking-wide text-left">
                Description
              </th>
              <th className="p-3 text-sm font-semibold tracking-wide text-left">
                Price
              </th>
              <th className="p-3 text-sm font-semibold tracking-wide text-left">
                Status
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
                  {item.Destination}
                </td>
                <td className="p-3 text-sm text-gray-700 whitespace-nowrap">
                  {formatDate(item.DepartureDate)}
                </td>
                <td className="p-3 text-sm text-gray-700 whitespace-nowrap">
                  {item.Description}
                </td>
                <td className="p-3 text-sm text-gray-700 whitespace-nowrap">
                  {item.Price}
                </td>
                <td
                  className={`p-3 text-sm whitespace-nowrap ${
                    getStatus(item.Deadline) === "Active"
                      ? "text-green-500"
                      : "text-red-500"
                  }`}
                >
                  {getStatus(item.Deadline)}
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
                        <li className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100">
                          Details
                        </li>
                        <li className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100">
                          Edit
                        </li>
                        <li className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100">
                          Delete
                        </li>
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
              <div className="text-blue-500 font-bold">{item.Destination}</div>
              <div className="text-gray-500">
                {formatDate(item.DepartureDate)}
              </div>
              <div>
                <span
                  className={`p-1.5 text-xs font-medium uppercase tracking-wider rounded-lg bg-opacity-50 ${
                    getStatus(item.Deadline) === "Active"
                      ? "text-green-800 bg-green-200"
                      : "text-red-800 bg-red-200"
                  }`}
                >
                  {getStatus(item.Deadline)}
                </span>
              </div>
            </div>
            <div className="text-sm text-gray-700">{item.Description}</div>
            <div className="text-sm font-medium text-black">{item.Price}</div>
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
                    <li className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100">
                      Details
                    </li>
                    <li className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100">
                      Edit
                    </li>
                    <li className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100">
                      Delete
                    </li>
                  </ul>
                </div>
              )}
            </div>
          </div>
        ))}
      </div>
    </>
  );
};

export default ArrayOfData;