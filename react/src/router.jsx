import { Navigate, createBrowserRouter } from "react-router-dom";
import Signup from "./views/Signup";
import Login from "./views/Login";
import LocationTracking from "./views/LocationTracking";
import Dashboard from "./views/Dashboard";
import GuestLayout from "./components/GuestLayout";
import DefaultLayout from "./components/DefaultLayout";
import Reservation from "./views/Reservation";

const router = createBrowserRouter([


    {
        path: '/',
        element: <DefaultLayout />,
        children: [
            {
                path: '/',
                element: <Dashboard />
            },
            {
                path: '/dashboard',
                element: <Navigate to="/" />
            },
            {
                path: '/locationtracking',
                element: <LocationTracking />
            },
            {
                path: '/reservation',
                element: <Reservation/>
            }
        ]
    },

    {
        path: '/',
        element: <GuestLayout />,
        children: [
            {
                path: '/login',
                element: <Login />
            },
            {
                path: '/signup',
                element: <Signup />
            },
        ]
    }

])

export default router;
