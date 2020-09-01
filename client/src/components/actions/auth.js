import axios from 'axios';
import { REGISTER_SUCCESS, REGISTER_FAIL, USER_LOADED, AUTH_ERROR, LOGIN_FAIL, LOGIN_SUCCESS, LOGOUT, CLEAR_PROFILE } from './type';
import { setAlert } from './alert';
import setAuthToken from '../../util/setAuthToken';


export const loadUser = () => async dispatch => {

    if (localStorage.token) {
        setAuthToken(localStorage.token);
    }

    try {
        const res = await axios.get('http://localhost:5000/api/auth');

        dispatch({
            type: USER_LOADED,
            payload: res.data,
        });
    } catch (error) {

        dispatch({
            type: AUTH_ERROR,
        })

    }
}








export const register = formData => async dispatch => {
    const config = {
        headers: {
            'Content-type': 'application/json'
        }
    }

    const body = JSON.stringify(formData)
    try {
        const res = await axios.post('http://localhost:5000/api/users', body, config);

        dispatch({
            type: REGISTER_SUCCESS,
            payload: res.data
        });

        dispatch(loadUser());

    } catch (err) {

        const errors = err.response.data.errors;

        if (errors) {
            errors.forEach(error => dispatch(setAlert(error.msg, 'danger')));
        }

        dispatch({
            type: REGISTER_FAIL
        });
    }
};

export const login = (email, password) => {
    return async dispatch => {
        const config = {
            headers: {
                'Content-type': 'application/json'
            }
        }

        const body = JSON.stringify({ email, password })

        try {

            const res = await axios.post('http://localhost:5000/api/auth', body, config);


            dispatch({
                type: LOGIN_SUCCESS,
                payload: res.data,
            })

            dispatch(loadUser());


        } catch (error) {


            const errors = error.response.data.errors;
            if (errors) {
                errors.forEach(error => dispatch(setAlert(error.msg, 'danger')));
            }




        }



    }
}



export const logout = () => dispatch => {
    dispatch({
        type: LOGOUT,

    });
    dispatch({
        type: CLEAR_PROFILE,

    });
}