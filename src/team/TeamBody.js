import React from 'react';
import TeamCreate from './TeamCreate';
import TeamDelete from './TeamDelete';
import TeamMemberAdd from './TeamMemberAdd';
import TeamMemberDel from './TeamMemberDel';
const CREATE = 0;
const DELETED = 1;
const PUSH = 2;
const POP = 3;

const TeamBody = ({ curdState, teamList, updateTeam }) => {
    switch (curdState) {
        case CREATE:
            return <TeamCreate teamList={teamList} updateTeam={updateTeam} />;
        case PUSH:
            return (
                <TeamMemberAdd teamList={teamList} updateTeam={updateTeam} />
            );

        case POP:
            return (
                <TeamMemberDel teamList={teamList} updateTeam={updateTeam} />
            );

        case DELETED:
            return <TeamDelete teamList={teamList} updateTeam={updateTeam} />;
        default:
            return (
                <div>
                    <h1>안나오네용</h1>
                </div>
            );
    }
};

export default TeamBody;
