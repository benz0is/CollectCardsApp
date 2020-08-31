import React from "react";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import Home from "./routes/Home";
import LogInPage from "./routes/LogInPage";
import RegisterPage from "./routes/RegisterPage";

const App = () => {
  return (
    <div className="container">
      <Router>
        <Switch>
          <Route exact path="/" component={LogInPage}></Route>
          <Route exact path="/Register" component={RegisterPage}></Route>
          <Route exact path="/:id/Home" component={Home}></Route>
        </Switch>
      </Router>
    </div>
  );
};

export default App;
