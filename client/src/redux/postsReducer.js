import {GET_POSTS, TOGGLE_LIKE} from "./types";

const initialState = {
    posts: []
}

export const postReducer = (state = initialState, action) => {
    switch (action.type) {
        case GET_POSTS:
            return ({...state, posts: action.payload})

        case TOGGLE_LIKE:
            const {postId, likedPosts} = action.payload
            const likedPostIndex = likedPosts.indexOf(postId)
            return {
                ...state,
                posts: state.posts.map(post => {
                    if ((post._id === postId)&&(likedPostIndex!==-1)) {
                        return {...post, likes: [--post.likes],...state.userData, userData: likedPosts.splice(likedPostIndex, 1)}
                    } else if ((post._id === postId)&&(likedPostIndex===-1)) {
                        return {...post, likes: [++post.likes], ...state.userData, userData: likedPosts.push(postId)}
                    }
                    return post
                })
            }
        default:
            return state
    }
}