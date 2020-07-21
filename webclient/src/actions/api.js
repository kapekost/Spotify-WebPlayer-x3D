import {
  RECEIVE_DOCUMENT,
  ADD_DOCUMENT,
  RECEIVE_ALL_DOCUMENTS,
} from "./documents";

// action types
export const LOGIN_REQUEST = "LOGIN_REQUEST";
export const LOGIN_SUCCESS = "LOGIN_SUCCESS";

export const API_REQUEST = "API_REQUEST";
export const API_SUCCESS = "API_SUCCESS";
export const GET_DOCUMENT_SUCCESS = "GET_DOCUMENT_SUCCESS";
export const ADD_DOCUMENT_SUCCESS = "ADD_DOCUMENT_SUCCESS";
export const RECEIVE_ALL_DOCUMENTS_SUCCESS = "RECEIVE_ALL_DOCUMENTS_SUCCESS";
export const RECEIVE_DOCUMENT_SUCCESS = "RECEIVE_DOCUMENT_SUCCESS";

export const API_ERROR = "API_ERROR";

export const CANCEL_API_REQUEST = "CANCEL_API_REQUEST";

// action creators
export const apiRequest = ({ url, method, data, actionReqType }) => {
  return {
    type: API_REQUEST,
    meta: { url, method, data },
    actionReqType,
  };
};
export const loginRequest = ({ url, method, data }) => {
  return {
    type: LOGIN_REQUEST,
    meta: { url, method, data },
  };
};

export const apiSuccess = ({ response, type, actionReqType }) => {
  let restype = API_SUCCESS;
  switch (type) {
    case LOGIN_REQUEST:
      restype = LOGIN_SUCCESS;
      break;
    case API_REQUEST:
      if (actionReqType === ADD_DOCUMENT) {
        restype = ADD_DOCUMENT_SUCCESS;
      } else if (actionReqType === RECEIVE_DOCUMENT) {
        restype = RECEIVE_DOCUMENT_SUCCESS;
      } else if (actionReqType === RECEIVE_ALL_DOCUMENTS) {
        restype = RECEIVE_ALL_DOCUMENTS_SUCCESS;
      } else {
        restype = GET_DOCUMENT_SUCCESS;
      }
      break;
    default:
      restype = API_SUCCESS;
  }
  return {
    type: restype,
    payload: response,
  };
};

export const cancelApiRequest = () => {
  return {
    type: CANCEL_API_REQUEST,
  };
};
export const apiError = ({ error }) => ({
  type: API_ERROR,
  payload: error,
});
