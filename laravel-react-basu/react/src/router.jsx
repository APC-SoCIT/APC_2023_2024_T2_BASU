import { Navigate, createBrowserRouter } from "react-router-dom";

import Dashboard from "./views/Dashboard";
import Reservation from "./views/Reservation";
import Login from "./views/Login";
import Signup from "./views/Signup";
import GuestLayout from "./components/GuestLayout";
import DefaultLayout from "./components/DefaultLayout";
import LocationTrack from "./views/LocationTrack";
// import ReservationView from "./views/ReservationView";
import ReservationPublicView from "./views/ReservationPublicView";
import Role from "./views/Role";
import AccountList from "./views/AccountList";
import PageNotFound from "./views/PageNotFound";
import { useStateContext } from "./contexts/ContextProvider";
import Admin from "./views/Admin";
import ReservationForm from "./views/ReservationForm";
import LandingPage from "./views/LandingPage";
import UserList from "./admin/UserList";
import UserRegister from "./admin/UserRegister";
import StartService from "./driver/StartService";
import InquireReservation from "./student/InquireReservation";

{
  /*ROUTE GUARDS*/
}
// Route guard for admin-only routes
export const AdminRouteGuard = ({ children }) => {
  const { currentUser } = useStateContext();

  if (currentUser.role !== "1") {
    // Redirect to a different route if not admin
    return <Navigate to="/unauthorized" />;
  }

  return children;
};

// Route guard for student-only routes
export const StudentRouteGuard = ({ children }) => {
  const { currentUser } = useStateContext();

  if (currentUser.role !== "2") {
    // Redirect to a different route if not a student
    return <Navigate to="/unauthorized" />;
  }

  return children;
};

// Route guard for driver-only routes
export const DriverRouteGuard = ({ children }) => {
  const { currentUser } = useStateContext();

  if (currentUser.role !== "3") {
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
        element: (
          <AdminRouteGuard>
            <Dashboard />
          </AdminRouteGuard>
        ),
      },
      {
        path: "/",
        element: <LandingPage />,
      },
      {
        path: "/admin",
        element: <Admin />,
      },
      {
        path: "/account/role",
        element: (
          <AdminRouteGuard>
            <Role />
          </AdminRouteGuard>
        ),
      },
      {
        path: "/account",
        element: (
          <AdminRouteGuard>
            <AccountList />
          </AdminRouteGuard>
        ),
      },
      {
        path: "/reservation",
        element: (
          <AdminRouteGuard>
            <Reservation />
          </AdminRouteGuard>
        ),
      },
      {
        path: "/reservation/create",
        element: (
          <AdminRouteGuard>
            <ReservationForm />
          </AdminRouteGuard>
        ),
      },
      {
        path: "/locationtrack",
        element: <LocationTrack />,
      },
      {
        path: "/account/register",
        element: (
          <AdminRouteGuard>
            <UserRegister />
          </AdminRouteGuard>
        ),
      },
      {
        path: "/users",
        element: (
          <AdminRouteGuard>
            <UserList />
          </AdminRouteGuard>
        ),
      },
      {
        path: "/startservice",
        element: <DriverRouteGuard><StartService /></DriverRouteGuard>,
      },
      {
        path: "/inquire/reservation",
        element: (
          <StudentRouteGuard>
            <InquireReservation />
          </StudentRouteGuard>
        ),
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
    element: <PageNotFound />,
  },
]);

export default router;
