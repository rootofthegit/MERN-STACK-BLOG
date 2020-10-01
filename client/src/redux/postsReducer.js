import {GET_POSTS} from "./types";

const initialState = {
    posts: [],
    likes: [],
    comments: []
}

export const postReducer = (state = initialState, action) => {
    switch (action.type) {
        case GET_POSTS:
            return { ...state, posts: action.payload }
        default: return state
    }

}