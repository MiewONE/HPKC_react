import React, { useState, useEffect } from 'react';
import axios from 'axios';
import '../styles/mypage.scss';
import InfoCard from './InfoCard';
import BehindCard from './BehindCard';
const Mypage = () => {
    const information = [
        ['이름', 'name'],
        ['제공자', 'provider'],
        ['이메일', 'email'],
        ['기존 비밀번호', 'originalPassword'],
        ['새 비밀번호', 'newPassword'],
        ['새 비밀번호 확인', 'newPasswordConfirm'],
        // ['초대 리스트', 'recommendationList'],
        // ['추천 게시판 리스트', 'invitation'],
        ['최근 변경일', 'lastModified'],
    ];
    const [myinfo, setMyinfo] = useState();
    const [checkInfo, setCheckInfo] = useState(false);
    const confirmCheck = (data) => {
        setCheckInfo(data);
    };
    useEffect(() => {
        axios.get('/api/oauth/mypage').then((res) => {
            if (res.data.success) {
                setMyinfo(res.data.msg);
            } else {
                alert('데이터를 읽어 오는데 실패하였습니다.');
            }
        });
    }, []);
    return (
        <div id="mypage">
            {!checkInfo && myinfo && (
                <InfoCard name={myinfo.name} confirmCheck={confirmCheck} />
            )}
            {checkInfo && (
                <BehindCard myinfo={myinfo} information={information} />
            )}
        </div>
    );
};

export default Mypage;
