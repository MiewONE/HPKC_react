import { useRef } from 'react';
import axios from 'axios';
import '../styles/teamCreate.scss';
import { useDispatch, useSelector } from 'react-redux';
import { setTeamList } from '../store/modules/team';
import { ButtonLogin, Input } from '../styles/loginStyle';
function TeamCreate({ closeModal }) {
    const dispatch = useDispatch();
    const { team } = useSelector((state) => state);
    const { teamList } = team;
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
                .post('http://localhost:3045/team/create', {
                    teamName: teamName.current.value,
                    subject: subject.current.value,
                })
                .then((res) => {
                    console.log(res);
                    if (res.data.success) {
                        alert(res.data.msg.teamName + ' 팀이 생성되었습니다.');
                        dispatch(setTeamList([...teamList, res.data.msg]));
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
        <div id="teamCreateContainer">
            <span>팀 만들기</span>
            <Input
                type="text"
                name="teamName"
                placeholder="팀 이름을 입력하세요"
                ref={teamName}
            />
            <Input
                type="text"
                name="subject"
                placeholder="주제를 입력하세요"
                ref={subject}
            />
            <ButtonLogin onClick={send}>팀 생성</ButtonLogin>
        </div>
    );
}

export default TeamCreate;
