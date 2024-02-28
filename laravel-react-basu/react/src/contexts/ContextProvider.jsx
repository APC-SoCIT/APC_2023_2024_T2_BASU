import { useContext, useEffect, useState } from "react";
import { createContext } from "react";
import axiosClient from "../axios";
import LoadingModal from "../styling/LoadingModal";

const StateContext = createContext({
  currentUser: {},
  userToken: null,
  role: null,
  currentLocation: null,
  updateLocation: () => {},
  getLocation: () => {},
  setRole: () => {},
});

export const ContextProvider = ({ children }) => {
  const [currentUser, setCurrentUser] = useState({});
  const [userToken, setUserToken] = useState(localStorage.getItem("TOKEN") || "");
  const [role, setRole] = useState(localStorage.getItem("ROLE") || "");
  const [currentLocation, setCurrentLocation] = useState(null);
  const [loading, setLoading] = useState(true);

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
    const fetchUserData = async () => {
      try {
        const storedToken = localStorage.getItem("TOKEN");
        if (storedToken) {
          const response = await axiosClient.get("/me");
          setCurrentUser(response.data);
        }
      } catch (error) {
        console.error("Failed to fetch user data:", error);
      }
      setLoading(false);
    };

    fetchUserData();
  }, []);

  useEffect(() => {
    const storedToken = localStorage.getItem("TOKEN");
    const storedRole = localStorage.getItem("ROLE");
    if (storedToken) setUserToken(storedToken);
    if (storedRole) setRole(storedRole);
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
