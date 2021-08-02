import React, { useRef } from 'react';
import axios from 'axios';
import '../styles/newlogin.scss';
import storage from '../lib/storage';
import { SosialLogin, ButtonLogin, Input } from '../styles/loginStyle';
const Register = ({ closeModal }) => {
    const userName = useRef();
    const userEmail = useRef();
    const userPwd = useRef();
    const event_login = () => {
        axios
            .post('/oauth/register', {
                userName: userName.current.value,
                userEmail: userEmail.current.value,
                password: userPwd.current.value,
            })
            .then((res) => {
                if (!res.data.success) {
                    alert(res.data.msg);
                    return;
                }
                alert('회원가입이 완료되었습니다.');
                window.location.href = '/';
            })
            .catch((err) => {
                console.log(err);
                if (err) {
                    alert('로그인에 실패 하였습니다.');
                }
            });
    };
    const kakaoLogin = () => {
        storage.set('kakao', true);
        window.location.href = 'http://localhost:3045/oauth/kakao';
    };
    return (
        <div className="loginBody">
            <div className="xbutton" onClick={closeModal}>
                <SosialLogin></SosialLogin>
            </div>

            <div className="back logo">
                <img
                    src="/img/logopptogether.png"
                    alt="logo"
                    className="logoimg"
                />
            </div>
            <Input
                className="input"
                type="text"
                name="name"
                placeholder="이름"
                ref={userName}
            ></Input>
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
                회원 가입
            </ButtonLogin>
            <div className="back oauthExplain">소셜 계정으로 가입</div>
            <div className="back oauthClick">
                <SosialLogin
                    className="kakao"
                    onClick={kakaoLogin}
                ></SosialLogin>
                {/* <SosialLogin className="google"></SosialLogin>
                <SosialLogin className="facebook"></SosialLogin>
                <SosialLogin className="naver"></SosialLogin> */}
            </div>
            <div className="back forgotPw">비밀번호 찾기</div>
        </div>
    );
};

export default Register;
