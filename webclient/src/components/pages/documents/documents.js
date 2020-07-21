import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getDocuments } from "../../../actions/documents";
import DocumentsList from "./documentsList";

export default () => {
  const documentsList = useSelector(
    (state) => state.documentsStore.documentsList
  );
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(getDocuments());
  }, [dispatch]);

  return (
    <div>
      <DocumentsList documentsList={documentsList}></DocumentsList>
    </div>
  );
};
