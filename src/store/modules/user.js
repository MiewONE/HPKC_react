
const LOGIN = "user/LOGIN";
const LOGOUT = "user/LOGOUT";
const CHECKLOGIN = "user/CHECKLOGIN";
export function login(user) {
    return {
        type : LOGIN,
        payload : user
    }
}
export function logout() {
    return {
        type:LOGOUT,
    }
}
export function checklogin()
{
    return {
        type:CHECKLOGIN
    }
}

const initialInfo = {
    user : {
        name : "",
        provider : "",
        email : "",
        accessToken : "",
        refreshToken : "",
        connectTime : "",
    },
    token : ""
}

export default function user ( state = initialInfo,action)
{
    switch(action.type)
    {
        case LOGIN :
            console.log(action.payload.user);
            return {
                ...state,
                user : action.payload.data,
            }
        case LOGOUT :
            
            return {
                user : {
                    name : "",
                    provider : "",
                    email : "",
                    accessToken : "",
                    refreshToken : "",
                    connectTime : "",
                },
            }
        case CHECKLOGIN :
            return{

            }
        default :
            return state;
    }
}