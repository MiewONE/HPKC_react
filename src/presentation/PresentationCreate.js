import React, { useEffect, useState, useRef } from 'react';
import axios from 'axios';
import '../styles/ptcreate.scss';
const PresentationCreate = ({ teamName, updatePtList }) => {
    const [member, setMember] = useState([{}]);
    const [selectedMember, setSelectedMember] = useState([]);
    const [order, setOrder] = useState(1);
    const ptName = useRef();
    useEffect(() => {
        axios
            .post('/team/userlist', { teamName })
            .then((res) => {
                setMember(res.data.member);
            })
            .catch((err) => {
                console.log(err);
            });
    }, [teamName]);
    const seleted = (member) => {
        return () => {
            const t = document.getElementById('member' + member.email);
            if (t.style.background === 'tomato') {
                t.style.background = 'white';
                console.log(t);
                const removeEle = t.querySelector('div');
                t.removeChild(removeEle);
                setOrder((n) => n - 1);
                setSelectedMember([
                    selectedMember.filter((ele) => ele.email !== member.email),
                ]);
            } else {
                t.style.background = 'tomato';
                const eleOrder = document.createElement('div');
                eleOrder.className = 'order';
                const eleText = document.createTextNode(order);
                eleOrder.appendChild(eleText);
                t.appendChild(eleOrder);
                setOrder((n) => n + 1);
                setSelectedMember([...selectedMember, { ...member, order }]);
            }
        };
    };
    const save = () => {
        console.log(selectedMember);
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
                alert(res.data.ptName + '이 생성되었습니다.');
            });
        updatePtList();
    };
    return (
        <div>
            <span>발표명 :</span>
            <input
                type="text"
                name="presentationName"
                placeholder="발표명을 입력하세요"
                ref={ptName}
            />
            {member &&
                member.map((ele) => {
                    return (
                        <div
                            key={ele.email}
                            onClick={seleted(ele)}
                            id={'member' + ele.email}
                            className="memberList"
                        >
                            <span>이름 :{ele.name}</span>
                            <span>이메일 : {ele.email}</span>
                        </div>
                    );
                })}
            <button onClick={save}>생성</button>
        </div>
    );
};

export default PresentationCreate;
<form action=""></form>;
