import { combineReducers } from "redux";
import counterReducer from "./counter.reducer";

export let rootReducer = combineReducers=()=>{
    counter : counterReducer
}