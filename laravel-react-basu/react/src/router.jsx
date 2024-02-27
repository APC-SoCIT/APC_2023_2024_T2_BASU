import { Navigate, createBrowserRouter } from "react-router-dom";

import Dashboard from "./views/Dashboard";
import Reservation from "./views/Reservation";
import Login from "./views/Login";
import Signup from "./views/Signup";
import GuestLayout from "./components/GuestLayout";
import DefaultLayout from "./components/DefaultLayout";
import LocationTrack from "./views/LocationTrack";
import ReservationView from "./views/ReservationView";
import ReservationPublicView from "./views/ReservationPublicView";
import Role from "./views/Role";
import AccountRegister from "./views/AccountRegister";
import AccountList from "./views/AccountList";
import PageNotFound from "./views/PageNotFound";
import { useStateContext } from "./contexts/ContextProvider";
import Admin from "./views/Admin";
import ReservationForm from "./views/ReservationForm";



{/*ROUTE GUARDS*/}
// Route guard for admin-only routes
export const AdminRouteGuard = ({ children }) => {
  const { currentUser } = useStateContext();

  if (currentUser.role !== '1') {
    // Redirect to a different route if not admin
    return <Navigate to="/unauthorized" />;
  }

  return children;
};

// Route guard for student-only routes
export const StudentRouteGuard = ({ children }) => {
  const { currentUser } = useStateContext();

  if (currentUser.role !== '2') {
    // Redirect to a different route if not a student
    return <Navigate to="/unauthorized" />;
  }

  return children;
};

// Route guard for driver-only routes
export const DriverRouteGuard = ({ children }) => {
  const { currentUser } = useStateContext();

  if (currentUser.role !== '3') {
    // Redirect to a different route if not a driver
    return <Navigate to="/unauthorized" />;
  }

  return children;
};

const router = createBrowserRouter([
  {
    path: "/",
    element: <DefaultLayout />,
    children: [
      {
        path: "/dashboard",
        element:  <Navigate to="/"/>,
      },
      {
        path: "/",
        element: <Dashboard />,
      },
      {
        path: "/admin",
        element: <Admin />,
      },
      {
        path: "/locationtrack",
        element: <LocationTrack /> ,
      },
      {
        path: "/account/register",
        element: <AccountRegister />,
      },
      {
        path: "/account/role",
        element: <Role />,
      },
      {
        path: "/account",
        element:  <AccountList /> ,
      },
      {
        path: "/reservation",
        element:  <Reservation /> ,
      },
      {
        path: "/reservation/create",
        element:  <ReservationForm />,
      },
      {
        path: "/locationtrack",
        element:  <LocationTrack />,
      },
    ],
  },



  {
    path: "/",
    element: <GuestLayout />,
    children: [
      {
        path: "/login",
        element: <Login />,
      },
      {
        path: "/signup",
        element: <Signup />,
      },
    ],
  },
  {
    path: "/reservation/public/:slug",
    element: <ReservationPublicView />,
  },
  {
    path: "/*",
    element: <PageNotFound />
  },
]);

export default router;
