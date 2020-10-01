import {GET_POSTS} from "./types";

export function getPosts() {
    return async dispatch => {
        try {
            const response = await fetch('/api/posts/')
            const posts = await response.json()
            dispatch({type: GET_POSTS, payload: posts})
        } catch (e) {
            alert("THE PROBLEM IS CHOISE")
        }
    }
}