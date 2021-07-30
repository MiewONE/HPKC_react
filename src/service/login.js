import { useRef, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { login } from '../store/modules/user';
import axios from 'axios';
import '../styles/login.scss';
import { LoginMain, ButtonLogin, Input, MainImg } from '../styles/loginStyle';
import storage from '../lib/storage';

function Login() {
    const dispatch = useDispatch();

    const userEmail = useRef();
    const userPwd = useRef();

    const state_login = useSelector((state) => state.user);

    const event_login = () => {
        axios
            .post('/oauth/logins', {
                userEmail: userEmail.current.value,
                password: userPwd.current.value,
            })
            .then((res) => {
                if (!res.data.success) {
                    alert(res.data.msg);
                    return;
                }
                dispatch(login(res.data.msg));
                storage.set('loggedInfo', res.data.msg);
                window.location.href = '/';
            })
            .catch((err) => {
                console.log(err);
                if (err) {
                    alert('로그인에 실패 하였습니다.');
                }
            });
    };

    return (
        <>
            {state_login && (
                <LoginMain>
                    <div className="login">
                        <span>이메일</span>
                        <Input
                            type="text"
                            placeholder="이메일을 입력하세요"
                            ref={userEmail}
                        />
                        <span>비밀번호</span>
                        <Input
                            type="password"
                            placeholder="비밀번호를 입력하세요"
                            ref={userPwd}
                        />
                    </div>
                    <div>
                        <ButtonLogin onClick={event_login}>로그인</ButtonLogin>
                        {/* {<a href="https://accounts.kakao.com/login?continue=https%3A%2F%2Fkauth.kakao.com%2Foauth%2Fauthorize%3Fresponse_type%3Dcode%26redirect_uri%3Dhttp%253A%252F%252Flocalhost%253A3045%252Foauth%252Fkakao%252Fcallbak%26client_id%3D4a80f5bc42cf4ae3a4858a763df852df" >카톡 로그인</a>} */}
                        {
                            <a
                                href="http://localhost:3045/oauth/kakao"
                                className="kakao"
                                title="카카오계정으로 로그인"
                            >
                                카카오계정으로 로그인
                            </a>
                        }
                        <ButtonLogin onClick={event_login}>
                            회원가입
                        </ButtonLogin>
                    </div>
                </LoginMain>
            )}
        </>
    );
}

export default Login;
