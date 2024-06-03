import { Route, Routes, useLocation } from "react-router-dom";
import "./App.css";
import Header from "./components/Header";
import PrivateRoute from "./components/PrivateRoute";
import Home from "./pages/Home";
import Login from "./pages/Login";
import ComponentWrapperHOC from "./components/ComponentWrapperHOC";
import SignUp from "./pages/SignUp";
import Profile from "./pages/Profile";
import NotFoundPage from "./pages/NotFoundPage";
import TopTrip from "./components/TopTrip";
import LastTrip from "./pages/LastTrip";
import AdminDashboard from "./pages/AdminDashboard";
import AdminRoute from "./components/AdminRoute";
import Dashboard from "./components/Dashboard";

function App() {
  const location = useLocation();

  let LoginHOC = ComponentWrapperHOC(Home, Login); //High Order Function
  let SignHOC = ComponentWrapperHOC(Home, SignUp);

  return (
    <>
      {(location.pathname.startsWith("/destinations") ||
        location.pathname.startsWith("/experiences") ||
        location.pathname.startsWith("/")) && <Header /> &&
        !location.pathname.startsWith("/admin") &&
        !location.pathname.startsWith("/Admin") && <Header />}
      <Routes>
        {/* public routes */}
        <Route index element={<Home />} />

        <Route path="/lastTrip" element={<LastTrip />} />

        <Route path="/experiences/:id" element={<TopTrip />} />

        <Route path="/signup" element={<SignHOC />} />
        <Route path="/login" element={<LoginHOC />} />

        {/* private routes */}
        <Route element={<PrivateRoute />}>
          <Route path="/Profile" element={<Profile />} />
        </Route>
        <Route element={<AdminRoute />}>
          <Route path="/Admin" element={<AdminDashboard />}>
            <Route path="Dashboard" element={<Dashboard />} />
            <Route path="Trips" element={<Dashboard />} />
            <Route path="Next-trip" element={<Dashboard />} />
            <Route path="Last-trip" element={<Dashboard />} />
            <Route path="Bookings" element={<Dashboard />} />
            <Route path="Users" element={<Dashboard />} />
            <Route path="Reviews" element={<Dashboard />} />
            <Route path="Content" element={<Dashboard />} />
            <Route path="Finance" element={<Dashboard />} />
            <Route path="Setting" element={<Dashboard />} />
          </Route>
        </Route>

        {/* error route */}
        <Route path="*" element={<NotFoundPage />} />
      </Routes>
    </>
  );
}

export default App;
