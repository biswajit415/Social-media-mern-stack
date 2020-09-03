import axios from 'axios';
import { setAlert } from './alert';
import { GET_POST, POST_ERROR, UPDATE_LIKES, ADD_POST, GET_SINGLE_POST, ADD_COMMENT, REMOVE_COMMENT, DELETE_POSTS } from './type';

export const getPosts = () => async dispatch => {
    try {
        const res = await axios.get('/api/post');
        dispatch({
            type: GET_POST,
            payload: res.data,
        });


    } catch (error) {
        dispatch({
            type: POST_ERROR,
            payload: {

                msg: error.response.statusText,
                status: error.response.status,
            }
        })
    }
}
export const getSinglePost = (postId) => async dispatch => {
    try {
        const res = await axios.get(`/api/post/${postId}`);
        dispatch({
            type: GET_SINGLE_POST,
            payload: res.data,
        });


    } catch (error) {
        dispatch({
            type: POST_ERROR,
            payload: {

                msg: error.response.statusText,
                status: error.response.status,
            }
        })
    }
}

export const addLike = (postId) => async dispatch => {
    try {

        const res = await axios.put(`/api/post/like/${postId}`);

        dispatch({
            type: UPDATE_LIKES,
            payload: { postId, likes: res.data },
        });


    } catch (error) {
        dispatch({
            type: POST_ERROR,
            payload: {

                msg: error.response.statusText,
                status: error.response.status,
            }
        })
    }
}

export const removeLike = (postId) => async dispatch => {
    try {
        const res = await axios.put(`/api/post/unlike/${postId}`);
        dispatch({
            type: UPDATE_LIKES,
            payload: { postId, likes: res.data },
        });


    } catch (error) {
        dispatch({
            type: POST_ERROR,
            payload: {

                msg: error.response.statusText,
                status: error.response.status,
            }
        })
    }
}

export const deletePost = (postId) => async dispatch => {
    try {
        const res = await axios.delete(`/api/post/${postId}`);
        dispatch({
            type: DELETE_POSTS,
            payload: postId,
        });
        dispatch(setAlert('Post is removed', 'success'));
    } catch (error) {
        dispatch({
            type: POST_ERROR,
            payload: {

                msg: error.response.statusText,
                status: error.response.status,
            }
        })
    }
}

export const addPost = (formData) => async dispatch => {
    const config = {
        headers: {
            'Content-Type': 'application/json'
        }
    }

    try {
        const res = await axios.post('/api/post', formData, config);
        dispatch({
            type: ADD_POST,
            payload: res.data,
        });
        dispatch(setAlert('Post is created', 'success'));
    } catch (error) {
        dispatch({
            type: POST_ERROR,
            payload: {

                msg: error.response.statusText,
                status: error.response.status,
            }
        })
    }
}

export const addComment = (postId, formData) => async dispatch => {
    const config = {
        headers: {
            'Content-Type': 'application/json'
        }
    }

    try {
        const res = await axios.post(`/api/post/comment/${postId}`, formData, config);

        dispatch({
            type: ADD_COMMENT,
            payload: res.data,
        });
        dispatch(setAlert('Comment is added successfully', 'success'));
    } catch (error) {
        dispatch({
            type: POST_ERROR,
            payload: {

                msg: error.response.statusText,
                status: error.response.status,
            }
        })
    }
}

export const deleteComment = (postId, commentId) => async dispatch => {


    try {
        const res = await axios.delete(`/api/post/comment/${postId}/${commentId}`);

        dispatch({
            type: REMOVE_COMMENT,
            payload: commentId,
        });
        dispatch(setAlert('Comment is deleted successfully', 'danger'));
    } catch (error) {
        dispatch({
            type: POST_ERROR,
            payload: {

                msg: error.response.statusText,
                status: error.response.status,
            }
        })
    }
}
