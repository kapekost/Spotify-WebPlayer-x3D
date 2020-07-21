import { SEARCH, CANCEL_SEARCH } from "../actions/search";
import { GET_DOCUMENTS } from "../actions/documents";
import { apiRequest, loginRequest, cancelApiRequest } from "../actions/api";
import { setLoader } from "../actions/ui";
import { LOGIN } from "../actions/auth";
import { config } from "../utils";

const SERVER_URL = config.SERVER_URL;

const PIXABAY_KEY = "14545036-912e59631b7d8e4d4ebbffc6a";

const PIXABAY_URL = `https://pixabay.com/api/?key=${PIXABAY_KEY}`;

export const appMiddleware = () => (next) => (action) => {
  next(action);
  switch (action.type) {
    case LOGIN: {
      next(
        loginRequest({
          url: `${SERVER_URL}/login`,
          method: "POST",
          data: action.payload,
          actionReqType: action.type,
        })
      );
      break;
    }
    case GET_DOCUMENTS: {
      next(
        apiRequest({
          url: `${SERVER_URL}/documents`,
          method: "GET",
          actionReqType: action.type,
        })
      );
      break;
    }

    case SEARCH: {
      next(
        apiRequest({
          url: `${PIXABAY_URL}&q=${action.payload}`,
          method: "GET",
          actionReqType: action.type,
        })
      );
      next(setLoader({ state: true }));
      break;
    }
    case CANCEL_SEARCH: {
      next(cancelApiRequest());
      next(setLoader({ state: false }));
      break;
    }
    default:
      break;
  }
};
