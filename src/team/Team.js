import { useSelector, useDispatch } from 'react-redux';
import { useEffect } from 'react';
import { setTeamList as _setTeamList } from '../store/modules/team';
import TeamList from './TeamList';
import axios from 'axios';
import TeamHeader from './TeamHeader';

function Team({ history }) {
    const dispatch = useDispatch();
    const { user, team } = useSelector((state) => state);
    const teamList = team.teamList;
    const updateTeam = (data) => {
        console.log(data);
        dispatch(_setTeamList(data));
    };

    useEffect(() => {
        axios
            .get('/team/teamlist')
            .then((res) => {
                console.log(res.data);
                if (res.data.success) {
                    // setTeamList((state) => (state = res.data.msg));
                    // dispatch(_setTeamList(res.data.msg));
                    updateTeam(res.data.msg);
                } else {
                    alert('서버에서 오류가 발생하였습니다.');
                    // window.location.href = '/';
                    return;
                }
            })
            .catch((err) => {
                alert('서버에서 오류가 발생하였습니다.');
                console.log(err);
                // window.location.href = '/';
                return;
            });
    }, []);
    return (
        <>
            {user.name !== '' && (
                <div>
                    <TeamHeader updateTeam={updateTeam} teamList={teamList} />

                    <TeamList teamList={teamList} updateTeam={updateTeam} />
                </div>
            )}
        </>
    );
}

export default Team;
