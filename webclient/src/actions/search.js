export const SEARCH = "SEARCH";
export const CANCEL_SEARCH = "CANCEL_SEARCH";

export const search = term => {
  return {
    type: SEARCH,
    payload: term
  };
};

export const cancelSearch = () => {
  return {
    type: CANCEL_SEARCH
  };
};
