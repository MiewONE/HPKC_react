import React, { useEffect, useState, useRef } from 'react';
import axios from 'axios';
import '../styles/ptcreate.scss';
import { setPresentationList } from '../store/modules/presentation';
import { useSelector, useDispatch } from 'react-redux';
import { List } from '../lib/List';
import { SosialLogin, ButtonLogin } from '../styles/loginStyle';
const PresentationCreate = ({ teamName, closeModal }) => {
    const { presentation } = useSelector((stat) => stat);
    const { ptList } = presentation;
    const dispatch = useDispatch();
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
                console.log(res);
                if (!res.data.success) {
                    alert('생성에 실패하였습니다.');
                    return;
                }
                alert(res.data.msg.ptName + '이 생성되었습니다.');
                dispatch(setPresentationList([...ptList, res.data.msg]));
                closeModal();
            });
        console.log(ptList);
    };
    return (
        <div className="ptCreateModal">
            <span className="modalTitle">발표 생성</span>
            <section>
                <span>발표명 :</span>
                <input
                    type="text"
                    name="presentationName"
                    placeholder="발표명을 입력하세요"
                    ref={ptName}
                />
            </section>

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

            <ButtonLogin className="saveButton" onClick={save}>
                생성
            </ButtonLogin>
            <section className="xbutton" onClick={closeModal}>
                <SosialLogin></SosialLogin>
            </section>
        </div>
    );
};

export default PresentationCreate;
