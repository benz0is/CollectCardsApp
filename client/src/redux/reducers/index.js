import counterReducer from "./counter";
import loggedReducer from "./isLogged";
import { combineReducers } from "redux";
import LogInReducer from "../../../everything/reducers/LogInReducer";

const allReducers = combineReducers({
  counter: counterReducer,
  isLogged: LogInReducer,
});

export default allReducers;
