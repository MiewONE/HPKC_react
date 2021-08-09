import React from 'react';
import PresentationCreate from './PresentationCreate';
import PresentationDelete from './PresentationDelete';
const CREATE = 0;
const DELETE = 2;

const PresentationBody = ({
    curdState,
    teamName,
    updatePtList,
    closeModal,
}) => {
    switch (curdState) {
        case CREATE:
            return (
                <PresentationCreate
                    teamName={teamName}
                    updatePtList={updatePtList}
                    closeModal={closeModal}
                />
            );

        case DELETE:
            return (
                <div>
                    <PresentationDelete
                        teamName={teamName}
                        updatePtList={updatePtList}
                        closeModal={closeModal}
                    />
                </div>
            );
        default:
            return (
                <div>
                    <h1>페이지를 찾지 못했습니다.</h1>
                </div>
            );
    }
};

export default PresentationBody;
