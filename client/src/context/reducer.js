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
  if (action.type === "LOGOUT_USER") {
    return {
      ...state,
      token: null,
      user: null,
    };
  }

  throw new Error(`no such action: ${action.type}`);
};

export default reducer;
