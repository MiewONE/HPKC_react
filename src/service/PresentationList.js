import axios from 'axios';
import { useState, useEffect } from 'react';
import { Route, Link } from 'react-router-dom';
import PresentorDetail from './PresentorDetail';
import { Presentation } from '../styles/PresentationList';
import Modal from 'react-awesome-modal';
function PresentationList({ match }) {
    const { teamname: teamName } = match.params;
    console.log(teamName);
    const [modalVisible, setModalVisible] = useState(false);
    const openModal = () => {
        setModalVisible(true);
    };
    const closeModal = () => {
        setModalVisible(false);
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
    if (attendents < 1) {
        return <h1>발표 내역이 없습니다. 추가 하기겠습니까?</h1>;
    }
    return (
        <>
            {attendents &&
                attendents.map((ele) => {
                    return (
                        <Presentation key={ele._id + 'div'}>
                            <button onClick={openModal}>
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
            <Modal
                visible={modalVisible}
                width="400"
                height="300"
                effect="fadeInUp"
                onClickAway={closeModal}
            >
                <div>
                    <h1>test</h1>
                    <button onClick={closeModal}>모달 닫기</button>
                </div>
            </Modal>
            {/* <Route
                path="/detailpresentation"
                render={() => <PresentorDetail presentor={presentor} />}
            /> */}
        </>
    );
}

export default PresentationList;
