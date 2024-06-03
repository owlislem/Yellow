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
      name: "Trips",
      nestedRoute: [
        { id: 9, name: "Next Trip", path: "Next-trip" },
        { id: 10, name: "Last Trip", path: "Last-trip" },
      ],
    },
    {
      id: 3,
      name: "Bookings",
    },
    {
      id: 4,
      name: "Users",
    },
    {
      id: 5,
      name: "Reviews",
    },
    {
      id: 6,
      name: "Content",
    },
    {
      id: 7,
      name: "Finance",
    },
    {
      id: 8,
      name: "Setting",
    },
  ];
  const location = useLocation();
  console.log(location.pathname.split("/")[2]);

  return (
    <navbar className="h-full fixed bg-[#FFD600] w-[20%] ">
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

                {route.nestedRoute && (
                  <ul className=" w-[70%] flex flex-col items-end">
                    {route.nestedRoute.map((nsRoute) => {
                      return (
                        <Link key={nsRoute.id} to={nsRoute.path}>
                          <li className="">
                            <h1 className="">{nsRoute.name}</h1>
                          </li>
                        </Link>
                      );
                    })}
                  </ul>
                )}
              </li>
            </Link>
          );
        })}
      </ul>
    </navbar>
  );
};

export default NavAdmin;
