import { API_SUCCESS, API_ERROR } from "../../../actions/api";
import { LOGOUT } from "../../../actions/auth";
import { SET_LOADER } from "../../../actions/ui";

export default (
  state = {
    isAuthUser: !!localStorage.getItem("user"),
    user: JSON.parse(localStorage.getItem("user")) || {},
    isLoading: false,
    error: null,
  },
  action
) => {
  switch (action.type) {
    /**
     * In the reducer function, we will set the user's AUTH token, which is sent by the server. In a real-world application, the token is saved in the cookie for security reasons, but for simplicity, we are going to store it in local storage.
     */
    case API_SUCCESS:
      //identify the login req
      return { ...state, payload: action.payload };
    case API_ERROR:
      return { ...state, error: action.payload };
    case SET_LOADER:
      return { ...state, isLoading: action.payload };
    default:
      return state;
  }
};
