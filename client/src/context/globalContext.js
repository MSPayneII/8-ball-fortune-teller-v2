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
  isQuestionAsked: false,
  fortune: "",
  isMobileNavOpen: false,
  isDeleteModalOpen: false,
  qAndAPairings: [],
};

const baseURL = "http://localhost:5001/api/auth";
const fortuneURL = "http://localhost:5001/api/answer";

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

  const toggleMobileNav = () => {
    dispatch({ type: "TOGGLE_MOBILE_NAV" });
  };
  const toggleDeleteModal = () => {
    dispatch({ type: "TOGGLE_DELETE_MODAL" });
  };

  const logOutUser = () => {
    dispatch({ type: "LOGOUT_USER" });
    removeUserLocalStorage();
  };

  const resetIsQuestionAsked = () => {
    dispatch({ type: "ANSWER_RECEIVED" });
  };

  const deleteUserForGood = () => {
    // dispatch({ type: "DELETE_USER_PASS" });
    // removeUserLocalStorage();
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

  const updateUser = async (currentUser) => {
    try {
      const response = await axios.patch(`${baseURL}/updateUser`, currentUser, {
        headers: {
          Authorization: `Bearer ${state.token}`,
        },
      });
      const { user, token } = response.data;
      // console.log(user);
      dispatch({ type: "UPDATE_USER_PASS", payload: { user, token } });
      addUserLocalStorage({ user, token });
    } catch (error) {
      console.log(error);

      //place for UPDATE_USER_FAIL dispatch function
    }
    clearAlert(); //removes the alert message from the login/register page after 4 seconds (see line 26)
  };

  const deleteUser = async (currentUser) => {
    // console.log(currentUser);
    // try {
    //   const response = await axios.delete(
    //     `${baseURL}/deleteUser`,
    //     currentUser,
    //     {
    //       headers: {
    //         Authorization: `Bearer ${state.token}`,
    //       },
    //     }
    //   );
    //   const { user, token } = response.data;
    //   console.log(user, token);
    // } catch (error) {
    //   console.log(error);
    //   //place for UPDATE_USER_FAIL dispatch function
    // }
  };

  const getFortune = async (userQuestion, currentUser) => {
    dispatch({ type: "ASK_QUESTION_START" });
    try {
      const response = await axios.get(`${fortuneURL}/randomFortune`);
      let fortune = response.data;

      // console.log(fortune);
      dispatch({ type: "FORTUNE_RETRIEVAL", payload: fortune });

      setTimeout(() => {
        const bodyObj = {
          question: userQuestion,
          answer: fortune,
          currentUser,
        };

        createQAPair(bodyObj);
      }, 10000);
    } catch (error) {
      console.log(error.response);
    }
  };

  const createQAPair = async (bodyObj) => {
    try {
      const response = await axios.post(`${fortuneURL}/createQAPair`, bodyObj, {
        headers: {
          Authorization: `Bearer ${state.token}`,
        },
      });
      // console.log("coming from createQAPair:", response.data);
      let pairs = await response.data;
      console.log(pairs);
      dispatch({ type: "Q&A_PAIRS_SUCCESS", payload: pairs });
    } catch (error) {
      console.log(error.response);
    }
  };

  // TBD
  const getQAPairs = async (currentUser) => {
    try {
      const response = await axios.get(
        `${fortuneURL}/getQAPairs`,
        currentUser,
        {
          headers: {
            Authorization: `Bearer ${state.token}`,
          },
        }
      );
      // let pairs = response.data;
      console.log(response);
      // console.log(pairs);

      // // console.log(qaPairs);
      // dispatch({ type: "Q&A_PAIRS_SUCCESS", payload: pairs });
    } catch (error) {
      console.log(error.response);
    }
  };

  return (
    <GlobalContext.Provider
      value={{
        ...state,
        displayAlert,
        registerUser,
        loginUser,
        deleteUser,
        deleteUserForGood,
        updateUser,
        logOutUser,
        toggleMobileNav,
        toggleDeleteModal,
        getFortune,
        createQAPair,
        getQAPairs,
        resetIsQuestionAsked,
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
