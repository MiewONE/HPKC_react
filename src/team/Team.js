import { useSelector, useDispatch } from 'react-redux';
import { useEffect } from 'react';
import { setTeamList as _setTeamList } from '../store/modules/team';
import TeamList from './TeamList';
import axios from 'axios';

function Team() {
    const dispatch = useDispatch();
    const { user, team } = useSelector((state) => state);
    const teamList = team.teamList;

    useEffect(() => {
        axios
            .get('/api/team/teamlist')
            .then((res) => {
                console.log(res.data);
                if (res.data.success) {
                    dispatch(_setTeamList(res.data.msg));
                } else {
                    alert('세션이 만료 되었습니다.');
                    window.location.href = '/';
                    return;
                }
            })
            .catch((err) => {
                alert('서버에서 오류가 발생하였습니다.');
                console.log(err);
                window.location.href = '/';
                return;
            });
    }, []);
    return (
        <>
            {user.name !== '' && (
                <div>
                    <TeamList teamList={teamList} />
                </div>
            )}
        </>
    );
}

export default Team;
