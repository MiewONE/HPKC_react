import { useState } from 'react';
import PresentationList from '../presentation/PresentationList';
import { TeamDivList } from '../styles/teamStyle';
import '../styles/teamlist.css';
function TeamList({ teamList, updateTeam }) {
    const [teamName, setTeamName] = useState('');
    return (
        <div
            style={
                teamName
                    ? {
                          display: 'flex',
                          justifyContent: 'space-evenly',
                          transition: 'all 0.1s',
                      }
                    : {
                          display: 'flex',
                          justifyContent: 'center',
                      }
            }
        >
            <div
                className={teamName ? 'openteamList' : 'none'}
                style={teamName ? { width: '20%' } : { width: '40%' }}
            >
                {teamList && teamList.length < 1 && (
                    <h1>팀이 존재하지 않습니다. 팀을 만들어 보세요!</h1>
                )}
                {teamList.length > 0 &&
                    teamList.map((ele) => {
                        return (
                            <TeamDivList className="list" key={ele.teamName}>
                                <button
                                    onClick={() => {
                                        setTeamName(
                                            (state) => (state = ele.teamName)
                                        );
                                    }}
                                >
                                    {ele.teamName}
                                </button>
                                <span>발표 : {ele.ptCnt}개</span>
                                <span>멤버수:{ele.members}명</span>
                            </TeamDivList>
                        );
                    })}
            </div>
            <div
                style={
                    teamName
                        ? { width: '70%', height: '100%' }
                        : { width: '0px' }
                }
            >
                {teamName && (
                    <PresentationList
                        teamName={teamName}
                        teamList={teamList}
                        updateTeam={updateTeam}
                    />
                )}
            </div>
        </div>
    );
}

export default TeamList;
