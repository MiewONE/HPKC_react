import axios from 'axios';
import { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import {
    setPresentationList,
    setPresenter,
    setOrder,
} from '../store/modules/presentation';
import { setTeamList } from '../store/modules/team';
import PresenterDetail from '../presentation/PresenterDetail';
import { Presentation } from '../styles/PresentationList';
import Modal from 'react-awesome-modal';
import PresentationHeader from './PresentationHeader';
import { ButtonLogin } from '../styles/loginStyle';
import '../styles/presentationList.scss';
function PresentationList({ teamName }) {
    const dispatch = useDispatch();
    const [modalVisible, setModalVisible] = useState(false);
    const { presentation, team } = useSelector((state) => state);
    const { ptList, presenter, order } = presentation;
    const { teamList } = team;
    const [teamUserList, setTeamUserList] = useState([]);
    const selectedTeam = teamList.filter((ele) => ele.teamName === teamName)[0];
    useEffect(() => {
        if (teamName) {
            axios.post('/team/userlist', { teamName: teamName }).then((res) => {
                if (res.data.success) {
                    setTeamUserList(res.data.msg);
                } else {
                    alert('팀 정보를 가져오는데 실패하였습니다.');
                    return;
                }
            });
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
        }
    }, [teamName, teamList]);
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
        dispatch(
            setTeamList(
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
            )
        );
    };
    const openModal = (pt) => {
        return () => {
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
    const leaveTeam = () => {
        if (window.confirm(teamName + '에서 나가시겠습니까?')) {
            axios
                .post('/team/leaveTeam', { teamName })
                .then((res) => {
                    if (res.data.success) {
                        dispatch(
                            setTeamList(
                                teamList.filter(
                                    (ele) => ele.teamName !== teamName
                                )
                            )
                        );
                        alert(res.data.msg + '을 떠나셨습니다.');
                    } else {
                        console.log(res);
                        alert(res.data.msg);
                    }
                })
                .catch((err) => {
                    console.log(err);
                });
        }
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
                            <p>팀 정보</p>
                            <section className="teamInfo">
                                <p>팀 이름 :</p>
                                <p>{selectedTeam.teamName}</p>
                            </section>
                            <section className="teamInfo">
                                <p>팀 주제 :</p>
                                <p>{selectedTeam.subject}</p>
                            </section>
                            <section className="teamInfo">
                                <p>팀 멤버 :</p>
                                <section className="teamMember">
                                    {teamUserList.length > 0 &&
                                        teamUserList.map((ele) => {
                                            return <p>{ele.id}</p>;
                                        })}
                                </section>
                            </section>
                            <section
                                style={{
                                    display: 'flex',
                                    justifyContent: 'center',
                                    marginTop: '23vh',
                                }}
                            >
                                <ButtonLogin onClick={leaveTeam}>
                                    팀 나가기
                                </ButtonLogin>
                            </section>
                        </section>
                    )}
                </div>
                <section>
                    {ptList.length < 1 && (
                        <section className="noneList">
                            발표 내역이 없어요. 추가 해주세요 !
                        </section>
                    )}
                    {ptList.length > 0 && (
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
                    <section id={ptList.length > 0 ? 'ptListAll' : ''}>
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
