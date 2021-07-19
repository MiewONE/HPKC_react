
import { useSelector,useDispatch } from "react-redux";
import { login,logout } from "./store/modules/user";
import axios from "axios";

function Logout() 
{
    const event_logout = () => {
        axios.get("/oauth/logout")
        dispatch(logout());
    }
    const state_login = useSelector(state => state.user);
    const dispatch = useDispatch();
    return (
        <>
                    
                    {
            (state_login.user.name !== "") && 
                <div>
                    <button onClick={event_logout}>로그아웃</button>    
                </div>
                
            }
        </>
    )
}