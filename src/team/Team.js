import { Link, Route } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { useEffect, useState } from 'react';
import TeamCreate from './TeamCreate';
import TeamDelete from './TeamDelete';
import TeamList from './TeamList';
import TeamMemberAdd from './TeamMemberAdd';
import TeamMemberDel from './TeamMemberDel';
import { TeamDiv } from '../styles/teamStyle';
import axios from 'axios';

function Team({ history }) {
    const state_login = useSelector((state) => state);
    const [teamList, setTeamList] = useState();
    const updateTeam = (data) => {
        setTeamList(data);
    };
    useEffect(() => {
        console.log('teamList request');
        axios
            .get('/team/teamlist')
            .then((res) => {
                console.log(res);
                if (res.data.success) {
                    setTeamList(res.data.msg);
                } else {
                    alert('서버에서 오류가 발생하였습니다.');
                    window.location.href = '/';
                    return;
                }
            })
            .catch((err) => {
                console.log(err);
                alert('서버에서 오류가 발생하였습니다.');
                window.location.href = '/';
                return;
            });
    }, []);
    console.log(state_login);
    return (
        <>
            {state_login.user.name !== '' && (
                <div>
                    <TeamDiv>
                        <Link to="/team/create">팀 만들기</Link>
                        <Link to="/team/delete">팀 삭제하기</Link>
                        <Link to="/team/member-add">팀 멤버 추가</Link>
                        <Link to="/team/member-delete">팀 멤버 제거</Link>
                    </TeamDiv>
                    {/* <Route path="/team/list" component={TeamList} /> */}
                    <Route
                        path="/team/create"
                        render={() => <TeamCreate updateTeam={updateTeam} />}
                    />
                    <Route
                        path="/team/delete"
                        render={() => (
                            <TeamDelete
                                updateTeam={updateTeam}
                                teamList={teamList}
                            />
                        )}
                    />
                    <Route path="/team/member-add" component={TeamMemberAdd} />
                    <Route
                        path="/team/member-delete"
                        component={TeamMemberDel}
                    />
                    <TeamList teamList={teamList} updateTeam={updateTeam} />
                </div>
            )}
        </>
    );
}

export default Team;
