import React from "react";
import ReactDOM from "react-dom";
import AllReducers from "./reducers/AllReducers";
import { Provider } from "react-redux";
import { createStore } from "redux";
import App from "./App";

const store = createStore(
  AllReducers,
  window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__()
);

ReactDOM.render(
  <React.StrictMode>
    <Provider store={store}>
      <App />
    </Provider>
  </React.StrictMode>,
  document.getElementById("root")
);
