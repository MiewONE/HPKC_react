import React, { useRef } from 'react';
import axios from 'axios';
import { useDispatch, useSelector } from 'react-redux';
import { setPresentationList } from '../store/modules/presentation';
import { setTeamList } from '../store/modules/team';
import { ButtonLogin, Input } from '../styles/loginStyle';
import '../styles/teamDelete.scss';
function TeamDelete({ setTeam }) {
    console.log('teamdelete');
    const { team } = useSelector((state) => state);
    const { teamList } = team;
    const teamName = useRef();
    const dispatch = useDispatch();
    const send = () => {
        if (
            window.confirm(
                '팀  ' + teamName.current.value + '을(를) 삭제하시겠습니까?'
            )
        ) {
            const existTeam = teamList.filter(
                (ele) => ele.teamName === teamName.current.value
            );
            console.log(teamList, teamName.current.value);
            console.log(existTeam);
            if (existTeam.length > 0) {
                axios
                    .delete('/api/team/delete', {
                        data: { teamName: teamName.current.value },
                    })
                    .then((res) => {
                        console.log(res);
                        if (res.data.success) {
                            alert('삭제가 완료되었습니다.');
                            dispatch(
                                setTeamList(
                                    teamList.filter(
                                        (ele) =>
                                            ele.teamName !==
                                            teamName.current.value
                                    )
                                )
                            );
                            setTeam(teamList[0].teamName);
                            // window.location.href = '/team';
                        } else {
                            alert(res.data.msg);
                            dispatch(setPresentationList([]));
                            // window.location.href = '/';
                        }
                    });
            } else {
                alert('존재하지 않는 팀입니다.');
            }
        } else {
            return;
        }
    };
    return (
        <div id="teamDeleteContainer">
            <span>팀 삭제하기</span>
            <Input
                type="text"
                name="teamName"
                placeholder="팀 이름을 입력하세요"
                ref={teamName}
            />
            <ButtonLogin onClick={send}>팀 제거하기</ButtonLogin>
        </div>
    );
}

export default TeamDelete;
