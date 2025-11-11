import { Link, useLocation } from "react-router-dom";
import logo from "./../assets/Glyph_ undefined.svg";
import "./AdminDashboard.css";
const NavAdmin = () => {
  const arrayRouteAdmin = [
    {
      id: 1,
      name: "Dashboard",
    },
    {
      id: 2,
      name: "Next-Trip",
    },
    {
      id: 3,
      name: "Last-Trip",
    },
    {
      id: 4,
      name: "Bookings",
    },
    {
      id: 5,
      name: "Users",
    },
    {
      id: 6,
      name: "Reviews",
    },
  ];
  const location = useLocation();
  console.log(location.pathname.split("/")[2]);

  return (
    <nav className="h-full fixed bg-[#FFD600] w-[20%] ">
      <div className="h-[80px] flex items-center justify-center w-full mb-[30px]">
        <h1 className="h3-extrabold">Admin</h1>
      </div>
      <ul className="flex flex-col gap-[10px] px-[20px]">
        {arrayRouteAdmin.map((route) => {
          return (
            <Link key={route.id} to={`/Admin/${route.name}`}>
              <li
                className={` flex justify-start items-end flex-wrap h-fit gap-x-[10px] ${
                  location.pathname.split("/")[2] === route.name
                    ? "clicked"
                    : ""
                } `}
              >
                <img src={logo} className="w-[35px] h-[35px]" />
                <h1 className="w-[70%]"> {route.name}</h1>
              </li>
            </Link>
          );
        })}
      </ul>
    </nav>
  );
};

export default NavAdmin;
