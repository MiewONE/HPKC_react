import axios from 'axios';
import { useState, useEffect } from 'react';
import { Route, Link } from 'react-router-dom';
import PresentorDetail from './PresentorDetail';
import { Presentation } from '../styles/PresentationList';
import Modal from '../components/Modal';
function PresentationList({ match }) {
    const { teamname: teamName } = match.params;
    console.log(teamName);
    const [modalOpen, setModalOpen] = useState(false);

    const openModal = () => {
        setModalOpen(true);
    };
    const closeModal = () => {
        setModalOpen(false);
    };
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
        return () => {
            console.log(pt, '이 클릭되었습니다.');
        };
    };

    return (
        <>
            {attendents &&
                attendents.map((ele) => {
                    return (
                        <Presentation key={ele._id + 'div'}>
                            <Modal
                                open={modalOpen}
                                close={closeModal}
                                header="Modal heading"
                            >
                                <main> test </main>에 내용이 입력된다. 리액트
                                함수형 모달 팝업창입니다. 쉽게 만들 수 있어요.
                                같이 만들어봐요!
                            </Modal>
                            <button onClick={detailPt(ele.ptName)}>
                                <span>{ele.ptName}</span>
                            </button>
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
            {/* <Route
                path="/detailpresentation"
                render={() => <PresentorDetail presentor={presentor} />}
            /> */}
        </>
    );
}

export default PresentationList;
