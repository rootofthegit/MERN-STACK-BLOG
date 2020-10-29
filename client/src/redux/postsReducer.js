import {DELETE_POST_BY_ID, GET_POSTS, TOGGLE_LIKE} from "./types";

const initialState = {
    posts: []
}

export const postsReducer = (state = initialState, action) => {
    switch (action.type) {
        case GET_POSTS:
            return ({...state, posts: action.payload})

        case TOGGLE_LIKE:
            const {postId, likedPosts} = action.payload
            const likedPostIndex = likedPosts.indexOf(postId)
            return {
                ...state,
                posts: state.posts.map(postkey => {
                    if ((postkey._id === postId)&&(likedPostIndex!==-1)) {
                        return {...postkey, likes: [--postkey.likes],
                            userData: likedPosts.splice(likedPostIndex, 1)
                        }
                    } else if ((postkey._id === postId)&&(likedPostIndex===-1)) {
                        return {...postkey, likes: [++postkey.likes],
                            userData: likedPosts.push(postId)
                        }
                    }
                    return postkey
                })
            }

        default:
            return state
    }
}