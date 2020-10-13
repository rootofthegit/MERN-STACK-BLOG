import {GET_POST_BY_ID, TOGGLE_LIKE_POST} from "./types";

const initialState = {
    title: '',
    postText: '',
    imageSrc: '',
    date: '',
    likes: null,
    clicks: null
}

export const postReducer = (state = initialState, action) => {
    switch (action.type) {
        case GET_POST_BY_ID:
            return {...state,
                title: action.payload.title,
                postText: action.payload.postText,
                imageSrc: action.payload.imageSrc,
                date: action.payload.date,
                likes: action.payload.likes,
                clicks: action.payload.clicks
            }

        case TOGGLE_LIKE_POST:
            const {postId, likedPosts} = action.payload
            const likedPostIndex = likedPosts.indexOf(postId)
            return {...state,
                likes: (likedPostIndex!==-1)?(--state.likes):(++state.likes),
                userData: (likedPostIndex!==-1)?likedPosts.splice(likedPostIndex, 1):likedPosts.push(postId)
            }

        default:
            return state
    }
}