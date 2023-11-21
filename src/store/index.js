import { createStore } from "redux";
import Cookies from "js-cookie";

const reducer = (
  state = {
    error: null,
    isLogin: false,
    user: null,
  },
  action
) => {
  if (action.type === "LOGIN") {
    localStorage.setItem("user", JSON.stringify(action.user));
    return {
      ...state,
      isLogin: true,
      user: JSON.parse(localStorage.getItem("user")),
    };
  }
  if (action.type === "STILL_LOGIN") {
    return {
      ...state,
      isLogin: true,
      user: JSON.parse(localStorage.getItem("user")),
    };
  }

  if (action.type === "LOGOUT") {
    localStorage.removeItem("user");

    return {
      ...state,
      isLogin: false,
      user: null,
    };
  }

  if (action.type === "LOGIN_FAILURE") {
    return {
      ...state,
      error: action.error,
    };
  }

  return state;
};

const store = createStore(reducer);
export default store;
