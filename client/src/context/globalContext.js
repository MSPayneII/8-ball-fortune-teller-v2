import React, { useReducer, useContext } from "react";
import reducer from "./reducer";
import axios from "axios";

//
const token = localStorage.getItem("token");
const user = localStorage.getItem("user");

const initialState = {
  isLoading: false,
  showAlert: false,
  alertText: "",
  alertType: "",
  user: user ? JSON.parse(user) : null,
  token: token,
};

const baseURL = "http://localhost:5001/api/auth";

const GlobalContext = React.createContext();

//children represents the entire application that will be rendered
const GlobalProvider = ({ children }) => {
  const [state, dispatch] = useReducer(reducer, initialState);

  const displayAlert = () => {
    dispatch({ type: "SHOW_ALERT" });
    clearAlert();
  };
  const clearAlert = () => {
    setTimeout(() => {
      dispatch({ type: "CLEAR_ALERT" });
    }, 4000);
  };

  const logOutUser = () => {
    dispatch({ type: "LOGOUT_USER" });
    removeUserLocalStorage();
  };

  const addUserLocalStorage = ({ user, token }) => {
    localStorage.setItem("user", JSON.stringify(user));
    localStorage.setItem("token", token);
  };
  const removeUserLocalStorage = () => {
    localStorage.removeItem("user");
    localStorage.removeItem("token");
  };

  const registerUser = async (currentUser) => {
    // dispatch({ type: "REGISTER_USER_START" });
    try {
      const response = await axios.post(`${baseURL}/register`, currentUser);
      // console.log(response);
      const { user, token } = response.data;
      // console.log(user);
      dispatch({ type: "REGISTER_USER_PASS", payload: { user, token } });

      //local storage
      addUserLocalStorage({ user, token });
      // console.log(typeof JSON.stringify(user), JSON.stringify(user));
    } catch (error) {
      // console.log(error.response);
      dispatch({
        type: "REGISTER_USER_FAIL",
        payload: { msg: error.response.data.msg },
      });
    }
    clearAlert(); //removes the alert message from the login/register page after 4 seconds (see line 26)
  };

  const loginUser = async (currentUser) => {
    try {
      const response = await axios.post(`${baseURL}/login`, currentUser);
      // console.log(response);
      const { user, token } = response.data;
      // console.log(user);
      dispatch({ type: "LOGIN_USER_PASS", payload: { user, token } });

      //local storage
      addUserLocalStorage({ user, token });
      // console.log(typeof JSON.stringify(user), JSON.stringify(user));
    } catch (error) {
      // console.log(error.response);
      dispatch({
        type: "LOGIN_USER_FAIL",
        payload: { msg: error.response.data.msg },
      });
    }
    clearAlert(); //removes the alert message from the login/register page after 4 seconds (see line 26)
  };

  return (
    <GlobalContext.Provider
      value={{
        ...state,
        displayAlert,
        registerUser,
        loginUser,
        logOutUser,
      }}
    >
      {children}
    </GlobalContext.Provider>
  );
};

// custom Hook used so I can only import one thing (useGlobalContext) rather than importing two separate imports every time I want to use my GlobalContext: one for useContext and the other for GlobalContext

const useGlobalContext = () => {
  return useContext(GlobalContext);
};

export { GlobalProvider, initialState, useGlobalContext };
