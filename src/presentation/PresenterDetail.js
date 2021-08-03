import { useState, useEffect } from 'react';
import Presenter from './Presenter';
import { useDispatch, useSelector } from 'react-redux';
import { setAttendent, setOrder } from '../store/modules/presentation';

function PresenterDetail({ teamName, presenter: presenters, updatePresenter }) {
    const dispatch = useDispatch();
    const { presentation } = useSelector((state) => state);
    const { attendents, order } = presentation;
    console.log(presenters);
    useEffect(() => {
        dispatch(setAttendent([...presenters.attendents]));
        dispatch(setOrder(0));
        console.log(attendents);
    }, [presenters]);

    const previous = () => {
        console.log(order);
        if (order > 0) {
            dispatch(setOrder(order - 1));
        } else {
            alert('첫번째 인원입니다.');
        }
    };
    const next = () => {
        console.log(presenters.attendents);
        if (order < presenters.attendents.length - 1) {
            dispatch(setOrder(order + 1));
        } else {
            alert('마지막 인원입니다.');
        }
    };
    const updateAttendent = (_attendent) => {
        setAttendent(
            (state) =>
                (state = attendents.map((ele) => {
                    if (ele.name === _attendent.name) return _attendent;
                    else return ele;
                }))
        );
    };

    if (!presenters) {
        console.log(presenters, '>> 팀이름', teamName);
        return <div>뭐징</div>;
    }

    return (
        <>
            {attendents.length > 0 && (
                <div>
                    {console.log(presenters)}
                    <Presenter
                        teamName={teamName}
                        teamId={presenters.teamId}
                        ptName={presenters.ptName}
                        updatePresenter={updatePresenter}
                        updateAttendent={updateAttendent}
                    />
                    <button onClick={previous}>이전</button>

                    <button onClick={next}>다음</button>
                </div>
            )}
        </>
    );
}

export default PresenterDetail;
