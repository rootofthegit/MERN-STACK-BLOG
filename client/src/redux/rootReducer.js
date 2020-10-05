import {combineReducers} from "redux";
import {postReducer} from "./postsReducer";
import {userReducer} from "./userReducer";

export const rootReducer = combineReducers ({
    posts: postReducer,
    userData: userReducer
})