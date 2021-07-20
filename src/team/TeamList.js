import { useState, useEffect } from 'react';
import { useDispatch } from 'react-redux';
import axios from 'axios';
import { Route, Link } from 'react-router-dom';
import PresentationList from '../service/PresentationList';
import TestPage from './TestPage';
import { logout } from '../store/modules/user';
import { TeamDivList } from '../styles/teamStyle';
function TeamList() {
    const [teamList, setTeamList] = useState();
    const [state_teamName, setTeamName] = useState('');
    const dispatch = useDispatch();
    useEffect(() => {
        console.log('teamList request');
        axios
            .get('/team/teamlist')
            .then((data) => {
                console.log(data.data);
                setTeamList(data.data);
            })
            .catch((err) => {
                alert('서버에서 오류가 발생하였습니다.');
            });
    }, []);
    const ptClick = (teamName) => {
        return () => {
            console.log(teamName, '클릭');
            setTeamName(teamName);
        };
    };
    return (
        <div style={{ display: 'flex' }}>
            <div style={{ width: '50%' }}>
                {teamList && teamList.length < 1 && (
                    <h1>팀이 존재하지 않습니다. 팀을 만들어 보세요!</h1>
                )}
                {teamList &&
                    teamList.map((ele) => {
                        return (
                            <TeamDivList className="list" key={ele.teamName}>
                                <Link to={'/team/list/' + ele.teamName}>
                                    {ele.teamName}
                                </Link>
                                <span>멤버수:{ele.members}명</span>
                            </TeamDivList>
                        );
                    })}
            </div>
            <div style={{ width: '50%' }}>
                <Route
                    path="/team/list/:teamname"
                    component={PresentationList}
                />
            </div>
        </div>
    );
}

export default TeamList;
