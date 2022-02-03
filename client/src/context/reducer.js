const reducer = (state, action) => {
  if (action.type === "SHOW_ALERT")
    return {
      ...state,
      showAlert: true,
      alertType: "fail",
      alertText: "Please complete all fields",
    };

  if (action.type === "CLEAR_ALERT")
    return {
      ...state,
      showAlert: false,
      alertType: "",
      alertText: "",
    };

  if (action.type === "REGISTER_USER_PASS") {
    return {
      ...state,
      isLoading: false,
      token: action.payload.token,
      user: action.payload.user,
      showAlert: true,
      alertType: "pass",
      alertText: "New User Created! One Sec...",
    };
  }
  if (action.type === "REGISTER_USER_FAIL") {
    return {
      ...state,
      isLoading: false,
      showAlert: true,
      alertType: "fail",
      alertText: action.payload.msg,
    };
  }

  if (action.type === "LOGIN_USER_PASS") {
    return {
      ...state,
      isLoading: false,
      token: action.payload.token,
      user: action.payload.user,
      showAlert: true,
      alertType: "pass",
      alertText: "Login Passed! One Sec...",
    };
  }
  if (action.type === "LOGIN_USER_FAIL") {
    return {
      ...state,
      isLoading: false,
      showAlert: true,
      alertType: "fail",
      alertText: action.payload.msg,
    };
  }
  if (action.type === "UPDATE_USER_PASS") {
    return {
      ...state,
      token: action.payload.token,
      user: action.payload.user,
      isLoading: false,
      showAlert: true,
      alertType: "pass",
      alertText: "Updated Profile!",
    };
  }
  if (action.type === "DELETE_USER_PASS") {
    return {
      ...state,
      token: null,
      user: null,
    };
  }

  // Code for UPDATE_USER_FAIL CONDITION

  if (action.type === "LOGOUT_USER") {
    return {
      ...state,
      token: null,
      user: null,
    };
  }

  if (action.type === "TOGGLE_MOBILE_NAV") {
    return {
      ...state,
      isMobileNavOpen: !state.isMobileNavOpen,
    };
  }
  if (action.type === "TOGGLE_DELETE_MODAL") {
    return {
      ...state,
      isDeleteModalOpen: !state.isDeleteModalOpen,
    };
  }

  if (action.type === "ASK_QUESTION_START") {
    return {
      ...state,
      isQuestionAsked: true,
      // fortune: action.payload,
    };
  }
  if (action.type === "FORTUNE_RETRIEVAL") {
    return {
      ...state,
      fortune: action.payload,
    };
  }
  if (action.type === "ANSWER_RECEIVED") {
    return {
      ...state,
      isQuestionAsked: false,
    };
  }
  if (action.type === "Q&A_PAIRS_SUCCESS") {
    return {
      ...state,
      qAndAPairings: action.payload,
    };
  }
  if (action.type === "RESET_PAIRS") {
    return {
      ...state,
      qAndAPairings: [],
    };
  }
  throw new Error(`no such action: ${action.type}`);
};

export default reducer;
