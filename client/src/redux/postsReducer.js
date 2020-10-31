import {
    GET_POSTS,
    GET_POSTS_BY_CATEGORY,
    SET_CURRENT_PAGE,
    SET_TOTAL_POSTS_COUNT,
    TOGGLE_LIKE
} from "./types";

const initialState = {
    posts: [],
    category: null,
    categoryName: '',
    pageSize: 33,
    totalPages: 0,
    currentPage: 1
}

export const postsReducer = (state = initialState, action) => {
    switch (action.type) {
        case GET_POSTS:
            return ({...state, posts: action.payload.posts, totalPages: action.payload.totalPages,
                currentPage: action.payload.currentPage, categoryName: 'Все приколы', category: null})

        case GET_POSTS_BY_CATEGORY:
            return ({...state, posts: action.payload.posts.posts, totalPages: action.payload.posts.totalPages,
                currentPage: action.payload.posts.currentPage, category: action.payload.posts.category,
                categoryName: action.payload.categoryName})

        case SET_CURRENT_PAGE: {
            return {...state, currentPage: action.payload}
        }
        case SET_TOTAL_POSTS_COUNT: {
            return {...state, totalUsersCount: action.count}
        }


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