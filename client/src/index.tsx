import React from "react";
import ReactDOM from "react-dom";
import "./index.css";
import App from "./App";
import { Provider } from "react-redux";
import { applyMiddleware, combineReducers, createStore } from "redux";
import reportWebVitals from "./reportWebVitals";
import { setUsernameReducer, connectedUsersReducer } from "./store/reducers";
import thunk from "redux-thunk";

// redux
let rootReducer = combineReducers({
  setUsernameReducer,
  connectedUsersReducer,
}); // combining all the reducers here
let store = createStore(rootReducer, applyMiddleware(thunk)); // creating a store for the (updated) reducers

ReactDOM.render(
  <Provider store={store}>
    <App />
  </Provider>,
  document.getElementById("root")
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
