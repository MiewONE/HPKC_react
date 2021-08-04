import React, { useRef } from 'react';
import axios from 'axios';
import { useDispatch } from 'react-redux';
import { setPresentationList } from '../store/modules/presentation';
function TeamDelete({ teamList, updateTeam }) {
    console.log('teamdelete');
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
                    .delete('/team/delete', {
                        data: { teamName: teamName.current.value },
                    })
                    .then((res) => {
                        console.log(res);
                        if (res.data.success) {
                            alert('삭제가 완료되었습니다.');
                            updateTeam(
                                teamList.filter(
                                    (ele) =>
                                        ele.teamName !== teamName.current.value
                                )
                            );
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
