import { POSTS_LOADING } from "../actions/postsAction"

const initialState = {
    posts: [],
    post: [],
    loadingPost: false
}

const postsReducer = (state = initialState, action) => {
    switch (action.type) {
        case POSTS_LOADING.LOADING_POST:
            return {
                ...state,
                loadingPost: action.payload
            }
        case POSTS_LOADING.GET_POST:
            return {
                ...state,
                post: action.payload
            }
        case POSTS_LOADING.GET_POSTS:
            return {
                ...state,
                posts: action.payload.post
            }
        default:
            return state;
    }
}

export default postsReducer