import { REGISTER_SUCCESS, REGISTER_FAIL, USER_LOADED, AUTH_ERROR, LOGIN_SUCCESS, LOGIN_FAIL, LOGOUT, DELETE_ACCOUNT } from "../components/actions/type";



const initialState = {
    token: localStorage.getItem('token'),

    isAuthenticated: null,
    loading: true,
    user: null,
}


export default (state = initialState, action) => {
    const { type, payload } = action;

    switch (type) {
        case USER_LOADED: {
            return {
                ...state,
                isAuthenticated: true,
                loading: false,
                user: payload,
            }
        }
        case LOGIN_SUCCESS:
        case REGISTER_SUCCESS:
            {
                localStorage.setItem('token', payload.token);

                return {
                    ...state,
                    ...payload,
                    isAuthenticated: true,
                    loading: false,
                }
            }

        case REGISTER_FAIL:
        case LOGIN_FAIL:
        case LOGOUT:
        case DELETE_ACCOUNT:
            {
                localStorage.removeItem('token');
                return {
                    ...state,
                    token: null,
                    isAuthenticated: false,
                    loading: false,
                }

            }
        case AUTH_ERROR:
            {
                localStorage.removeItem('token');
                return {
                    ...state,
                    token: null,
                    isAuthenticated: false,
                    loading: false,
                }

            }
        default: return state;
    }
}