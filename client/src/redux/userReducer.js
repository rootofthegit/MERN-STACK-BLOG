import { GET_USER_DATA } from "./types"

const initialState = {
    name: '',
    email: '',
    comments: [],
    likedPosts: []
}

export const userReducer = (state = initialState, action) => {
    switch (action.type) {
        case GET_USER_DATA:
            return ({...state,
                name: action.payload.name,
                email: action.payload.email,
                comments: action.payload.comments,
                likedPosts: action.payload.likedPosts
            })

        default:
            return state
    }
}