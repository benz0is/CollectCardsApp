import React from "react";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import Home from "./routes/Home";
import LogInPage from "./routes/LogInPage";
import RegisterPage from "./routes/RegisterPage";
import { ContextProvider } from "./context/ContextProvider";
import { useDispatch } from "react-redux";
import { sign_in } from "./actions/index";
import CollectionPage from "./routes/CollectionPage";
import ProfilePage from "./routes/ProfilePage";

const App = () => {
  const checkIfLogged = sessionStorage.getItem("logged");

  const dispatch = useDispatch();
  if (checkIfLogged) {
    dispatch(sign_in());
  }

  return (
    <ContextProvider>
      <Router>
        <Switch>
          <Route exact path="/" component={LogInPage}></Route>
          <Route exact path="/Register" component={RegisterPage}></Route>
          <Route exact path="/Home/:id" component={Home}></Route>
          <Route
            exact
            path="/Collection/:id"
            component={CollectionPage}
          ></Route>
          <Route exact path="/Profile/:id" component={ProfilePage}></Route>
        </Switch>
      </Router>
    </ContextProvider>
  );
};

export default App;
