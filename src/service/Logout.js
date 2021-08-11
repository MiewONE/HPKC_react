import { useSelector, useDispatch } from 'react-redux';
import { login, logout } from './store/modules/user';
import axios from 'axios';
import storage from '../lib/storage';
function Logout() {
    storage.remove('loggedInfo');
    const event_logout = () => {
        axios.get('http://localhost:3045/oauth/logout').then((data) => {
            console.log(data.data);
        });
        dispatch(logout());
    };
    const state_login = useSelector((state) => state.user);
    const dispatch = useDispatch();
    return (
        <>
            {state_login.user.name !== '' && (
                <div>
                    <form
                        action="http://localhost:3045/oauth/logou"
                        method="GET"
                    >
                        <input
                            type="submit"
                            name="logout"
                            value="로그아웃"
                        ></input>
                    </form>
                </div>
            )}
        </>
    );
}

export default Logout;
