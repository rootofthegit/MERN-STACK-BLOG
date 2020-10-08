import {ADD_LIKE, GET_POSTS} from "./types";

const initialState = {
    posts: []
}

export const postReducer = (state = initialState, action) => {
    switch (action.type) {
        case GET_POSTS:
            return ({...state/*, posts: action.payload*/})
        case ADD_LIKE:
            const {postId} = action.payload
            return {
                ...state,
                posts: state.posts.map(post => {
                    if (post._id === postId) {
                        return {...post, likes: [++post.likes]}
                    }
                    return post
                })
            }
        default:
            return state
    }
}