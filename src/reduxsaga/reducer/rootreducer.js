import { combineReducers } from "redux";
import { authreducer } from "./reducer";

export const rootreducer = combineReducers({
    auth : authreducer
})