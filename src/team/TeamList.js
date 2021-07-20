import { useState, useEffect } from 'react';
import { useDispatch } from 'react-redux';
import axios from 'axios';
import { Route, Link } from 'react-router-dom';
import PresentationList from '../service/PresentationList';
import TestPage from './TestPage';
import { logout } from '../store/modules/user';

function TeamList() {
    const [teamList, setTeamList] = useState();
    const [state_teamName, setTeamName] = useState('');
    const dispatch = useDispatch();
    useEffect(() => {
        console.log('teamList request');
        axios
            .get('/team/teamlist')
            .then((data) => {
                console.log(data);
                setTeamList(data.data);
            })
            .catch((err) => {
                dispatch(logout());
            });
    }, []);
    const ptClick = (teamName) => {
        return () => {
            console.log(teamName, '클릭');
            setTeamName(teamName);
        };
    };
    return (
        <>
            <ul>
                {teamList &&
                    teamList.map((ele) => {
                        return (
                            <li key={ele}>
                                <Link to={'/team/list/' + ele}>
                                    <button>{ele}의 발표 리스트 보기</button>
                                </Link>
                            </li>
                        );
                    })}
            </ul>
            <Route path="/team/list/:teamname" component={PresentationList} />
        </>
    );
}

export default TeamList;
