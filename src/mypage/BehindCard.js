import React, { useState, useRef } from 'react';
import '../styles/behindCard.scss';
import axios from 'axios';
import { Input } from '../styles/loginStyle';
const BehindCard = ({ myinfo, information }) => {
    const originalPassword = useRef();
    const newPassword = useRef();
    const newPasswordConfirm = useRef();
    const [confirmPwd, setConfirmPwd] = useState(true);
    const [confirmNewPwd, setConfirmNewPwd] = useState(true);
    const withdrawal = () => {
        axios
            .get('/api/oauth/withdrawer')
            .then((res) => {
                if (res.data.success) {
                    alert('서비스 탈퇴 되었습니다.\n이용해 주셔서 감사합니다.');
                    window.location.href = '/';
                } else {
                    console.log(res);
                    alert('서버에 문제가 생겨 탈퇴하지못했습니다.');
                }
            })
            .catch((err) => console.log(err));
    };
    const savePassword = () => {
        if (
            originalPassword.current.value &&
            newPassword.current.value &&
            newPasswordConfirm.current.value &&
            confirmPwd &&
            confirmNewPwd
        ) {
            if (
                originalPassword.current.value ===
                newPasswordConfirm.current.value
            ) {
                alert('이전 비밀번호와 같습니다.');
                return;
            }
            axios
                .put('/api/oauth/updatepassword', {
                    newPassword: newPassword.current.value,
                })
                .then((res) => {
                    if (res.data.success) {
                        alert('비밀번호가 수정되었습니다.');
                        originalPassword.current.value = '';
                        newPassword.current.value = '';
                        newPasswordConfirm.current.value = '';
                    } else {
                        console.log(res);
                        alert('오류가 발생했습니다.');
                    }
                })
                .catch((err) => {
                    console.log(err);
                });
        } else {
            alert('기입한 정보를 확인해주세요');
        }
    };
    const confirmNewPassword = () => {
        if (newPassword.current.value === newPasswordConfirm.current.value) {
            setConfirmNewPwd(true);
        } else {
            setConfirmNewPwd(false);
        }
    };
    const checkPassword = () => {
        if (!originalPassword.current.value) {
            setConfirmPwd(true);
            return;
        }
        axios
            .post('/api/oauth/confirmpwd', {
                password: originalPassword.current.value,
            })
            .then((res) => {
                console.log(res.data.msg);
                if (res.data.success) {
                    setConfirmPwd(true);
                } else {
                    setConfirmPwd(false);
                }
            });
    };
    return (
        <div id="behindcardContainer">
            <div id="cardHeader">
                <strong>회원 정보</strong>
                <div>
                    <img
                        className="saveInfo"
                        src="/img/save.png"
                        alt="save"
                        onClick={savePassword}
                    />
                </div>
            </div>
            <div id="cardBody">
                <div id="behindleftSide">
                    <img src="/img/mypageImg.png" alt="mypage" />
                    <img src="/img/signpptogether.png" alt="mypage" />
                    <div id="withdrawal" onClick={withdrawal}>
                        서비스 탈퇴
                    </div>
                </div>
                <div id="behindrightSide">
                    {myinfo &&
                        information.map((ele) => {
                            if (ele[1].includes('Password')) {
                                switch (ele[1]) {
                                    case 'originalPassword':
                                        return (
                                            <div className="info">
                                                <span>{ele[0]}</span>
                                                <Input
                                                    className={
                                                        confirmPwd
                                                            ? ''
                                                            : 'falsePwd'
                                                    }
                                                    type="password"
                                                    value={myinfo[ele[1]]}
                                                    ref={originalPassword}
                                                    onBlur={checkPassword}
                                                />
                                                {!confirmPwd && (
                                                    <div
                                                        style={{
                                                            display: 'flex',
                                                            justifyContent:
                                                                'center',
                                                            alignItems:
                                                                'center',
                                                            color: 'tomato',
                                                            fontWeight: 'bold',
                                                        }}
                                                    >
                                                        X
                                                    </div>
                                                )}
                                            </div>
                                        );
                                    case 'newPassword':
                                        return (
                                            <div className="info">
                                                <span>{ele[0]}</span>
                                                <Input
                                                    className={
                                                        confirmNewPwd
                                                            ? ''
                                                            : 'falsePwd'
                                                    }
                                                    type="password"
                                                    value={myinfo[ele[1]]}
                                                    ref={newPassword}
                                                    onChange={
                                                        confirmNewPassword
                                                    }
                                                />
                                                {!confirmNewPwd && (
                                                    <div
                                                        style={{
                                                            display: 'flex',
                                                            justifyContent:
                                                                'center',
                                                            alignItems:
                                                                'center',
                                                            color: 'tomato',
                                                            fontWeight: 'bold',
                                                        }}
                                                    >
                                                        X
                                                    </div>
                                                )}
                                            </div>
                                        );
                                    case 'newPasswordConfirm':
                                        return (
                                            <div className="info">
                                                <span>{ele[0]}</span>
                                                <Input
                                                    className={
                                                        confirmNewPwd
                                                            ? ''
                                                            : 'falsePwd'
                                                    }
                                                    type="password"
                                                    value={myinfo[ele[1]]}
                                                    ref={newPasswordConfirm}
                                                    onChange={
                                                        confirmNewPassword
                                                    }
                                                />

                                                {!confirmNewPwd && (
                                                    <div
                                                        style={{
                                                            display: 'flex',
                                                            justifyContent:
                                                                'center',
                                                            alignItems:
                                                                'center',
                                                            color: 'tomato',
                                                            fontWeight: 'bold',
                                                        }}
                                                    >
                                                        X
                                                    </div>
                                                )}
                                            </div>
                                        );
                                    default:
                                        return <span>없넹</span>;
                                }
                            } else {
                                return (
                                    <div className="info">
                                        <span>{ele[0]}</span>
                                        <span>{myinfo[ele[1]]}</span>
                                    </div>
                                );
                            }
                        })}
                </div>
            </div>
        </div>
    );
};

export default BehindCard;
