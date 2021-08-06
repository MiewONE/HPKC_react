import { useRef } from 'react';
import axios from 'axios';
import '../styles/teamCreate.scss';

function TeamCreate({ teamList, updateTeam, closeModal }) {
    console.log('teamcreate', teamList);
    const teamName = useRef();
    const subject = useRef();
    if (!teamList) return <h1></h1>;
    const send = () => {
        const existTeam = teamList.filter(
            (ele) => ele.teamName === teamName.current.value
        );
        console.log(teamList, teamName.current.value);
        console.log(existTeam);
        if (existTeam.length === 0) {
            axios
                .post('/team/create', {
                    teamName: teamName.current.value,
                    subject: subject.current.value,
                })
                .then((res) => {
                    console.log(res);
                    if (res.data.success) {
                        alert(res.data.msg.teamName + ' 팀이 생성되었습니다.');
                        updateTeam([...teamList, res.data.msg]);
                    } else {
                        alert('생성에 실패하였습니다.');
                        // window.location.href = '/';
                    }
                });
        } else {
            alert('존재하는 팀입니다.');
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
                name="subject"
                placeholder="주제를 입력하세요"
                ref={subject}
            />
            <button onClick={send}>팀 생성</button>
        </div>
    );
}

export default TeamCreate;
