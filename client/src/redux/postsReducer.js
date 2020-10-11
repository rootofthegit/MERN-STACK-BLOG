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
            console.log(likedPostIndex)
            return {
                ...state,
                posts: state.posts.map(post => {
                    if ((post._id === postId)/*&&(likedPostIndex!==-1)*/) {
                        return {...post, likes: [--post.likes]}
                    }/* else {
                        return {...post, likes: [++post.likes]}
                    }*/
                    return post
                })
            }
        default:
            return state
    }
}