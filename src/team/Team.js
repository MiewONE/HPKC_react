import { Link, Route, Switch } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { useEffect, useState } from 'react';
import TeamList from './TeamList';
import axios from 'axios';
import TeamHeader from './TeamHeader';

function Team({ history }) {
    const state_login = useSelector((state) => state);
    const [teamList, setTeamList] = useState();
    const updateTeam = (data) => {
        setTeamList((setData) => (setData = data));
    };

    useEffect(() => {
        axios
            .get('/team/teamlist')
            .then((res) => {
                console.log(res.data);
                if (res.data.success) {
                    setTeamList((state) => (state = res.data.msg));
                } else {
                    alert('서버에서 오류가 발생하였습니다.');
                    window.location.href = '/';
                    return;
                }
            })
            .catch((err) => {
                alert('서버에서 오류가 발생하였습니다.');
                window.location.href = '/';
                return;
            });
    }, []);
    return (
        <>
            {state_login.user.name !== '' && (
                <div>
                    <TeamHeader updateTeam={updateTeam} teamList={teamList} />

                    <TeamList teamList={teamList} updateTeam={updateTeam} />
                </div>
            )}
        </>
    );
}

export default Team;
