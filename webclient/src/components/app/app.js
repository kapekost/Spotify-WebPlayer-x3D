import React from "react";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";

import { Provider } from "react-redux";
import { combineReducers, createStore, applyMiddleware } from "redux";

import loginReducer from "../pages/login/loginReducer";
import documentsReducer from "../pages/documents/documentsReducer";
import homeReducer from "../pages/home/homeReducer";

import Navbar from "../navbar";
import { Typography, Container, Divider, CssBaseline } from "@material-ui/core";

import AuthRoute from "../authRoute";

import HomePage from "../pages/home";
import SearchPage from "../pages/search";
import DocumentsPage from "../pages/documents";
import LoginPage from "../pages/login";

import { appMiddleware } from "../../middlewares/app";
import { apiMiddleware } from "../../middlewares/core";

const createStoreWithMiddleware = applyMiddleware(
  appMiddleware,
  apiMiddleware
)(createStore);
const rootReducer = combineReducers({
  loginStore: loginReducer,
  homeStore: homeReducer,
  documentsStore: documentsReducer,
});

const store = createStoreWithMiddleware(
  rootReducer,
  window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__()
);

const IndexPage = () => (
  <>
    <Typography variant="h3">Welcome to the App</Typography>
    <Divider style={{ marginTop: 10, marginBottom: 10 }} />
    <Typography variant="h6">Feel free to take a look around</Typography>
  </>
);

export default () => {
  return (
    <CssBaseline>
      <Provider store={store}>
        <Router basename={process.env.PUBLIC_URL}>
          <Container style={{ padding: 22 }}>
            <Switch>
              <AuthRoute path="/home" type="private">
                <HomePage />
              </AuthRoute>
              <AuthRoute path="/login" type="guest">
                <LoginPage />
              </AuthRoute>
              <AuthRoute path="/search" type="private">
                <SearchPage />
              </AuthRoute>
              <AuthRoute path="/documents" type="private">
                <DocumentsPage />
              </AuthRoute>
              <Route path="/" render={IndexPage} />
            </Switch>
          </Container>
          <Navbar />
        </Router>
      </Provider>
    </CssBaseline>
  );
};
