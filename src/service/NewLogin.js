import React from 'react';
import '../styles/newlogin.scss';
import {
    SosialLogin,
    LoginMain,
    ButtonLogin,
    Input,
    MainImg,
} from '../styles/loginStyle';

const NewLogin = ({ closeModal }) => {
    return (
        <div className="loginBody">
            <div className="back close">X</div>
            <img src="/img/pptogether.png" alt="logo" />
            <div className="back logo">
                <span>안녕하세요</span>
            </div>
            <Input
                className="input"
                type="text"
                name="email"
                placeholder="이메일"
            ></Input>
            <Input
                className="input"
                type="password"
                name="passwod"
                placeholder="비밀번호"
            ></Input>
            <ButtonLogin className="sosial kakao">로그인</ButtonLogin>
            <div className="back oauthExplain">
                소셜 계정으로 간편하게 로그인하세요!
            </div>
            <div className="back oauthClick">
                <SosialLogin>카</SosialLogin>
                <SosialLogin>구</SosialLogin>
                <SosialLogin>페</SosialLogin>
                <SosialLogin>네</SosialLogin>
            </div>
            <div className="back checkLoginRemain">1237</div>
            <div className="back forgotPw">1237</div>
            <div className="back register">1237</div>
        </div>
    );
};

export default NewLogin;
