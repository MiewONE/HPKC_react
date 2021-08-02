import { useState } from 'react';
import Presenter from './Presenter';

function PresenterDetail({ teamName, presenter: presenters, updatePresenter }) {
    const [num, setNum] = useState(0);

    const [attendent, setAttendent] = useState([...presenters.attendents]);
    const previous = () => {
        if (num > 0) {
            setNum((n) => n - 1);
        } else {
            alert('첫번째 인원입니다.');
        }
    };
    const next = () => {
        if (num < presenters.attendents.length - 1) {
            setNum((n) => n + 1);
        } else {
            alert('마지막 인원입니다.');
        }
    };
    const updateAttendent = (_attendent) => {
        setAttendent(
            (state) =>
                (state = attendent.map((ele) => {
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
            {attendent && (
                <div>
                    {console.log(presenters)}
                    <Presenter
                        teamName={teamName}
                        teamId={presenters.teamId}
                        ptName={presenters.ptName}
                        presenterInfo={attendent[num]}
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
