import {applyMiddleware, combineReducers, createStore} from "redux";

import authReducer from "./auth-reducer";

let reducers = combineReducers({})