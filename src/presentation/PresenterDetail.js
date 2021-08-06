import { useState, useEffect } from 'react';
import Presenter from './Presenter';
import { useDispatch, useSelector } from 'react-redux';
import {
    setAttendent,
    setOrder,
    setPresenter,
    setRecommed,
} from '../store/modules/presentation';
import '../styles/presentationDetail.scss';

function PresenterDetail({
    teamName,
    presenter: presenters,
    updatePresenter,
    closeModal,
}) {
    console.log('>>>> PresenterDetail 호출');
    console.log(presenters, '<<<< props로 전달받은 presenters 출력');
    const dispatch = useDispatch();
    const { presentation } = useSelector((state) => state);
    const { order, presenter } = presentation;
    useEffect(() => {
        dispatch(setOrder(0));
    }, [presenters]);

    const previous = () => {
        if (order > 0) {
            dispatch(setOrder(order - 1));
        } else {
            alert('첫번째 인원입니다.');
        }
    };
    const next = () => {
        if (order < presenters.attendents.length - 1) {
            dispatch(setOrder(order + 1));
        } else {
            alert('마지막 인원입니다.');
        }
    };
    const updateAttendent = (_attendent) => {
        setPresenter({
            ...presenter,
            attendents: presenters.attendents.map((ele) => {
                if (ele.name === _attendent.name) return _attendent;
                else return ele;
            }),
        });
    };

    return (
        <>
            {presenters.attendents.length > 0 && (
                <div>
                    <Presenter
                        teamName={teamName}
                        teamId={presenters.teamId}
                        ptName={presenters.ptName}
                        updatePresenter={updatePresenter}
                        updateAttendent={updateAttendent}
                        closeModal={closeModal}
                        previous={previous}
                        next={next}
                    />
                </div>
            )}
        </>
    );
}

export default PresenterDetail;
