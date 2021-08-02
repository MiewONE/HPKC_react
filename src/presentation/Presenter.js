import React, { useState, useEffect } from 'react';
import EditorComponent from '../components/EditorComponent';
import axios from 'axios';
import storage from '../lib/storage';
const Presenter = ({
    teamId,
    teamName,
    ptName,
    presenterInfo: presenter,
    updatePresenter,
    updateAttendent,
}) => {
    const loginInfo = storage.get('loggedInfo')
        ? storage.get('loggedInfo')
        : storage.remainGet('loggedInfo');
    const [alreadyDdabong, setAlreadyDdabong] = useState(false);
    const [desc, setDesc] = useState(presenter.summary);
    const [file, setFile] = useState('');
    const [order, setOrder] = useState(presenter.order);
    const [recommended, setRecommended] = useState(presenter.ddabong.length);

    useEffect(() => {
        setOrder((n) => (n = presenter.order));
        setDesc((state) => (state = presenter.summary));
        console.log(presenter);
        const checkRecommend = presenter.ddabong.filter(
            (ele) => ele === loginInfo.email
        );

        if (checkRecommend.length > 0) {
            console.log('추천한 발표입니다.');
        }
        setRecommended((cnt) => (cnt = presenter.ddabong.length));
    }, [presenter, recommended]);
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
                ...presenter,
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
        ddabong: () => {
            axios
                .put('/pt/recommendation', {
                    teamName,
                    ptName,
                    presenter,
                })
                .then((res) => {
                    console.log(res.data);
                    if (res.data.success) {
                        setRecommended(res.data.msg);
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
            {presenter.name}
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
            <span>{recommended}</span>
            <button onClick={events.ddabong}>추천</button>
        </div>
    );
};

export default Presenter;
