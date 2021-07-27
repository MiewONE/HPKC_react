import React from 'react';

function TeamMemberDel() {
    return (
        <form action="/team/memberremove" acceptCharset="UTF-8" method="POST">
            <input
                type="text"
                name="teamName"
                placeholder="팀 이름을 입력하세요"
            />
            <input
                type="text"
                name="memberEmail"
                placeholder="멤버의 이메일을 입력하세요"
            />
            <input type="submit" name="commit" value="팀 생성" />
        </form>
    );
}

export default TeamMemberDel;
