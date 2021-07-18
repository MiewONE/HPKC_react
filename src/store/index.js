import { combineReducers } from "redux";
import user from "./modules/user";
import vote from "./modules/vote";

export default combineReducers({
    user,
    vote
})