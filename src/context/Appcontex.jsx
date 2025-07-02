import { createContext, useState, useEffect } from "react";
import axios from "axios";
import { toast } from "react-toastify";

export const AppContext = createContext();

export const AppContextProvider = (props) => {
  const backendUrl = import.meta.env.VITE_BACKEND_URL;

  const [isLoggedin, setIsLoggedin] = useState(false);
  const [userData, setUserData] = useState(null);

  const getUserData = async () => {
    try {
      axios.defaults.withCredentials = true;
      const { data } = await axios.get(`${backendUrl}/api/user/data`);
      if (data.success) {
        setUserData(data.userData);
      } else {
        toast.error(data.message);
      }
    } catch (error) {
      toast.error(error.response?.data?.message || "User fetch failed");
    }
  };

  useEffect(() => {
    getUserData();
  }, []);

  const value = {
    backendUrl,
    isLoggedin,
    setIsLoggedin,
    userData,
    setUserData,
    getUserData,
  };

  return (
    <AppContext.Provider value={value}>
      {props.children}
    </AppContext.Provider>
  );
};
