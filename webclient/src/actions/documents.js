export const RECEIVE_ALL_DOCUMENTS = "RECEIVE_ALL_DOCUMENTS";
export const RECEIVE_DOCUMENT = "RECEIVE_DOCUMENT";
export const GET_DOCUMENTS = "GET_DOCUMENTS";
export const ADD_DOCUMENT = "ADD_DOCUMENT";

export const getDocuments = (term) => {
  return {
    type: GET_DOCUMENTS,
    payload: term,
  };
};
export const receiveDocument = (term) => {
  return {
    type: RECEIVE_DOCUMENT,
    payload: { id: term },
  };
};

export const receiveAllDocuments = (term) => {
  return {
    type: RECEIVE_ALL_DOCUMENTS,
    payload: { id: term },
  };
};
export const addDocument = (term) => {
  return {
    type: ADD_DOCUMENT,
    payload: term,
  };
};
