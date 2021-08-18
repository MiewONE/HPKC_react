import React from 'react';
import '../styles/mypage.scss';
const Mypage = () => {
    const information = [
        '이름',
        '제공자',
        '이메일',
        '비밀번호',
        '비밀번호 확인',
        '초대 리스트',
        '최근 변경일',
        '추천 게시판 리스트',
    ];

    return (
        <div id="mypage">
            {information.map((ele) => {
                return (
                    <div className="info">
                        <span>{ele}</span>
                        <span>이름임</span>
                    </div>
                );
            })}
        </div>
    );
};

export default Mypage;
