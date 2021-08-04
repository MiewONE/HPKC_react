import React, { useState, useEffect } from 'react';
import Modal from '../components/Modal';
import TeamBody from './TeamBody';

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
        <div>
            <button onClick={createModal}>팀 만들기</button>
            <button onClick={deletedModal}>팀 삭제하기</button>
            <button onClick={teamMemberAddModal}>팀 멤버 추가</button>
            <button onClick={popModal}>팀 멤버 제거</button>
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
