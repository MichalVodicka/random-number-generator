import { combineReducers } from "redux";
import generatorReducer from "./generatorReducer";
import errorReducer from "./errorReducer";

export default combineReducers({
  generator: generatorReducer,
  error: errorReducer,
});
