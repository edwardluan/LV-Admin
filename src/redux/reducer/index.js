import { combineReducers } from "redux";
import auth from "./authReducer";
import notify from "./notifyReducer";
import users from "./usersReducer";
import posts from "./postsReducer";
import reports from "./reportReducer";

export default combineReducers({
    auth,
    notify,
    users,
    posts,
    reports
})