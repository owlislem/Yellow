import { Outlet } from "react-router-dom";
import NavAdmin from "./NavAdmin";
import ProfileNavbar from "../components/ProfileNavbar";
function AdminDashboard() {
  return (
    <div className="flex h-full bg-gray-v2">
      <div className="w-[20%] h-full fixed">
        <NavAdmin />
      </div>
      <div className="w-[80%]  h-full ml-auto">
        <ProfileNavbar />
        <div className="mt-[80px] h-full">
          <Outlet />
        </div>
      </div>
    </div>
  );
}

export default AdminDashboard;
