import {
    ADD_COMMENT,
    DELETE_POST_BY_ID,
    GET_POST_BY_ID,
    GET_POSTS, GET_POSTS_BY_CATEGORY,
    GET_USER_DATA, HIDE_ALERT, SET_CURRENT_PAGE, SHOW_ALERT,
    TOGGLE_LIKE,
    TOGGLE_LIKE_POST
} from "./types";


export function getPosts(page) {
    return async dispatch => {
        try {
                const response = await fetch(`/api/posts/${page}`)
                const posts = await response.json()
                dispatch({type: GET_POSTS, payload: posts})
        } catch (e) {
            console.log("get posts request failed")
        }
    }
}

export function getPostsByCategory(category, categoryName, page) {
    return async dispatch => {
        try {
            const response = await fetch(`/api/posts/bycategory/${category}/${page}`)
            const posts = await response.json()
            dispatch({type: GET_POSTS_BY_CATEGORY, payload: {posts, categoryName}})
        } catch (e) {
            console.log("get posts by category request failed")
        }
    }
}

export function setCurrentPage(currentPage) {
    return { type: SET_CURRENT_PAGE, payload: currentPage }
}

export function getPostById(postId) {
    return async dispatch => {
        try {
            const responseById = await fetch(`/api/posts/byid/${postId}`)
            const post = await responseById.json()
            dispatch({type: GET_POST_BY_ID, payload: post})
        } catch (e) {
            console.log("get posts request failed")
        }
    }
}

export function deletePostById(postId, token) {
    return async dispatch => {
        try {
            const response = await fetch(`/api/posts/${postId}`, {
                method: 'DELETE', headers: {
                    'Content-Type': 'application/json', Authorization: `Bearer ${token}`
                }
            })
            const post = await response.json()
            dispatch({type: DELETE_POST_BY_ID, payload: post})
        } catch (e) {
            console.log("delete post request failed")
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

export function addComment(comment, userName, postId, date, token) {
    return async dispatch => {
        try {
            const response = await fetch('/api/posts/addcomment/', {
                method: 'POST', body: JSON.stringify({postId, comment, date}), headers: {
                    'Content-Type': 'application/json', Authorization: `Bearer ${token}`
                }
            })
            const data = await response.json()
            console.log(data)
            const commentPayload = { comment, userName, date }
            dispatch({type: ADD_COMMENT, payload: commentPayload})
        } catch (e) {
            console.log("post comment request failed")
        }
    }
}

export function showAlert(text, severity) {
    return dispatch => {
        dispatch({
            type: SHOW_ALERT,
            payload: {text, severity}
        })

        setTimeout(() => {
            dispatch(hideAlert())
        }, 7000)
    }
}

export function hideAlert() {
    return {
        type: HIDE_ALERT
    }
}

