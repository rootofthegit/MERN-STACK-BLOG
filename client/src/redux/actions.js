import {ADD_LIKE, GET_POSTS, GET_USER_DATA} from "./types";


export function getPosts() {
    return async dispatch => {
        try {
            const response = await fetch('/api/posts/')
            const posts = await response.json()
            dispatch({type: GET_POSTS, payload: posts})
        } catch (e) {
            console.log("get request failed")
        }
    }
}

export function addLike(likeData) {
    return async dispatch => {
        try {
            const {token} = likeData
            const response = await fetch('/api/posts/like/', {
                method: 'POST',
                body: JSON.stringify({...likeData}),
                headers: {
                    'Content-Type': 'application/json', Authorization: `Bearer ${token}`
                }
            })
            const data = await response.json()
            console.log(data)
            dispatch({type: ADD_LIKE, payload: likeData})
        } catch (e) {
            console.log("post like request failed")
        }
    }
}

export function getUserData(userData) {
    return {
        type: GET_USER_DATA,
        payload: userData
    }
}

