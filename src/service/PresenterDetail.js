import axios from 'axios';
import { useEffect, useState } from 'react';
import EditorComponent from '../components/EditorComponent';
function PresenterDetail({ teamname, presenter }) {
    const [num, setNum] = useState(0);
    const [presenterInfo, setPresenterInfo] = useState({
        name: '',
        subject: '',
        order: 0,
        summary: '',
    });
    const [desc, setDesc] = useState('');
    useEffect(() => {
        console.log('detail page mount');
        setPresenterInfo(presenter.attendents[num]);
    }, [num, presenter, presenterInfo]);

    const onEditorChange = (value) => {
        setDesc(value);
        console.log(value);
    };
    const previous = () => {
        if (num > 0) {
            setNum((n) => n - 1);
        } else {
            alert('첫번째 인원입니다.');
        }
    };
    const next = () => {
        if (num < presenter.attendents.length - 1) {
            setNum((n) => n + 1);
        } else {
            alert('마지막 인원입니다.');
        }
    };
    const save = () => {
        console.log(presenterInfo);
        setPresenterInfo((presenterInfo) => {
            presenterInfo.summary = desc;
        });
        axios
            .post('/pt/presenter/detailsave', {
                teamname,
                ptName: presenter.ptName,
                presenter: presenterInfo,
            })
            .then((res) => {
                console.log(JSON.stringify(res));
            })
            .catch((err) => {
                console.log(err);
            });
    };
    const increase = () => {
        setPresenterInfo((presenterInfo) => {
            presenterInfo.order = presenterInfo.order + 1;
        });
        console.log('order 증가>>>', presenterInfo);
    };
    const oncrease = () => {
        setPresenterInfo((presenterInfo) => {
            presenterInfo.order = presenterInfo.order - 1;
        });
        console.log('order 감소>>>', presenterInfo);
    };

    return (
        <>
            {presenterInfo && (
                <div>
                    {
                        <div>
                            <span>{presenter.ptName}</span>
                            <br />
                            {presenterInfo.name}
                            <br />
                            <button onClick={oncrease}>-</button>
                            <span>{presenterInfo.order}</span>
                            <button onClick={increase}>+</button>
                            <br />
                            <span>요약</span>
                            <br />
                            <EditorComponent
                                value={presenterInfo.summary}
                                onChange={onEditorChange}
                            />
                        </div>
                    }
                    <button onClick={previous}>이전</button>
                    <button onClick={save}>저장</button>
                    <button onClick={next}>다음</button>
                </div>
            )}
        </>
    );
}

export default PresenterDetail;
