import React, { useRef } from 'react';
import axios from 'axios';

function TeamMemberDel({ teamList, updateTeam }) {
    const teamName = useRef();
    const member = useRef();
    const send = () => {
        const existTeam = teamList.filter(
            (ele) => ele.teamName === teamName.current.value
        );
        console.log(teamList, teamName.current.value);
        console.log(existTeam);
        if (existTeam.length > 0) {
            axios
                .put('/team/memberremove', {
                    teamName: teamName.current.value,
                    memberEmail: member.current.value,
                })
                .then((res) => {
                    console.log(res);
                    if (res.data.success) {
                        const remainTeam = teamList.filter(
                            (ele) => ele.teamName !== teamName.current.value
                        );
                        updateTeam([...remainTeam, res.data.msg]);
                    } else {
                        alert('요청에 실패하였습니다.' + res.data.msg);
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
            <input
                type="text"
                name="memberEmail"
                placeholder="사용자 이메일을 입력하세요"
                ref={member}
            />
            <input
                type="submit"
                name="commit"
                value="팀 멤버 제거"
                onClick={send}
            />
        </div>
    );
}

export default TeamMemberDel;
