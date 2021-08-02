import React, { useEffect, useState, useRef } from 'react';
import axios from 'axios';
import '../styles/ptcreate.scss';
import { List } from '../lib/List';
const PresentationCreate = ({ teamName, updatePtList }) => {
    const [member, setMember] = useState([]);
    const [selectedMember, setSelectedMember] = useState([]);
    const ptName = useRef();
    useEffect(() => {
        axios
            .post('/team/userlist', { teamName })
            .then((res) => {
                setMember((state) => (state = res.data.msg));
            })
            .catch((err) => {
                console.log(err);
            });
    }, [teamName]);

    const save = () => {
        if (!ptName.current.value) {
            alert('발표명을 지정해주세요');
            return;
        }
        axios
            .post('/pt/create-presentation', {
                ptName: ptName.current.value,
                members: selectedMember,
                teamName,
            })
            .then((res) => {
                if (!res.data.success) {
                    alert('생성에 실패하였습니다.');
                    return;
                }
                alert(res.data.msg + '이 생성되었습니다.');
            });
        console.log('업데이트 시작');
        updatePtList();
    };
    return (
        <div className="ptCreateModal">
            <span>발표명 :</span>
            <input
                type="text"
                name="presentationName"
                placeholder="발표명을 입력하세요"
                ref={ptName}
            />
            {member && (
                <div className="listContainer">
                    <List
                        items={member}
                        onItemsChange={setMember}
                        listName="멤버"
                    />
                    <List
                        items={selectedMember}
                        onItemsChange={setSelectedMember}
                        listName="발표자(순서대로)"
                    />
                </div>
            )}

            <button onClick={save}>생성</button>
        </div>
    );
};

export default PresentationCreate;
