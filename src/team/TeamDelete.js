import React, { useRef } from 'react';
import axios from 'axios';
function TeamDelete({ teamList, updateTeam }) {
    const teamName = useRef();
    const send = () => {
        const existTeam = teamList.filter(
            (ele) => ele.teamName === teamName.current.value
        );
        console.log(teamList, teamName.current.value);
        console.log(existTeam);
        if (existTeam.length > 0) {
            axios
                .delete('/team/delete', { teamName: teamName.current.value })
                .then((res) => {
                    console.log(res);
                    if (res.data.success) {
                        updateTeam(
                            teamList.filter(
                                (ele) => ele.teamName !== teamName.current.value
                            )
                        );
                    } else {
                        alert('삭제에 실패하였습니다.');
                        // window.location.href = '/';
                    }
                });
        } else {
            alert('존재하지 않는 팀입니다.');
        }
    };
    return (
        <div>
            <input
                type="text"
                name="teamName"
                placeholder="팀 이름을 입력하세요"
                ref={teamName}
            />
            <button onClick={send}>팀 제거하기</button>
        </div>
    );
}

export default TeamDelete;
