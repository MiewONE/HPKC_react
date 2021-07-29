import Login from './service/Login';
import { useEffect, useState } from 'react';
import './styles/app.scss';
import { useDispatch } from 'react-redux';
import Team from './team/Team';
import { Link, Route } from 'react-router-dom';
import Home from './service/Home';
import axios from 'axios';
import { logout, setLoggedInfo } from './store/modules/user';
import storage from './lib/storage';

function App() {
    const dispatch = useDispatch();
    const [logined, setLogined] = useState(false);
    useEffect(() => {
        const loggedInfo = storage.get('loggedInfo');
        console.log(loggedInfo);
        dispatch(setLoggedInfo(loggedInfo));
        if (!loggedInfo) return;

        try {
            axios
                .post('/oauth/check', loggedInfo)
                .then((res) => {
                    if (!res.data.success) {
                        storage.remove('loggedInfo');
                        dispatch(logout());
                        window.location.href = '/';
                        alert('다시 로그인해주시 바랍니다.');
                    }
                    setLogined(true);
                })
                .catch((err) => {
                    console.log(err);
                });
        } catch {
            storage.remove('loggedInfo');
            window.location.href = '/login?expired';
        }
    }, []);
    const event_logout = () => {
        axios.get('/oauth/logout');
        dispatch(logout());
        setLogined(false);
        storage.remove('loggedInfo');
        window.location.href = '/';
    };
    return (
        <>
            <div>
                <Link to="/">홈페이지</Link>
                {!logined && <Link to="/login">로그인</Link>}
                {logined && <button onClick={event_logout}>로그아웃</button>}
                {logined && <Link to="/team">팀 페이지</Link>}
            </div>
            <Route exact path="/" component={Home} />
            <Route path="/login" component={Login} />
            <Route path="/team" component={Team} />
        </>
    );
}

export default App;
