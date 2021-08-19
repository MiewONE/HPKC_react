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
import Mypage from './mypage/Mypage';

const HOMEPAGE = 0;
const TEAMPAGE = 1;
const MYPAGE = 2;
function App() {
    const _loggedInfo = 'loggedInfo';
    const dispatch = useDispatch();
    const [logined, setLogined] = useState(false);
    const [modalVisible, setModalVisible] = useState(false);
    const [modalState, setModalState] = useState(false);
    const [pendingInvidation, setPendingInvidation] = useState([]);
    const [notionVisible, setNostionVisible] = useState(false);
    const [pageState, setPageState] = useState(HOMEPAGE);
    useEffect(() => {
        const kakaoLogin = storage.get('kakao');
        console.log(kakaoLogin);
        if (kakaoLogin) {
            axios
                .get('/api/oauth/usr')
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
        console.log(loggedInfo);
        if (!loggedInfo) return;

        dispatch(setLoggedInfo(loggedInfo));

        try {
            axios
                .post('/api/oauth/check', loggedInfo)
                .then((res) => {
                    console.log(res);
                    if (!res.data.success) {
                        storage.remove('loggedInfo');
                        storage.remove(_loggedInfo);
                        dispatch(logout());
                        return;
                        // window.location.href = '/';
                    } else {
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
        axios
            .get('/api/oauth/invitedTeam')
            .then((res) => {
                if (res.data.success) {
                    setPendingInvidation(res.data.msg);
                }
            })
            .catch((err) => {
                console.log(err);
            });
    }, []);
    const event_logout = () => {
        axios.get('/api/oauth/logout');
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
    const openNotion = () => {
        console.log(notionVisible);
        setNostionVisible(!notionVisible);
    };
    const removeInvitation = (teamName) => {
        setPendingInvidation(
            pendingInvidation.filter((ele) => ele.teamName !== teamName)
        );
        if (pendingInvidation.length < 1) {
            setNostionVisible(!notionVisible);
        }
    };
    const confirm = (data) => {
        return () => {
            axios
                .post('/api/team/memberappend', {
                    teamName: data.teamName,
                })
                .then((res) => {
                    if (res.data.success) {
                        alert(res.data.msg.teamName + '에 참여하였습니다.');
                        setPendingInvidation(
                            pendingInvidation.filter(
                                (ele) => ele.teamName !== data.teamName
                            )
                        );
                    } else {
                        console.log(res);
                    }
                });
            removeInvitation(data.teamName);
        };
    };
    const cancel = (data) => {
        return () => {
            // 유저와 팀 디비에서 요청을 삭제하는 로직.
            axios
                .post('/api/team/reject', {
                    teamName: data.teamName,
                })
                .then((res) => {
                    if (res.data.success) {
                        alert('거절 되었습니다.');
                    } else {
                        console.log(res);
                    }
                });
            removeInvitation(data.teamName);
        };
    };
    return (
        <div className="appContiner">
            <div className="madinHeader">
                <div>
                    {logined && (
                        <div className="pages">
                            <Link
                                to="/team"
                                className={
                                    pageState === TEAMPAGE ? 'page' : 'nonpage'
                                }
                                onClick={() => {
                                    setPageState(TEAMPAGE);
                                }}
                            >
                                <p>팀 페이지</p>
                            </Link>
                            <Link
                                to="/mypage"
                                className={
                                    pageState === MYPAGE ? 'page' : 'nonpage'
                                }
                                onClick={() => {
                                    setPageState(MYPAGE);
                                }}
                            >
                                <p>마이 페이지</p>
                            </Link>
                        </div>
                    )}
                </div>
                <div className="titleLogo">
                    <Link
                        to="/"
                        onClick={() => {
                            setPageState(HOMEPAGE);
                        }}
                    >
                        <img src="/img/defaultlogopptogether.png" alt="logo" />
                    </Link>
                </div>

                <div>
                    {!logined && (
                        <div style={{ marginRight: '3%' }} onClick={openModal}>
                            <p>로그인</p>
                        </div>
                    )}
                    {!logined && (
                        <div onClick={openRegister}>
                            <p>회원가입</p>
                        </div>
                    )}
                    {logined && (
                        <section style={{ display: 'flex' }}>
                            {pendingInvidation && pendingInvidation.length > 0 && (
                                <span className="notion" onClick={openNotion}>
                                    <span>알림 </span>
                                    <span id="invidationCnt">
                                        {pendingInvidation.length}개
                                    </span>
                                </span>
                            )}

                            <p style={{ margin: '0 20px' }}>
                                안녕하세요,
                                {storage.get(_loggedInfo)
                                    ? storage.get(_loggedInfo).name
                                    : storage.remainGet(_loggedInfo).name}
                                님
                            </p>

                            <div onClick={event_logout}>
                                <p>로그아웃</p>
                            </div>
                        </section>
                    )}
                </div>
            </div>
            <Switch>
                <Route exact path="/" component={Home} />
                <Route path="/team" component={Team} />
                <Route path="/mypage" component={Mypage} />
                <Route component={Notfount} />
            </Switch>

            <Modal
                visible={modalVisible}
                width="420"
                height="558"
                effect="fadeInUp"
                onClickAway={closeModal}
            >
                {modalState && (
                    <Login
                        closeModal={closeModal}
                        openRegister={openRegister}
                    />
                )}
                {!modalState && (
                    <Register closeModal={closeModal} openModal={openModal} />
                )}
            </Modal>
            {notionVisible && (
                <section id="notionWindow">
                    <strong>초대받은 팀 내역입니다.</strong>
                    <section>
                        <span></span>
                    </section>
                    <section className="invidationContainer">
                        <img
                            src="/img/close.png"
                            alt="x"
                            onClick={() => {
                                setNostionVisible(!notionVisible);
                            }}
                        />
                        {pendingInvidation &&
                            pendingInvidation.map((ele) => {
                                return (
                                    <section className="invidationList">
                                        <span>{ele.teamName}</span>
                                        <span>{ele.email}</span>
                                        <section>
                                            <span
                                                className="ok"
                                                onClick={confirm(ele)}
                                            >
                                                승낙
                                            </span>
                                            <span
                                                className="nagative"
                                                onClick={cancel(ele)}
                                            >
                                                거절
                                            </span>
                                        </section>
                                    </section>
                                );
                            })}
                    </section>
                </section>
            )}
        </div>
    );
}

export default App;
