import React, { useState, useEffect } from 'react';
import EditorComponent from '../components/EditorComponent';
import axios from 'axios';
const Presenter = ({
    teamId,
    teamName,
    ptName,
    presenterInfo: presenter,
    updatePresenter,
    updateAttendent,
}) => {
    const [desc, setDesc] = useState(presenter.summary);
    const [file, setFile] = useState('');
    const [order, setOrder] = useState(presenter.order);
    useEffect(() => {
        console.log(presenter.order);
        setOrder((n) => (n = presenter.order));
        setDesc(presenter.summary);
    }, [presenter]);
    const events = {
        onEditorChange: (value) => {
            console.log(value);
            setDesc(value);
        },
        increase: () => {
            setOrder((n) => n + 1);
        },
        oncrease: () => {
            setOrder((n) => n - 1);
        },
        uploadfile: (e) => {
            setFile(e.target.value.toString().split('\\')[2]);
        },
        save: () => {
            const sendUser = {
                ...presenter,
                order: order,
                summary: desc,
                filename: file,
            };
            console.log(sendUser);
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
    };
    if (!presenter) {
        console.log(presenter);
        return <div>뭐여</div>;
    }
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
        </div>
    );
};

export default Presenter;
