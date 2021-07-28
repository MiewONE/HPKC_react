import React, { useState, useEffect } from 'react';
import Modal from 'react-awesome-modal';
import PresentationBody from './PresentationBody';

const CREATE = 0;
const UPDATE = 1;
const DELETE = 2;

const PresentationHeader = ({ teamName, updatePtList }) => {
    console.log(teamName);
    const [modalVisible, setModalVisible] = useState(false);
    const [crudState, setCrudState] = useState(999);
    const openModal = () => {
        setModalVisible(true);
    };
    const createModal = () => {
        setCrudState(CREATE);
        setModalVisible(true);
    };
    const updateModal = () => {
        setCrudState(UPDATE);
        setModalVisible(true);
    };
    const deleteModal = () => {
        setCrudState(DELETE);
        setModalVisible(true);
    };
    const closeModal = () => {
        setCrudState(999);
        setModalVisible(false);
    };
    useEffect(() => {}, [crudState]);
    return (
        <div>
            <button onClick={createModal}>발표 생성</button>
            <button onClick={deleteModal}>발표 삭제</button>
            <button onClick={updateModal}>발표 수정</button>
            <button onClick={openModal}>발표 리스트 새로고침</button>
            <Modal
                visible={modalVisible}
                width="500"
                height="600"
                effect="fadeInUp"
                onClickAway={closeModal}
            >
                <PresentationBody
                    teamName={teamName}
                    curdState={crudState}
                    updatePtList={updatePtList}
                />
                <button onClick={closeModal}>모달 닫기</button>
            </Modal>
        </div>
    );
};

export default PresentationHeader;
