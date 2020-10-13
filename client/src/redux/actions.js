import {GET_POST_BY_ID, GET_POSTS, GET_USER_DATA, TOGGLE_LIKE, TOGGLE_LIKE_POST} from "./types";


export function getPosts() {
    return async dispatch => {
        try {
                const response = await fetch('/api/posts/')
                const posts = await response.json()
                dispatch({type: GET_POSTS, payload: posts})
        } catch (e) {
            console.log("get posts request failed")
        }
    }
}

export function getPostById(postId) {
    return async dispatch => {
        try {
            const response = await fetch(`/api/posts/${postId}`)
            const post = await response.json()
            dispatch({type: GET_POST_BY_ID, payload: post})
        } catch (e) {
            console.log("get posts request failed")
        }
    }
}

export function getUserData(token) {
    return async dispatch => {
        try {
            const response = await fetch('/api/user/userdata/', {
                method: 'GET',
                headers: { 'Content-Type': 'application/json', Authorization: `Bearer ${token}`}
            })
            const userData = await response.json()
            dispatch({type: GET_USER_DATA, payload: userData})
        } catch (e) {
            console.log("get posts request failed")
        }
    }
}

export function toggleLike(likeData) {
    return async dispatch => {
        try {
            const {token} = likeData
            const response = await fetch('/api/posts/like/', {
                method: 'POST', body: JSON.stringify({...likeData}), headers: {
                    'Content-Type': 'application/json', Authorization: `Bearer ${token}`
                }
            })
            const data = await response.json()
            console.log(data)
            dispatch({type: TOGGLE_LIKE, payload: likeData})
        } catch (e) {
            console.log("post like request failed")
        }
    }
}

export function toggleLikePost(likeData) {
    return async dispatch => {
        try {
            const {token} = likeData
            const response = await fetch('/api/posts/like/', {
                method: 'POST', body: JSON.stringify({...likeData}), headers: {
                    'Content-Type': 'application/json', Authorization: `Bearer ${token}`
                }
            })
            const data = await response.json()
            console.log(data)
            dispatch({type: TOGGLE_LIKE_POST, payload: likeData})
        } catch (e) {
            console.log("post like request failed")
        }
    }
}

