import React, { useState } from 'react';
import Modal from 'react-awesome-modal';
import PresentationBody from './PresentationBody';
import '../styles/presentationHeader.scss';
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
        <div className="ptCrudHeader">
            <section onClick={createModal}>
                <span>발표 생성</span>
            </section>
            <section onClick={deleteModal}>
                <span>발표 삭제</span>
            </section>
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
                    closeModal={closeModal}
                />
            </Modal>
        </div>
    );
};

export default PresentationHeader;
