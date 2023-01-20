import { createStore } from "redux";
import reducerFn from "../reducers/reducerFn";

const store = createStore(reducerFn);

export default store;
