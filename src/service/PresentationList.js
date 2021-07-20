import axios from 'axios';
import { useState, useEffect } from 'react';
import { Route, Link } from 'react-router-dom';
import PresentorDetail from './PresentorDetail';

function PresentationList({ match }) {
    const { teamname: teamName } = match.params;
    console.log(teamName);
    const [attendents, setAttendents] = useState([]);
    const [presentor, setPresentor] = useState({
        _id: '',
        ptName: '',
        attendents: [],
        createdAt: '',
        joined_people: 0,
        resultVote: '',
        Team_id: '',
    });
    useEffect(() => {
        // setAttendents();
        console.log('teamname output', teamName);
        axios
            .post('/pt/ptlist', { teamname: teamName })
            .then((data) => {
                console.log('ptlist call');
                console.log(data.data);
                setAttendents(data.data);
            })
            .catch((err) => {
                console.log(err);
            });
        return () => {};
    }, [teamName]);
    const detailPt = (pt) => {
        // console.log(pt);
        return () => {
            console.log(pt);
            setPresentor(pt);
        };
    };
    return (
        <>
            <ul>
                <span>pt 리스트</span>
                {attendents &&
                    attendents.map((ele) => {
                        return (
                            <li key={ele._id}>
                                <ul key={ele._id + 'ul'}>
                                    <li>
                                        {ele.ptName}
                                        <Link>
                                            <button onClick={detailPt(ele)}>
                                                발표 자세히 보기
                                            </button>
                                        </Link>
                                    </li>
                                    <li>
                                        {ele.attendents.map((sub_ele) => {
                                            return (
                                                <ul key={sub_ele._id}>
                                                    <li>{sub_ele.name}</li>
                                                    <li>{sub_ele.subject}</li>
                                                    <li>{sub_ele.order}</li>
                                                </ul>
                                            );
                                        })}
                                    </li>
                                    <li>{ele.joined_people}</li>
                                </ul>
                            </li>
                        );
                    })}
            </ul>
            <Route
                path="/detailpresentation"
                render={() => <PresentorDetail presentor={presentor} />}
            />
        </>
    );
}

export default PresentationList;
