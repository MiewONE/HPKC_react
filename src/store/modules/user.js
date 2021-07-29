import { pender } from 'redux-pender';

const LOGIN = 'user/LOGIN';
const LOGOUT = 'user/LOGOUT';
const CHECKLOGIN = 'user/CHECKLOGIN';
const SET_LOGGED_INFO = 'user/SET_LOGGED_INFO';
const SET_VALIDATED = 'user/SET_VALIDATED';
const CHECK_STATUS = 'user/CHECK_STATUS';

export function setLoggedInfo(setLoggedInfo) {
    return {
        type: SET_LOGGED_INFO,
        payload: setLoggedInfo,
    };
}
export function setValidated(setValidated) {
    return {
        type: SET_VALIDATED,
        payload: setValidated,
    };
}
export function checkStatus(checkStatus) {
    return {
        type: CHECK_STATUS,
        payload: checkStatus,
    };
}
export function login(user) {
    return {
        type: LOGIN,
        payload: user,
    };
}
export function logout() {
    return {
        type: LOGOUT,
    };
}
export function checklogin() {
    return {
        type: CHECKLOGIN,
    };
}

const initialInfo = {
    loggedInfo: {
        user: null,
    },
    logged: false,
    validated: false,
};

export default function user(state = initialInfo, action) {
    switch (action.type) {
        case LOGIN:
            return {
                ...state,
                loggedInfo: {
                    user: action.payload.data,
                },
            };
        case LOGOUT:
            return {
                ...state,
                loggedInfo: {
                    user: null,
                },
            };
        case CHECKLOGIN:
            return {};
        case SET_LOGGED_INFO:
            return {
                ...state,
                loggedInfo: { user: action.payload },
                logged: true,
            };
        case SET_VALIDATED:
            return {
                ...state,
                validated: action.payload,
            };
        default:
            return state;
    }
}
