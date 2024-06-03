import { useSelector } from "react-redux";
import { Navigate, Outlet } from "react-router-dom";

const PrivateRoute = () => {
  const currentUser = useSelector((state) => state.userAuthReducer.user);

  return currentUser ? <Outlet /> : <Navigate to={"/SignUp"} />;
};

export default PrivateRoute;
