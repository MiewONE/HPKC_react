import React from 'react';
import TeamCreate from './TeamCreate';
import TeamDelete from './TeamDelete';
import TeamMemberAdd from './TeamMemberAdd';
import TeamMemberDel from './TeamMemberDel';
const CREATE = 0;
const DELETED = 1;
const PUSH = 2;
const POP = 3;

const TeamBody = ({ curdState, teamList, closeModal, setTeam }) => {
    switch (curdState) {
        case CREATE:
            return <TeamCreate teamList={teamList} closeModal={closeModal} />;
        case PUSH:
            return (
                <TeamMemberAdd teamList={teamList} closeModal={closeModal} />
            );

        case POP:
            return <TeamMemberDel teamList={teamList} />;

        case DELETED:
            return <TeamDelete teamList={teamList} setTeam={setTeam} />;
        default:
            return (
                <div>
                    <h1>안나오네용</h1>
                </div>
            );
    }
};

export default TeamBody;
