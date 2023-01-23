import { combineReducers } from "redux";
import loginReducer from "./loginReducer";

const reducers = combineReducers({
  isLogin: loginReducer,
});

export default reducers;
