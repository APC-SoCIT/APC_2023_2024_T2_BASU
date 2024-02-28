import { useContext, useEffect } from "react";
import { useState } from "react";
import { createContext } from "react";
import axiosClient from "../axios.js";
import LoadingModal from "../styling/LoadingModal.jsx" // Adjust the path as per your project structure

const StateContext = createContext({
  currentUser: {},
  userToken: null,
  role: null,
  setCurrentUser: () => {},
  setUserToken: () => {},
  getLocation: () => {},
  setRole: () => {},
});

export const ContextProvider = ({ children }) => {
  const [currentUser, setCurrentUser] = useState({});
  const [userToken, _setUserToken] = useState(
    localStorage.getItem("TOKEN") || ""
  );
  const [role, _setRole] = useState(localStorage.getItem("ROLE") || "");
  const [currentLocation, setCurrentLocation] = useState(null);
  const [loading, setLoading] = useState(true); // Add loading state

  const setUserToken = (token) => {
    if (token) {
      localStorage.setItem("TOKEN", token);
    } else {
      localStorage.removeItem("TOKEN");
    }
    _setUserToken(token);
  };

  const setRole = (role) => {
    console.log("Setting role:", role); // Log the role value
    const roleValue = role ? role.role : null; // Extract role value from the object
    if (roleValue !== null) {
      localStorage.setItem("ROLE", roleValue.toString());
    } else {
      localStorage.removeItem("ROLE");
    }
    _setRole(roleValue);
  };

  const updateLocation = async (latitude, longitude) => {
    try {
      await axios.post("/location", { latitude, longitude });
      setCurrentLocation({ latitude, longitude });
    } catch (error) {
      console.error("Failed to update location:", error);
    }
  };

  const getLocation = async () => {
    try {
      const response = await axios.get("/location");
      setCurrentLocation(response.data);
    } catch (error) {
      console.error("Failed to get location:", error);
    }
  };

  useEffect(() => {
    // Fetch user data from backend or local storage
    const fetchUserData = async () => {
      const storedToken = localStorage.getItem("TOKEN");
      if (storedToken) {
        // Fetch user data using stored token
        try {
          const response = await axiosClient.get("/me");
          setCurrentUser(response.data);
        } catch (error) {
          // Handle error (e.g., token expired, network error)
          console.error("Failed to fetch user data:", error);
        }
      }
      setLoading(false); // Set loading to false after fetching user data
    };

    fetchUserData();
  }, []);

  // Initialize state from localStorage
  useEffect(() => {
    const storedToken = localStorage.getItem("TOKEN");
    const storedRole = localStorage.getItem("ROLE");
    if (storedToken) _setUserToken(storedToken);
    if (storedRole) _setRole(storedRole);
  }, []);

  if (loading) {
    // Render the LoadingModal component while loading
    return <LoadingModal />;
  }

  return (
    <StateContext.Provider
      value={{
        currentUser,
        setCurrentUser,
        userToken,
        setUserToken,
        currentLocation,
        updateLocation,
        getLocation,
        role,
        setRole,
      }}
    >
      {children}
    </StateContext.Provider>
  );
};

export const useStateContext = () => useContext(StateContext);
