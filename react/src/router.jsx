import { createBrowserRouter } from "react-router-dom";
import App from "./App";
import Signup from "./views/Signup";
import Login from "./views/Login";
import LocationTracking from "./views/LocationTracking";
import Dashboard from "./views/Dashboard";

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
        path: '/login',
        element: <Login />
    },
    {
        path: '/signup',
        element: <Signup/>
    }
])

export default router;