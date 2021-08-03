import React, { useState } from 'react';
import Modal from 'react-awesome-modal';
import PresentationBody from './PresentationBody';

const CREATE = 0;
const DELETE = 2;

const PresentationHeader = ({ teamName, updatePtList }) => {
    const [modalVisible, setModalVisible] = useState(false);
    const [crudState, setCrudState] = useState(999);
    const createModal = () => {
        setCrudState((state) => (state = CREATE));
        setModalVisible((state) => (state = true));
    };
    const deleteModal = () => {
        setCrudState((state) => (state = DELETE));
        setModalVisible((state) => (state = true));
    };
    const closeModal = () => {
        setCrudState((state) => (state = 999));
        setModalVisible((state) => (state = false));
    };

    return (
        <div>
            <button onClick={createModal}>발표 생성</button>
            <button onClick={deleteModal}>발표 삭제</button>
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
