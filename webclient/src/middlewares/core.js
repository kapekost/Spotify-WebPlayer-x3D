import axios from "axios";
import { apiError, apiSuccess, CANCEL_API_REQUEST } from "../actions/api";

const CancelToken = axios.CancelToken;
const source = CancelToken.source();

export const apiMiddleware = ({ dispatch }) => (next) => (action) => {
  next(action);
  if (action.type === CANCEL_API_REQUEST) {
    source.cancel("Operation canceled by the user.");
    console.log("REQUEST CANCELLED!!!");
    return;
  }
  if (!action.meta) return;
  const { url, method, data } = action.meta;
  axios({
    method,
    url,
    data,
    cancelToken: source.token,
  })
    .then(({ data }) =>
      dispatch(apiSuccess({ response: data, type: action.type }))
    )
    .catch((error) => {
      console.log(error);
      if (axios.isCancel(error)) {
        console.log("error in cancel?", error.message);
      } else {
        if (!error.response) {
          dispatch(apiError({ error: error }));
        } else {
          dispatch(apiError({ error: error.response.data }));
        }
      }
    });
};
