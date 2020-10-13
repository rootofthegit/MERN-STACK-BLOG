import {combineReducers} from "redux";
import {postsReducer} from "./postsReducer";
import {userReducer} from "./userReducer";
import {postReducer} from "./postReducer";

export const rootReducer = combineReducers ({
    posts: postsReducer,
    userData: userReducer,
    post: postReducer
})