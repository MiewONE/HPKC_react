import axios from 'axios';
import { useState, useEffect } from 'react';
import { Route, Link } from 'react-router-dom';
import PresentorDetail from './PresentorDetail';
import { Presentation } from '../styles/PresentationList';
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
            {attendents &&
                attendents.map((ele) => {
                    return (
                        <Presentation key={ele._id + 'div'}>
                            <span>{ele.ptName}</span>
                            <div style={{ display: 'flex' }}>
                                <span>멤버 이름 :</span>
                                {ele.attendents.map((sub_ele) => {
                                    return (
                                        <div key={sub_ele._id}>
                                            {sub_ele.name}
                                        </div>
                                    );
                                })}
                            </div>
                            <div>{ele.joined_people}</div>
                        </Presentation>
                    );
                })}
            <Route
                path="/detailpresentation"
                render={() => <PresentorDetail presentor={presentor} />}
            />
        </>
    );
}

export default PresentationList;
