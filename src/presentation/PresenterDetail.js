import { useEffect, useState } from 'react';
import Presenter from './Presenter';

function PresenterDetail({ teamname, presenter: presenters, updatePresenter }) {
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
        console.log('변경 전 발표자들입니다', attendent);
        setAttendent(
            attendent.map((ele) => {
                if (ele.name === _attendent.name) return _attendent;
                else return ele;
            })
        );
        console.log('변경 후 발표자들입니다', attendent);
    };

    if (!presenters) {
        console.log(presenters, '>> 팀이름', teamname);
        return <div>뭐징</div>;
    }

    return (
        <>
            {attendent && (
                <div>
                    {console.log(presenters)}
                    <Presenter
                        teamname={teamname}
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
