import Login from './service/Login';
import './styles/app.scss';
import { useSelector, useDispatch } from 'react-redux';
import Team from './team/Team';
import { Link, Route } from 'react-router-dom';
import Home from './service/Home';
import axios from 'axios';
import { logout } from './store/modules/user';
function App() {
    const state_login = useSelector((state) => state.user);
    const dispatch = useDispatch();
    const event_logout = () => {
        axios.get('/oauth/logout');
        dispatch(logout());
    };
    return (
        <>
            <div>
                <Link to="/">홈페이지</Link>
                {state_login.user.name === '' && (
                    <Link to="/login">로그인</Link>
                )}
                {state_login.user.name !== '' && (
                    <button onClick={event_logout}>로그아웃</button>
                )}
                {state_login.user.name !== '' && (
                    <Link to="/team">팀 페이지</Link>
                )}
            </div>
            <Route exact path="/" component={Home} />
            <Route path="/login" component={Login} />
            <Route path="/team" component={Team} />
        </>
    );
}

export default App;
