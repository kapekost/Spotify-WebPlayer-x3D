import {
  GET_DOCUMENT_SUCCESS,
  ADD_DOCUMENT_SUCCESS,
  RECEIVE_DOCUMENT_SUCCESS,
  API_ERROR,
} from "../../../actions/api";

export default (
  state = {
    documentsList: [],
  },
  action
) => {
  switch (action.type) {
    case ADD_DOCUMENT_SUCCESS:
      return { ...state };
    case RECEIVE_DOCUMENT_SUCCESS:
      return { ...state };
    case GET_DOCUMENT_SUCCESS:
      return { ...state, documentsList: action.payload };
    case API_ERROR:
      return { ...state, error: action.error };
    default:
      return state;
  }
};
