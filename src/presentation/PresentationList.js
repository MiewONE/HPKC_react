import axios from 'axios';
import { useState, useEffect } from 'react';
import PresenterDetail from '../presentation/PresenterDetail';
import { Presentation } from '../styles/PresentationList';
import Modal from 'react-awesome-modal';
function PresentationList({ match }) {
    const { teamName: teamName } = match.params;
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
            .post('/pt/ptlist', { teamName: teamName })
            .then((data) => {
                setAttendents(data.data);
                setpresenter({
                    _id: '',
                    ptName: '',
                    attendents: [],
                    createdAt: '',
                    joined_people: 0,
                    resultVote: '',
                });
            })
            .catch((err) => {
                console.log(err);
            });
    }, [teamName]);
    const updatePresenter = (update) => {
        const attendenta = presenter.attendents.map((ele) => {
            if (ele.name === update.name) return update;
            else return ele;
        });
        setpresenter({ ...presenter, attendents: attendenta });
    };
    const openModal = (pt) => {
        return () => {
            if (pt.ptName !== presenter.ptName) {
                setpresenter({
                    _id: pt._id,
                    ptName: pt.ptName,
                    attendents: pt.attendents,
                    createdAt: pt.createdAt,
                    joined_people: pt.joined_people,
                    resultVote: pt.resultVote,
                });
            }
            setModalVisible(true);
        };
    };
    const closeModal = () => {
        console.log(teamName);
        axios
            .post('/pt/ptlist', { teamName: teamName })
            .then((data) => {
                setAttendents(data.data);
                setpresenter({
                    _id: '',
                    ptName: '',
                    attendents: [],
                    createdAt: '',
                    joined_people: 0,
                    resultVote: '',
                });
            })
            .catch((err) => {
                console.log(err);
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
                                <span>발표 순서 :</span>
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
                        {console.log('모달 열때 presenter', presenter)}
                        <PresenterDetail
                            teamName={teamName}
                            presenter={presenter}
                            updatePresenter={updatePresenter}
                        />
                        <button onClick={closeModal}>모달 닫기</button>
                    </div>
                </Modal>
            )}
        </>
    );
}

export default PresentationList;
