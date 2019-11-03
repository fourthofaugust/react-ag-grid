import {REMOVE_ALL_POSTS, UPDATE_POSTS} from "./Types";

export const updatePosts = (posts) => {
    return {
        type: UPDATE_POSTS,
        posts: posts
    }
};

export const removeAllPosts = () => {
    return {
        type: REMOVE_ALL_POSTS,
        posts: []
    }
};