import { Link, Route } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { useEffect } from 'react';
import TeamCreate from './TeamCreate';
import TeamDelete from './TeamDelete';
import TeamList from './TeamList';
import TeamMemberAdd from './TeamMemberAdd';
import TeamMemberDel from './TeamMemberDel';
import { TeamDiv } from '../styles/teamStyle';

function Team({ history }) {
    const state_login = useSelector((state) => state.user);
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
                    <Route path="/team/create" component={TeamCreate} />
                    <Route path="/team/delete" component={TeamDelete} />
                    <Route path="/team/member-add" component={TeamMemberAdd} />
                    <Route
                        path="/team/member-delete"
                        component={TeamMemberDel}
                    />
                    <TeamList />
                </div>
            )}
        </>
    );
}

export default Team;
