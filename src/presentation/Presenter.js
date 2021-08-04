import React, { useState, useEffect } from 'react';
import EditorComponent from '../components/EditorComponent';
import axios from 'axios';
import storage from '../lib/storage';
import { useDispatch, useSelector } from 'react-redux';
import { setRecommed, setAttendent } from '../store/modules/presentation';
import '../styles/presenter.scss';
const Presenter = ({
    teamId,
    teamName,
    ptName,
    updatePresenter,
    updateAttendent,
    closeModal,
    previous,
    next,
}) => {
    const dispatch = useDispatch();
    const { presentation } = useSelector((state) => state);
    const { attendents, order: num, recommend } = presentation;
    const loginInfo = storage.get('loggedInfo')
        ? storage.get('loggedInfo')
        : storage.remainGet('loggedInfo');

    const [desc, setDesc] = useState(attendents[num].summary);
    const [file, setFile] = useState('');
    const [order, setOrder] = useState(attendents[num].order);

    useEffect(() => {
        dispatch(setRecommed(attendents[num].ddabong.length));
        setOrder((n) => (n = attendents[num].order));
        setDesc((state) => (state = attendents[num].summary));

        const checkRecommend = attendents[num].ddabong.filter(
            (ele) => ele === loginInfo.email
        );

        if (checkRecommend.length > 0) {
            console.log('추천한 발표입니다.');
        }
        return () => {
            dispatch(setRecommed(0));
        };
    }, [num]);
    const events = {
        onEditorChange: (value) => {
            setDesc((state) => (state = value));
        },
        increase: () => {
            setOrder((n) => n + 1);
        },
        oncrease: () => {
            setOrder((n) => n - 1);
        },
        uploadfile: (e) => {
            setFile(
                (state) => (state = e.target.value.toString().split('\\')[2])
            );
        },
        save: () => {
            const sendUser = {
                ...attendents[num],
                order: order,
                summary: desc,
                filename: file,
            };

            updatePresenter(sendUser);
            updateAttendent(sendUser);
            axios
                .post('/pt/presenter/detailsave', {
                    teamId,
                    teamName,
                    ptName,
                    presenter: sendUser,
                })
                .then((res) => {
                    console.log(JSON.stringify(res));

                    alert('저장되었습니다.');
                })
                .catch((err) => {
                    console.log(err);
                });
        },
        ddabong: async () => {
            axios
                .put('/pt/recommendation', {
                    teamName,
                    ptName,
                    presenter: attendents[num],
                })
                .then((res) => {
                    if (res.data.success) {
                        dispatch(
                            setAttendent(
                                attendents.map((ele) => {
                                    if (ele.email === attendents[num].email) {
                                        return {
                                            ...ele,
                                            ddabong: [
                                                ...attendents[num].ddabong,
                                                loginInfo.email,
                                            ],
                                        };
                                    } else {
                                        return ele;
                                    }
                                })
                            )
                        );

                        alert('추천 되었습니다.');
                    } else {
                        alert(res.data.msg);
                    }
                })
                .catch((err) => {
                    console.log(err);
                });
        },
    };
    return (
        <div>
            <header className="presenterHeader">
                <p>{ptName}</p>
                <scetion className="saveNclose">
                    <img
                        className="IMGsave"
                        onClick={events.save}
                        src="/img/IMG_save.png"
                        alt="save"
                    />
                    <img
                        className="IMGsave"
                        onClick={closeModal}
                        src="/img/IMG_save.png"
                        alt="exit"
                    />
                </scetion>
            </header>
            <scetion className="Info">
                <scetion>
                    <scetion>
                        <p>발표 순서 </p>
                        <div>
                            {attendents.map((ele) => {
                                if (ele.name === attendents[num].name)
                                    return (
                                        <p>
                                            <strong>{ele.name}</strong>
                                        </p>
                                    );
                                else return <p>{ele.name}</p>;
                            })}
                        </div>
                    </scetion>
                    <scetion>
                        <button onClick={events.oncrease}>-</button>
                        <span>{order}</span>
                        <button onClick={events.increase}>+</button>
                    </scetion>
                </scetion>
                <p>작성자 : {attendents[num].name}</p>
            </scetion>
            <scetion className="summary">
                <scetion>
                    <span>요약</span>
                    <form
                        action="/upload/uploadFile"
                        encType="multipart/form-data"
                        method="post"
                        onChange={events.uploadfile}
                    >
                        <input type="file" name="attachment" />
                        <button type="submit">Upload</button>
                    </form>
                </scetion>

                <EditorComponent
                    value={desc}
                    onChange={events.onEditorChange}
                />
            </scetion>
            <scetion className="recommend">
                <span>{recommend}</span>
                <button onClick={events.ddabong}>추천</button>
            </scetion>
            <scetion className="previous" onClick={previous}>
                이전
            </scetion>
            <scetion className="next" onClick={next}>
                다음
            </scetion>
        </div>
    );
};

export default Presenter;
