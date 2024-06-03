import { useSelector } from "react-redux";
import { Navigate, Outlet } from "react-router-dom";
function AdminRoute() {
  const currentRoleUser = useSelector((state) => {
    return state.userAuthReducer.user.user.role;
  });
  return currentRoleUser === "Admin" ? <Outlet /> : <Navigate to={"/"} />;
}

export default AdminRoute;
