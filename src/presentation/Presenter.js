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
    const { attendents, order: num, recommend, presenter } = presentation;
    const loginInfo = storage.get('loggedInfo')
        ? storage.get('loggedInfo')
        : storage.remainGet('loggedInfo');
    const [leftOver, setLeftOver] = useState(false);
    const [rightOver, setRighttOver] = useState(false);
    const [desc, setDesc] = useState(attendents[num].summary);
    const [file, setFile] = useState('');
    const [order, setOrder] = useState(attendents[num].order);
    const [already, setAlready] = useState(false);
    const [writed, setWrited] = useState(false);
    useEffect(() => {
        dispatch(setAttendent(presenter.attendents));
        dispatch(setRecommed(attendents[num].ddabong.length));

        setOrder((n) => (n = attendents[num].order));

        const checkRecommend = attendents[num].ddabong.filter(
            (ele) => ele === loginInfo.email
        );

        if (loginInfo.email === attendents[num].email) {
            console.log(attendents[num].summary);
            setWrited(true);
            let states;
            if (!attendents[num].summary) return;
            if (attendents[num].summary.toString().includes('br'))
                states = attendents[num].summary.replace(
                    /<p><br><\/p>/g,
                    '<br/>'
                );
            else states = attendents[num].summary;
            console.log(states);
            setDesc((state) => (state = states));
        } else {
            setWrited(false);
            setDesc((state) => (state = attendents[num].summary));
        }
        if (checkRecommend.length > 0) {
            console.log('추천한 발표입니다.');
            setAlready(true);
        }
        return () => {
            console.log(
                recommend,
                '<<< Presenter이 unmount되면서 recommend 출력'
            );
        };
    }, [attendents, num]);
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
                        dispatch(setRecommed(attendents[num].ddabong.length));

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
        <div id="presenter">
            <scetion className="presenterHeader">
                <span>{ptName}</span>
                <scetion className="saveNclose">
                    <section>
                        <img
                            className="IMGsave"
                            onClick={events.save}
                            src="/img/save.png"
                            alt="save"
                        />
                    </section>
                    <section>
                        <img
                            className="IMGsave"
                            onClick={closeModal}
                            src="/img/close.png"
                            alt="exit"
                        />
                    </section>
                </scetion>
            </scetion>
            <scetion className="Info">
                <scetion>
                    <scetion>
                        <p>발표 순서:</p>
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
                    {/* <scetion>
                        <button onClick={events.oncrease}>-</button>
                        <span>{order}</span>
                        <button onClick={events.increase}>+</button>
                    </scetion> */}
                </scetion>
                <p>작성자 : {attendents[num].name}</p>
            </scetion>
            <scetion className="summary">
                <scetion>
                    <span>요약</span>
                    {writed && (
                        <form
                            action="/upload/uploadFile"
                            encType="multipart/form-data"
                            method="post"
                            onChange={events.uploadfile}
                        >
                            <input type="file" name="attachment" />
                            <button type="submit">Upload</button>
                        </form>
                    )}
                </scetion>

                {writed ? (
                    <EditorComponent
                        value={desc}
                        onChange={events.onEditorChange}
                    />
                ) : (
                    <p
                        class="summaryText"
                        dangerouslySetInnerHTML={{ __html: desc }}
                    ></p>
                )}
            </scetion>
            <scetion className="recommend">
                <div onClick={events.ddabong}>
                    {already ? (
                        <img src="/img/liked.png" alt="ddabong" />
                    ) : (
                        <img src="/img/origin.png" alt="ddabong" />
                    )}
                </div>
                <div>{recommend}</div>
            </scetion>
            {num !== 0 && (
                <scetion className="previous" onClick={previous}>
                    <img
                        className="IMGArrow"
                        src={
                            leftOver
                                ? '/img/button/left_90.png'
                                : '/img/button/left_60.png'
                        }
                        alt="save"
                        onMouseOver={() => setLeftOver(true)}
                        onMouseLeave={() => setLeftOver(false)}
                    />
                </scetion>
            )}
            {num !== attendents.length - 1 && (
                <scetion className="next" onClick={next}>
                    <img
                        className="IMGArrow"
                        src={
                            rightOver
                                ? '/img/button/right_90.png'
                                : '/img/button/right_60.png'
                        }
                        alt="save"
                        onMouseOver={() => setRighttOver(true)}
                        onMouseLeave={() => setRighttOver(false)}
                    />
                </scetion>
            )}
        </div>
    );
};

export default Presenter;
