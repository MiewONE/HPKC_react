import React, { useState, useEffect } from 'react';
import EditorComponent from '../components/EditorComponent';
import axios from 'axios';
import storage from '../lib/storage';
import { useDispatch, useSelector } from 'react-redux';
import { setRecommed, setAttendent } from '../store/modules/presentation';

const Presenter = ({
    teamId,
    teamName,
    ptName,
    updatePresenter,
    updateAttendent,
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
            <button onClick={events.save}>저장</button>
            <span>{ptName}</span>
            <br />
            {attendents[num].name}
            <br />
            <button onClick={events.oncrease}>-</button>
            <span>{order}</span>
            <button onClick={events.increase}>+</button>
            <br />
            <span>요약</span>
            <br />
            <form
                action="/upload/uploadFile"
                encType="multipart/form-data"
                method="post"
                onChange={events.uploadfile}
            >
                <input type="file" name="attachment" />
                <button type="submit">Upload</button>
            </form>
            <EditorComponent value={desc} onChange={events.onEditorChange} />
            <span>{recommend}</span>
            <button onClick={events.ddabong}>추천</button>
        </div>
    );
};

export default Presenter;
