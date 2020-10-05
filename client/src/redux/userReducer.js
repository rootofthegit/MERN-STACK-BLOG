import { GET_USER_DATA } from "./types"

const initialState = {
    userName: '',
    userId: '',
    token: '',
    likedPosts: [],
    comments: [],
    avatar: ''
}

export const userReducer = (state = initialState, action) => {
    switch (action.type) {
        case GET_USER_DATA:
            return ({...state,
                userName: action.payload.userName,
                userId: action.payload.userId,
                token: action.payload.token,
                likedPosts: action.payload.likedPosts,
                comments: action.payload.comments,
                avatar: action.payload.avatar
            })

        default:
            return state
    }
}