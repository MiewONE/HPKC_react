import React, { useState, useRef } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import '../styles/newlogin.scss';
import { login } from '../store/modules/user';
import axios from 'axios';
import storage from '../lib/storage';
import {
    SosialLogin,
    LoginMain,
    ButtonLogin,
    Input,
    MainImg,
} from '../styles/loginStyle';

const NewLogin = ({ closeModal, openRegister }) => {
    const dispatch = useDispatch();
    const [saveme, setSaveme] = useState(false);
    const userEmail = useRef();
    const userPwd = useRef();
    const event_login = () => {
        axios
            .post('http://localhost:3045/oauth/logins', {
                userEmail: userEmail.current.value,
                password: userPwd.current.value,
            })
            .then((res) => {
                if (!res.data.success) {
                    alert(res.data.msg);
                    return;
                }
                dispatch(login(res.data.msg));
                if (saveme) storage.remain('loggedInfo', res.data.msg);
                else storage.set('loggedInfo', res.data.msg);
                window.location.href = '/';
            })
            .catch((err) => {
                console.log(err);
                if (err) {
                    alert('로그인에 실패 하였습니다.');
                }
            });
    };
    const save = () => {
        setSaveme((state) => (state = !saveme));
    };
    const kakaoLogin = () => {
        storage.set('kakao', true);
        window.location.href = 'http://localhost:3045/oauth/kakao';
    };
    return (
        <div className="loginBody">
            <section className="xbutton" onClick={closeModal}>
                <SosialLogin></SosialLogin>
            </section>

            <section className="back logo">
                <img
                    src="/img/logopptogether.png"
                    alt="logo"
                    className="logoimg"
                />
            </section>
            <Input
                className="input"
                type="text"
                name="email"
                placeholder="이메일"
                ref={userEmail}
            ></Input>
            <Input
                className="input"
                type="password"
                name="passwod"
                placeholder="비밀번호"
                ref={userPwd}
            ></Input>
            <ButtonLogin className="sosial kakao" onClick={event_login}>
                로그인
            </ButtonLogin>
            <section className="back oauthExplain">
                소셜 계정으로 로그인
            </section>
            <section className="back oauthClick">
                <SosialLogin
                    className="kakao"
                    onClick={kakaoLogin}
                ></SosialLogin>
                {/* <SosialLogin className="google"></SosialLogin>
                <SosialLogin className="facebook"></SosialLogin>
                <SosialLogin className="naver"></SosialLogin> */}
            </section>
            <section className="back checkLoginRemain">
                <label>
                    <input type="checkbox" name="saveme" onClick={save} />
                    로그인 상태 유지하기
                </label>
            </section>
            <section className="back forgotPw">비밀번호 찾기</section>
            <section className="back register">
                회원이 아니시라면?{' '}
                <span
                    style={{
                        cursor: 'pointer',
                        color: '#557E57',
                        borderBottom: '1px solid #557E57',
                    }}
                    onClick={openRegister}
                >
                    회원가입
                </span>
            </section>
        </div>
    );
};

export default NewLogin;
