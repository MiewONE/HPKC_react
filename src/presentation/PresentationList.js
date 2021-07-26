import axios from 'axios';
import { useState, useEffect } from 'react';
import { Route, Link } from 'react-router-dom';
import PresenterDetail from '../presentation/PresenterDetail';
import { Presentation } from '../styles/PresentationList';
import Modal from 'react-awesome-modal';
function PresentationList({ match }) {
    const { teamname: teamName } = match.params;
    console.log(teamName);
    const [modalVisible, setModalVisible] = useState(false);

    const [attendents, setAttendents] = useState([]);
    const [presenter, setpresenter] = useState({
        _id: '',
        ptName: '',
        attendents: [],
        createdAt: '',
        joined_people: 0,
        resultVote: '',
    });
    useEffect(() => {
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
    const openModal = (pt) => {
        return () => {
            setpresenter(pt);
            setModalVisible(true);
        };
    };
    const closeModal = () => {
        setpresenter({
            _id: '',
            ptName: '',
            attendents: [],
            createdAt: '',
            joined_people: 0,
            resultVote: '',
        });
        setModalVisible(false);
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
                            <button onClick={openModal(ele)}>
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
            {presenter._id !== '' && (
                <Modal
                    visible={modalVisible}
                    width="1000"
                    height="600"
                    effect="fadeInUp"
                    onClickAway={closeModal}
                >
                    <div>
                        <PresenterDetail
                            teamname={teamName}
                            presenter={presenter}
                        />
                        <button onClick={closeModal}>모달 닫기</button>
                    </div>
                </Modal>
            )}
            {/* <Route
                path="/detailpresentation"
                render={() => <presenterDetail presenter={presenter} />}
            /> */}
        </>
    );
}

export default PresentationList;
