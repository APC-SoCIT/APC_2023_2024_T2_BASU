import { useContext, useEffect } from "react";
import { useState } from "react";
import { createContext } from "react";
import axiosClient from "../axios.js";
import LoadingModal from "../styling/LoadingModal.jsx"; // Adjust the path as per your project structure

const StateContext = createContext({
  currentUser: {},
  userToken: null,
  role: null,
  setCurrentUser: () => {},
  setUserToken: () => {},
  setRole: () => {},
});

export const ContextProvider = ({ children }) => {
  const [currentUser, setCurrentUser] = useState({});
  const [userToken, _setUserToken] = useState(
    localStorage.getItem("TOKEN") || ""
  );
  const [role, setRole] = useState("");
  const [loading, setLoading] = useState(true); // Add loading state

  const setUserToken = (token) => {
    if (token) {
      localStorage.setItem("TOKEN", token);
    } else {
      localStorage.removeItem("TOKEN");
    }
    _setUserToken(token);
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
          setRole(response.data.role); // Set the role extracted from user data
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
    if (storedToken) _setUserToken(storedToken);
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
        role,
        setRole,
      }}
    >
      {children}
    </StateContext.Provider>
  );
};

export const useStateContext = () => useContext(StateContext);
