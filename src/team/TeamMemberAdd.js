import React from 'react';

function TeamMemberAdd() {
    return (
        <form action="/team/memberappend" acceptCharset="UTF-8" method="POST">
            <input type="teamName" placeholder="팀 이름을 입력하세요" />
            <input
                type="memberEmail"
                placeholder="사용자 이메일을 입력하세요"
            />
            <input type="submit" name="commit" value="팀 생성" />
        </form>
    );
}

export default TeamMemberAdd;
