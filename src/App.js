import Login from './service/NewLogin';
import { useEffect, useState } from 'react';
import './styles/app.scss';
import { useDispatch } from 'react-redux';
import Team from './team/Team';
import { logout, setLoggedInfo } from './store/modules/user';
import { Link, Route, Switch } from 'react-router-dom';
import Home from './service/Home';
import axios from 'axios';
import { login } from './store/modules/user';
import storage from './lib/storage';
import Modal from 'react-awesome-modal';
import Notfount from './components/Notfount';
import Register from './service/Register';

function App() {
    const _loggedInfo = 'loggedInfo';
    const dispatch = useDispatch();
    const [logined, setLogined] = useState(false);
    const [modalVisible, setModalVisible] = useState(false);
    const [modalState, setModalState] = useState(false);
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
                    setLogined((data) => (data = true));
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
                        storage.remove('loggedInfo');
                        storage.remove(_loggedInfo);
                        dispatch(logout());
                        window.location.href = '/';
                    }
                    setLogined(true);
                })
                .catch((err) => {
                    console.log(err);
                });
        } catch {
            storage.remove('loggedInfo');
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
    const openRegister = () => {
        setModalState((state) => (state = false));
        setModalVisible(true);
    };
    const openModal = () => {
        setModalState((state) => (state = true));
        setModalVisible((state) => (state = true));
    };
    const closeModal = () => {
        setModalVisible((state) => (state = false));
    };
    return (
        <div className="appContiner">
            <div className="madinHeader">
                <div>
                    <Link to="/" className="titleLogo">
                        홈페이지
                    </Link>
                    {logined && <Link to="/team">팀 페이지</Link>}
                </div>

                <div>
                    {!logined && <button onClick={openModal}>로그인</button>}
                    {!logined && (
                        <button onClick={openRegister}>회원가입</button>
                    )}
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
                {modalState && <Login closeModal={closeModal} />}
                {!modalState && <Register closeModal={closeModal} />}
            </Modal>
        </div>
    );
}

export default App;
