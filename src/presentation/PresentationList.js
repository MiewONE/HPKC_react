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
import '../styles/presentationList.scss';
function PresentationList({ teamName, teamList, updateTeam }) {
    const dispatch = useDispatch();
    const [modalVisible, setModalVisible] = useState(false);
    const { presentation, team } = useSelector((state) => state);
    const { ptList, presenter, order } = presentation;
    const { teamList: allTeamList } = team;
    const selectedTeam = allTeamList.filter(
        (ele) => ele.teamName === teamName
    )[0];
    useEffect(() => {
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
            <div className="ptList">
                <div className="ptHeader">
                    <section>
                        <PresentationHeader
                            teamName={teamName}
                            updatePtList={updatePtList}
                        />
                    </section>

                    {selectedTeam && (
                        <section id="teamInfo">
                            <p>{selectedTeam.teamName}</p>
                            <p>{selectedTeam.subject}</p>
                        </section>
                    )}
                </div>
                <section>
                    {ptList.length < 1 && (
                        <section className="noneList">
                            발표 내역이 없어요. 추가 해주세요 !
                        </section>
                    )}
                    {ptList.length > 1 && (
                        <div id="ptlistHeader">
                            <span>총 갯수 :{ptList.length}</span>
                            <div className="ptlistTitle">
                                <section>발표명</section>
                                <section>참석자 수</section>
                                <section>첫번째 발표자</section>
                                <section>만든 날짜</section>
                            </div>
                        </div>
                    )}
                    <section>
                        {ptList.length > 0 &&
                            ptList.map((ele, idx) => {
                                return (
                                    <Presentation
                                        key={idx}
                                        onClick={openModal(ele)}
                                    >
                                        <span style={{ marginLeft: '3%' }}>
                                            {idx + 1}
                                        </span>
                                        <div>
                                            <section>
                                                <span>{ele.ptName}</span>
                                            </section>
                                        </div>
                                        <div>{ele.joined_people}</div>
                                        <div>{ele.attendents[0].name}</div>
                                        <div>{ele.createdAt}</div>
                                    </Presentation>
                                );
                            })}
                    </section>
                </section>
            </div>
            {presenter._id && (
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
