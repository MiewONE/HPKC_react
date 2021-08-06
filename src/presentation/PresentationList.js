import axios from 'axios';
import { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import {
    setPresentationList,
    setPresenter,
    setOrder,
} from '../store/modules/presentation';
import PresenterDetail from '../presentation/PresenterDetail';
import { Presentation } from '../styles/PresentationList';
import Modal from 'react-awesome-modal';
import PresentationHeader from './PresentationHeader';
import '../styles/presentationList.css';
function PresentationList({ teamName, teamList, updateTeam }) {
    const dispatch = useDispatch();
    const [modalVisible, setModalVisible] = useState(false);
    const { presentation } = useSelector((state) => state);
    const { ptList, presenter, order } = presentation;

    useEffect(() => {
        axios
            .post('/pt/ptlist', { teamName: teamName })
            .then((res) => {
                if (res.data.success) {
                    console.log('ptlist 업데이트');
                    updateState(res.data.msg);
                } else {
                    alert(res.data.msg);
                    window.location.href = '/';
                }
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
        dispatch(setPresenter({ ...presenter, attendents: attendenta }));
    };
    const updateState = (data) => {
        dispatch(setPresentationList(data));
        dispatch(
            setPresenter({
                _id: '',
                ptName: '',
                attendents: [],
                createdAt: '',
                joined_people: 0,
                resultVote: '',
            })
        );
    };
    const getPtList = () => {
        axios
            .post('/pt/ptlist', { teamName: teamName })
            .then((res) => {
                if (res.data.success) {
                    updateState(res.data.msg);
                } else {
                    alert(res.data.msg);
                    window.location.href = '/';
                }
            })
            .catch((err) => {
                console.log(err);
            });
    };
    const updatePtList = () => {
        getPtList();
        updateTeam(
            teamList.map((ele) => {
                if (ele.teamName === teamName) {
                    return {
                        ...ele,
                        ptCnt: ele.ptCnt + 1,
                    };
                } else {
                    return ele;
                }
            })
        );
    };
    const openModal = (pt) => {
        return () => {
            console.log(
                '>>> PresentationList에서 PresentationDetail열면서 presenter과 order설정'
            );
            console.log(order, '<<<<< Order값 출력');
            console.log(presenter, '<<<<< Presenter값 출력');
            if (pt.ptName !== presenter.ptName) {
                dispatch(setOrder(0));
                dispatch(
                    setPresenter({
                        _id: pt._id,
                        ptName: pt.ptName,
                        attendents: pt.attendents,
                        createdAt: pt.createdAt,
                        joined_people: pt.joined_people,
                        resultVote: pt.resultVote,
                    })
                );
            }
            console.log(presenter, ' <<<< order 값 지정 후 출력');
            console.log(presenter, ' <<<< Presenter 값 지정 후 출력');
            setModalVisible((state) => (state = true));
        };
    };
    const closeModal = () => {
        getPtList();
        setModalVisible((state) => (state = false));
    };

    return (
        <div>
            <div className="ptHeader">
                <PresentationHeader
                    teamName={teamName}
                    updatePtList={updatePtList}
                />
            </div>
            {ptList.length < 1 && (
                <h1>발표 내역이 없습니다. 추가 하시겠습니까?</h1>
            )}
            {ptList.length > 1 && (
                <div>
                    <span>총 갯수 :{ptList.length}</span>
                    <div
                        style={{
                            display: 'flex',
                            justifyContent: 'space-around',
                        }}
                    >
                        <div>발표명</div>
                        <div>참석자 수</div>
                        <div>첫번째 발표자</div>
                        <div>만든 날짜</div>
                    </div>
                </div>
            )}
            {ptList.length > 0 &&
                ptList.map((ele, idx) => {
                    return (
                        <Presentation key={idx}>
                            <div
                                style={{
                                    display: 'flex',
                                    justifyContent: 'space-around',
                                }}
                            >
                                <button onClick={openModal(ele)}>
                                    <span>{ele.ptName}</span>
                                </button>
                            </div>
                            <div>{ele.joined_people}</div>
                            <div>{ele.attendents[0].name}</div>
                            <div>{ele.createdAt}</div>
                        </Presentation>
                    );
                })}
            {presenter._id !== '' && (
                <Modal
                    visible={modalVisible}
                    width="1000"
                    height="800"
                    effect="fadeInUp"
                    onClickAway={closeModal}
                >
                    <div>
                        <PresenterDetail
                            teamName={teamName}
                            presenter={presenter}
                            updatePresenter={updatePresenter}
                            closeModal={closeModal}
                        />
                    </div>
                </Modal>
            )}
        </div>
    );
}

export default PresentationList;
