import React from 'react';
import PresentationCreate from './PresentationCreate';

const CREATE = 0;
const UPDATE = 1;
const DELETE = 2;

const PresentationBody = ({ curdState, teamName, updatePtList }) => {
    switch (curdState) {
        case CREATE:
            return (
                <PresentationCreate
                    teamName={teamName}
                    updatePtList={updatePtList}
                />
            );
        case UPDATE:
            return (
                <div>
                    <h1>안나오네용</h1>
                </div>
            );

        case DELETE:
            return (
                <div>
                    <h1>안나오네용</h1>
                </div>
            );
        default:
            return (
                <div>
                    <h1>안나오네용</h1>
                </div>
            );
    }
};

export default PresentationBody;
