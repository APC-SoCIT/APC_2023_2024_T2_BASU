import { createBrowserRouter } from "react-router-dom";
import Signup from "./views/Signup";
import Login from "./views/Login";
import LocationTracking from "./views/LocationTracking";
import Dashboard from "./views/Dashboard";
import GuestLayout from "./components/GuestLayout";

const router = createBrowserRouter([
    {
        path: '/',
        element: <Dashboard />
    },
    {
        path: '/locationtracking',
        element: <LocationTracking />
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
    },

])

export default router;