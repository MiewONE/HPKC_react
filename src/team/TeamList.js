import { useState, useEffect } from 'react';
import axios from 'axios';
import { Route, Link } from 'react-router-dom';
import PresentationList from '../presentation/PresentationList';
import { TeamDivList } from '../styles/teamStyle';
function TeamList() {
    const [teamList, setTeamList] = useState();

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
                                <span>발표 : {ele.ptCnt}개</span>
                                <span>멤버수:{ele.members}명</span>
                            </TeamDivList>
                        );
                    })}
            </div>
            <div style={{ width: '50%' }}>
                <Route
                    path="/team/list/:teamName"
                    component={PresentationList}
                />
            </div>
        </div>
    );
}

export default TeamList;
