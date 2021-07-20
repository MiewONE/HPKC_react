import { Link, Route } from 'react-router-dom';
import TeamCreate from './TeamCreate';
import TeamDelete from './TeamDelete';
import TeamList from './TeamList';
import TeamMemberAdd from './TeamMemberAdd';
import TeamMemberDel from './TeamMemberDel';

function Team() {
    return (
        <div>
            <ul>
                <li>
                    <Link to="/team/list">팀 리스트 보기</Link>
                </li>
                <li>
                    <Link to="/team/create">팀 만들기</Link>
                </li>
                <li>
                    <Link to="/team/delete">팀 삭제하기</Link>
                </li>
                <li>
                    <Link to="/team/member-add">팀 멤버 추가</Link>
                </li>
                <li>
                    <Link to="/team/member-delete">팀 멤버 제거</Link>
                </li>
            </ul>
            <Route path="/team/list" component={TeamList} />
            <Route path="/team/create" component={TeamCreate} />
            <Route path="/team/delete" component={TeamDelete} />
            <Route path="/team/member-add" component={TeamMemberAdd} />
            <Route path="/team/member-delete" component={TeamMemberDel} />
        </div>
    );
}

export default Team;
