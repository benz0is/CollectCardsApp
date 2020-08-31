import LogInReducer from "./LogInReducer";
import { combineReducers } from "redux";

const AllReducers = combineReducers({
  isLogged: LogInReducer,
});

export default AllReducers;
