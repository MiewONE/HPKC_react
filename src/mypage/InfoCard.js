import React, { useRef } from 'react';
import '../styles/infoCard.scss';
import { ButtonLogin, Input } from '../styles/loginStyle';
import axios from 'axios';
const InfoCard = ({ name, confirmCheck }) => {
    const pwdCheck = useRef();
    const confirmInfo = () => {
        axios
            .post('/api/oauth/confirmpwd', {
                password: pwdCheck.current.value,
            })
            .then((res) => {
                console.log(res.data.msg);
                if (res.data.success) {
                    confirmCheck(true);
                } else {
                    confirmCheck(false);
                    alert('비밀번호가 다릅니다.');
                    pwdCheck.current.value = '';
                }
            });
    };
    return (
        <div id="cardContainer">
            <div id="leftSide">
                <span>회 원 증</span>
                <section>
                    <img src="/img/mypageImg.png" alt="mypage" />
                </section>
                <section>
                    <span>{name}</span>
                </section>
                <section>
                    <Input
                        ref={pwdCheck}
                        type="password"
                        placeholder="비밀번호를 입력하세요"
                    />
                </section>
                <section>
                    <ButtonLogin onClick={confirmInfo}>확인</ButtonLogin>
                </section>
            </div>
            <div id="rightSide">
                <span>PPTogether</span>
            </div>
        </div>
    );
};

export default InfoCard;
