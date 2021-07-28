import Login from './service/Login';
import { useEffect } from 'react';
import './styles/app.scss';
import { useSelector, useDispatch } from 'react-redux';
import Team from './team/Team';
import { Link, Route } from 'react-router-dom';
import Home from './service/Home';
import axios from 'axios';
import { logout, setLoggedInfo } from './store/modules/user';
import storage from './lib/storage';

function App() {
    const dispatch = useDispatch();
    const InitializeUserInfo = async () => {
        const loggedInfo = storage.get('loggedInfo');
        dispatch(setLoggedInfo(loggedInfo));

        if (!loggedInfo) return;
    };
    useEffect(() => {
        const loggedInfo = storage.get('loggedInfo');
        console.log(loggedInfo);
        dispatch(setLoggedInfo(loggedInfo));

        if (!loggedInfo) return;
    }, [dispatch]);
    const event_logout = () => {
        axios.get('/oauth/logout');
        dispatch(logout());
    };

    return (
        <>
            <div>
                <Link to="/">홈페이지</Link>
                <Link to="/login">로그인</Link>
                {/* {!state_login && (
                    <button onClick={event_logout}>로그아웃</button>
                )}
                {state_login && <Link to="/team">팀 페이지</Link>} */}
            </div>
            <Route exact path="/" component={Home} />
            <Route path="/login" component={Login} />
            <Route path="/team" component={Team} />
        </>
    );
}

export default App;
