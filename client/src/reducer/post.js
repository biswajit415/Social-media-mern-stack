import { GET_POST, POST_ERROR, UPDATE_LIKES, DELETE_POSTS, ADD_POST, GET_SINGLE_POST, ADD_COMMENT, REMOVE_COMMENT } from '../components/actions/type';
const initialState = {
    posts: [],
    post: {},
    loading: true,
    error: {}
}


export default function (state = initialState, action) {
    const { type, payload } = action;
    console.log(type, payload);
    switch (type) {
        case GET_POST:
            return {
                ...state,
                posts: payload,
                loading: false,

            }
        case ADD_POST:
            return {
                ...state,
                posts: [payload, ...state.posts],
                loading: false,
            }
        case POST_ERROR:
            return {
                ...state,
                error: payload,
                loading: false,

            }
        case UPDATE_LIKES:
            return {
                ...state,
                posts: state.posts.map(post => post._id === payload.postId ? {
                    ...post,
                    likes: payload.likes,
                } :
                    post
                ),
                loading: false,
            }
        case DELETE_POSTS:
            return {
                ...state,
                posts: state.posts.filter(post => post._id !== payload),
                loading: false,
            }

        case GET_SINGLE_POST:
            return {
                ...state,
                post: payload,

            }

        case ADD_COMMENT:
            console.log(payload);
            return {
                ...state,
                post: { ...state.post, comments: payload },
                loading: false,
            }
        case REMOVE_COMMENT:

            return {
                ...state,
                post: {
                    ...state.post,
                    comments: state.post.comments.filter(comment => comment._id !== payload),
                }
            }
        default: return state;




    }

}
