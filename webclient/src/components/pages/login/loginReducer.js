import { LOGIN_SUCCESS, API_ERROR } from "../../../actions/api";
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
    case LOGIN_SUCCESS:
      if (action.payload && action.payload.user)
        localStorage.setItem("user", JSON.stringify(action.payload.user));
      return { ...state, isAuthUser: true, user: action.payload.user };
    case API_ERROR:
      return { ...state, error: action.error };
    case SET_LOADER:
      return { ...state, isLoading: action.isLoading };
    case LOGOUT:
      localStorage.removeItem("user");
      return { ...state, isAuthUser: false, user: {} };
    default:
      return state;
  }
};
