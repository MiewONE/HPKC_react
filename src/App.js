import Login from './service/NewLogin';
import { useEffect, useState } from 'react';
import './styles/app.scss';
import { useDispatch } from 'react-redux';
import Team from './team/Team';
import { Link, Route, Switch } from 'react-router-dom';
import Home from './service/Home';
import axios from 'axios';
import { login, logout, setLoggedInfo, checklogin } from './store/modules/user';
import storage from './lib/storage';
import Modal from 'react-awesome-modal';
import Notfount from './components/Notfount';
const _loggedInfo = 'loggedInfo';
function App() {
    const dispatch = useDispatch();
    const [logined, setLogined] = useState(false);
    const [modalVisible, setModalVisible] = useState(false);

    useEffect(() => {
        const kakaoLogin = storage.get('kakao');
        console.log(kakaoLogin);
        if (kakaoLogin) {
            axios
                .get('/oauth/usr')
                .then((res) => {
                    console.log(res);
                    if (!res.data.success) {
                        return;
                    }
                    dispatch(login(res.data.msg));
                    storage.remove('kakao');
                    storage.set(_loggedInfo, res.data.msg);
                    setLogined(true);
                })
                .catch((err) => {
                    console.log(err);
                    if (err) {
                        alert('로그인에 실패 하였습니다.');
                    }
                });
        }
        const loggedInfo = storage.get(_loggedInfo)
            ? storage.get(_loggedInfo)
            : storage.remainGet(_loggedInfo);
        if (!loggedInfo) return;

        dispatch(setLoggedInfo(loggedInfo));

        try {
            axios
                .post('/oauth/check', loggedInfo)
                .then((res) => {
                    console.log(res);
                    if (!res.data.success) {
                        storage.remove(_loggedInfo);
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
            storage.remove(_loggedInfo);
            storage.removeRemain(_loggedInfo);
            window.location.href = '/login?expired';
        }
    }, []);
    const event_logout = () => {
        axios.get('/oauth/logout');
        dispatch(logout());
        setLogined(false);
        storage.remove(_loggedInfo);
        storage.removeRemain(_loggedInfo);
        window.location.href = '/';
    };
    const openModal = () => {
        setModalVisible(true);
    };
    const closeModal = () => {
        setModalVisible(false);
    };
    return (
        <div className="appContiner">
            <div className="madinHeader">
                <div>
                    <Link to="/" className="titleLogo">
                        123
                    </Link>
                    {logined && <Link to="/team">팀 페이지</Link>}
                </div>
                <div>
                    {!logined && <button onClick={openModal}>로그인</button>}
                    {!logined && <button onClick={openModal}>회원가입</button>}
                    {logined && (
                        <button onClick={event_logout}>로그아웃</button>
                    )}
                </div>
            </div>
            <Switch>
                <Route exact path="/" component={Home} />
                <Route path="/team" component={Team} />
                <Route component={Notfount} />
            </Switch>

            <Modal
                visible={modalVisible}
                width="420"
                height="558"
                effect="fadeInUp"
                onClickAway={closeModal}
            >
                <Login closeModal={closeModal} />
            </Modal>
        </div>
    );
}

export default App;
