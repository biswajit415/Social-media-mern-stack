import { GET_PROFILE, PROFILE_ERROR, CLEAR_PROFILE, UPDATE_PROFILE, GET_ALL_PROFILE, GET_REPOS } from "../components/actions/type";


const initailaState = {
    profile: null,
    profiles: [],
    repos: [],
    loading: true,
    error: {}

}


export default function (state = initailaState, action) {
    const { type, payload } = action;

    switch (type) {
        case GET_PROFILE:
        case UPDATE_PROFILE:
            return {
                ...state,
                profile: payload,
                loading: false,
            }

        case GET_ALL_PROFILE: {

            return {
                ...state,
                profiles: payload,
                loading: false,
            }
        }
        case PROFILE_ERROR: {
            return {
                ...state,
                error: payload,
                loading: false,
            }
        }
        case GET_REPOS: {
            return {
                ...state,
                repos: payload,
                loading: false,
            }
        }
        case CLEAR_PROFILE: {

            return {
                ...state,
                profile: null,
                repos: [],


            }
        }
        default: return state
    }
}