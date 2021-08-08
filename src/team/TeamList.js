import { useState } from 'react';

import PresentationList from '../presentation/PresentationList';
import { TeamDivList } from '../styles/teamStyle';
import '../styles/teamlist.scss';
import TeamHeader from './TeamHeader';
function TeamList({ teamList, updateTeam }) {
    const [teamName, setTeamName] = useState('');

    const [teamListState, setteamList] = useState(teamList);
    return (
        <div
            id="teamListContainer"
            style={
                teamName
                    ? {
                          display: 'flex',
                          justifyContent: 'space-evenly',
                          transition: 'all 0.1s',
                      }
                    : {
                          display: 'flex',
                          justifyContent: 'space-between;',
                      }
            }
        >
            {!teamName && (
                <section className="art">
                    <img src="/img/babo_dog.png" alt="art" />
                </section>
            )}
            <div
                className={teamName ? 'openteamList teamlist' : 'none teamlist'}
                style={teamName ? { width: '20%' } : { width: '40%' }}
            >
                <section id="teamlist">
                    {teamListState && teamListState.length < 1 && (
                        <h1>팀이 존재하지 않습니다. 팀을 만들어 보세요!</h1>
                    )}
                    <section>
                        <section>팀명</section>
                        {!teamName && <section>주제</section>}
                        <section>팀 인원</section>
                    </section>
                    {teamListState.length > 0 &&
                        teamListState.map((ele) => {
                            return (
                                <TeamDivList
                                    className={
                                        teamName === ele.teamName
                                            ? 'selected list'
                                            : 'list'
                                    }
                                    key={ele.teamName}
                                    onClick={() => {
                                        setTeamName(
                                            (state) => (state = ele.teamName)
                                        );
                                    }}
                                >
                                    <span
                                        style={
                                            teamName
                                                ? { width: '80%' }
                                                : { width: '33%' }
                                        }
                                    >
                                        {ele.teamName}
                                    </span>
                                    {!teamName && (
                                        <span style={{ width: '33%' }}>
                                            {ele.subject}
                                        </span>
                                    )}
                                    {/* <span>발표 : {ele.ptCnt}개</span> */}
                                    <span
                                        style={
                                            teamName
                                                ? { width: '20%' }
                                                : { width: '33%' }
                                        }
                                    >
                                        {ele.members}명
                                    </span>
                                </TeamDivList>
                            );
                        })}
                </section>
                <section>
                    <TeamHeader updateTeam={updateTeam} teamList={teamList} />
                </section>
            </div>
            {!teamName && (
                <section className="art whale">
                    <img src="/img/whale.png" alt="art" />
                </section>
            )}
            {teamName && (
                <div style={{ width: '70%', height: '100%' }}>
                    <PresentationList
                        teamName={teamName}
                        teamList={teamList}
                        updateTeam={updateTeam}
                    />
                </div>
            )}
        </div>
    );
}

export default TeamList;
