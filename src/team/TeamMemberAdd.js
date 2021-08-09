import React, { useRef } from 'react';
import axios from 'axios';
import { setTeamList } from '../store/modules/team';
import { useSelector, useDispatch } from 'react-redux';
import '../styles/teamCreate.scss';
import { ButtonLogin, Input } from '../styles/loginStyle';

function TeamMemberAdd() {
    const dispatch = useDispatch();
    const teamName = useRef();
    const member = useRef();
    const { team } = useSelector((state) => state);
    const { teamList } = team;
    const send = () => {
        const existTeam = teamList.filter(
            (ele) => ele.teamName === teamName.current.value
        );
        console.log(teamList, teamName.current.value);
        console.log(existTeam);
        if (existTeam.length > 0) {
            axios
                .post('/team/memberappend', {
                    teamName: teamName.current.value,
                    memberEmail: member.current.value,
                })
                .then((res) => {
                    console.log(res);
                    if (res.data.success) {
                        const remainTeam = teamList.filter(
                            (ele) => ele.teamName !== teamName.current.value
                        );
                        dispatch(setTeamList([...remainTeam, res.data.msg]));
                        alert(member.current.value + '이 추가되었습니다.');
                    } else {
                        alert(res.data.msg + ' 요청에 실패하였습니다.');
                        // window.location.href = '/';
                    }
                    member.current.value = '';
                });
        } else {
            alert('존재하지 않는 팀입니다.');
        }
    };
    return (
        <div id="teamCreateContainer">
            <span>팀 멤버 추가</span>
            <Input
                type="text"
                name="teamName"
                placeholder="팀 이름을 입력하세요"
                ref={teamName}
            />
            <Input
                type="text"
                name="memberEmail"
                placeholder="사용자 이메일을 입력하세요"
                ref={member}
            />
            <ButtonLogin onClick={send}>팀 멤버 추가</ButtonLogin>
        </div>
    );
}

export default TeamMemberAdd;
