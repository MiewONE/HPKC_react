import React from 'react';

function TeamDelete() {
    return (
        <form action="/team/delete" acceptCharset="UTF-8" method="POST">
            <input type="teamName" placeholder="팀 이름을 입력하세요" />
            <input type="submit" name="commit" value="팀 제거" />
        </form>
    );
}

export default TeamDelete;
