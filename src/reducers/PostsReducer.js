import {UPDATE_POSTS, REMOVE_ALL_POSTS} from "../actions/Types";

const initialState = {
    posts: [],
};

export default (state = initialState, action) => {
    switch (action.type) {
        case UPDATE_POSTS:
            return {
                ...state,
                posts: [...action.posts]
            };
        case REMOVE_ALL_POSTS:
            return {
                ...state,
                posts: []
            };
        default:
            return state
    }
}