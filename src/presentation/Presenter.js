import React, { useState, useEffect } from 'react';
import EditorComponent from '../components/EditorComponent';
import axios from 'axios';
import storage from '../lib/storage';
import { useDispatch, useSelector } from 'react-redux';
import {
    setRecommed,
    setAttendent,
    setPresenter,
} from '../store/modules/presentation';
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
    const { order: num, recommend, presenter } = presentation;
    const loginInfo = storage.get('loggedInfo')
        ? storage.get('loggedInfo')
        : storage.remainGet('loggedInfo');
    const [leftOver, setLeftOver] = useState(false);
    const [rightOver, setRighttOver] = useState(false);
    const [desc, setDesc] = useState(presenter.attendents[num].summary);
    const [file, setFile] = useState('');
    const [order, setOrder] = useState(presenter.attendents[num].order);
    const [already, setAlready] = useState(false);
    const [writed, setWrited] = useState(false);

    useEffect(() => {
        console.log(presenter.attendents);
        dispatch(setRecommed(presenter.attendents[num].ddabong.length));

        setOrder((n) => (n = presenter.attendents[num].order));

        const checkRecommend = presenter.attendents[num].ddabong.filter(
            (ele) => ele === loginInfo.email
        );

        if (checkRecommend.length > 0) {
            console.log('추천한 발표입니다.');
            setAlready(true);
            console.log(already);
        }
        if (loginInfo.email === presenter.attendents[num].email) {
            setWrited((state) => (state = true));
            let states;
            if (!presenter.attendents[num].summary) return;
            if (presenter.attendents[num].summary.toString().includes('br'))
                states = presenter.attendents[num].summary.replace(
                    /<p><br><\/p>/g,
                    '<br/>'
                );
            else states = presenter.attendents[num].summary;
            console.log(states);
            setDesc((state) => (state = states));
        } else {
            setWrited(false);
            setDesc((state) => (state = presenter.attendents[num].summary));
        }

        console.log(desc);
        return () => {
            setAlready(false);
            // dispatch(setAttendent([]));

            console.log(
                recommend,
                '<<< Presenter이 unmount되면서 recommend 출력'
            );
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
                ...presenter.attendents[num],
                order: order,
                summary: desc,
                filename: file,
            };

            updatePresenter(sendUser);
            updateAttendent(sendUser);
            axios
                .post('http://localhost:3045/pt/presenter/detailsave', {
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
                .put('http://localhost:3045/pt/recommendation', {
                    teamName,
                    ptName,
                    presenter: presenter.attendents[num],
                })
                .then((res) => {
                    if (res.data.success) {
                        console.log('>>>before', presenter.attendents[num]);
                        dispatch(
                            setPresenter({
                                ...presenter,
                                attendents: presenter.attendents.map((ele) => {
                                    if (
                                        ele.email ===
                                        presenter.attendents[num].email
                                    ) {
                                        return {
                                            ...ele,
                                            ddabong: [
                                                ...presenter.attendents[num]
                                                    .ddabong,
                                                loginInfo.email,
                                            ],
                                        };
                                    } else {
                                        return ele;
                                    }
                                }),
                            })
                        );
                        console.log('>>>after', presenter.attendents[num]);
                        dispatch(
                            setRecommed(
                                presenter.attendents[num].ddabong.length + 1
                            )
                        );
                        setAlready((state) => (state = true));
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
            <section className="presenterHeader">
                <span>{ptName}</span>
                <section className="saveNclose">
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
                </section>
            </section>
            <section className="Info">
                <section>
                    <section>
                        <p>발표 순서:</p>
                        <div>
                            {presenter.attendents.map((ele) => {
                                if (ele.name === presenter.attendents[num].name)
                                    return (
                                        <p>
                                            <strong>{ele.name}</strong>
                                        </p>
                                    );
                                else return <p>{ele.name}</p>;
                            })}
                        </div>
                    </section>
                    {/* <section>
                        <button onClick={events.oncrease}>-</button>
                        <span>{order}</span>
                        <button onClick={events.increase}>+</button>
                    </section> */}
                </section>
                <p>작성자 : {presenter.attendents[num].name}</p>
            </section>
            <section className="summary">
                <section>
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
                </section>

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
            </section>
            <section className="recommend">
                <div onClick={events.ddabong}>
                    <img
                        src={already ? '/img/liked.png' : '/img/origin.png'}
                        alt="ddabong"
                    />
                </div>
                <div>{recommend}</div>
            </section>
            {num !== 0 && (
                <section className="previous" onClick={previous}>
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
                </section>
            )}
            {num !== presenter.attendents.length - 1 && (
                <section className="next" onClick={next}>
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
                </section>
            )}
        </div>
    );
};

export default Presenter;
