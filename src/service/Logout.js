import { useSelector, useDispatch } from 'react-redux';
import { login, logout } from './store/modules/user';
import axios from 'axios';

function Logout() {
    const event_logout = () => {
        axios.get('/oauth/logout').then((data) => {
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
                    <form action="/oauth/logou" method="GET">
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
