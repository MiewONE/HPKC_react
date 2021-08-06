import React, { useState, useEffect } from 'react';
import Modal from 'react-awesome-modal';
import TeamBody from './TeamBody';
import '../styles/teamheader.scss';
const CREATE = 0;
const DELETED = 1;
const PUSH = 2;
const POP = 3;

const TeamHeader = ({ updateTeam, teamList }) => {
    const [modalVisible, setModalVisible] = useState(false);
    const [crudState, setCrudState] = useState(999);

    const createModal = () => {
        setCrudState((state) => (state = CREATE));
        setModalVisible((state) => (state = true));
    };
    const teamMemberAddModal = () => {
        setCrudState((state) => (state = PUSH));
        setModalVisible((state) => (state = true));
    };
    const deletedModal = () => {
        setCrudState((state) => (state = DELETED));
        setModalVisible((state) => (state = true));
    };
    const popModal = () => {
        setCrudState((state) => (state = POP));
        setModalVisible((state) => (state = true));
    };
    const closeModal = () => {
        setCrudState((state) => (state = 999));
        setModalVisible((state) => (state = false));
        console.log(teamList);
    };

    return (
        <div id="teamHeaderContainer">
            <section onClick={createModal}>
                <p>팀 만들기</p>
            </section>
            <section onClick={deletedModal}>
                <p>팀 삭제하기</p>
            </section>
            <section onClick={teamMemberAddModal}>
                <p>팀 멤버 추가</p>
            </section>
            <section onClick={popModal}>
                <p>팀 멤버 제거</p>
            </section>
            <Modal visible={modalVisible} onClickAway={closeModal}>
                <TeamBody
                    curdState={crudState}
                    teamList={teamList}
                    updateTeam={updateTeam}
                />
                <button onClick={closeModal}>모달 닫기</button>
            </Modal>
        </div>
    );
};

export default TeamHeader;
