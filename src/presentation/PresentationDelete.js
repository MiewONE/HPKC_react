import React, { useRef, useState, useEffect } from 'react';
import { setPresentationList } from '../store/modules/presentation';
import { useSelector, useDispatch } from 'react-redux';
import axios from 'axios';
import '../styles/presentationDelete.scss';
const PresentationDelete = ({ teamName, updatePtList, closeModal }) => {
    const ptName = useRef();
    const { presentation } = useSelector((stat) => stat);
    const [ptDelList, setPtDelList] = useState([]);
    const { ptList } = presentation;
    const dispatch = useDispatch();
    useEffect(() => {
        axios
            .post('http://localhost:3045/pt/ptlist', { teamName })
            .then((res) => {
                if (res.data.success) {
                    setPtDelList(
                        res.data.msg.map((ele) => {
                            return {
                                selected: false,
                                ptName: ele.ptName,
                                createdAt: ele.createdAt,
                            };
                        })
                    );
                } else {
                }
            });
    }, []);
    const select = (data) => {
        return () => {
            setPtDelList(
                ptDelList.map((ele) => {
                    if (data.ptName === ele.ptName) {
                        return {
                            ...ele,
                            selected: !ele.selected,
                        };
                    } else {
                        return ele;
                    }
                })
            );
        };
    };
    const send = async () => {
        const delList = ptDelList.filter((ele) => ele.selected === true);
        await axios
            .delete('http://localhost:3045/pt/delete', {
                data: {
                    teamName,
                    delList,
                },
            })
            .then((res) => {
                if (!res.data.success) {
                    alert('팀이름과 발표이름을 확인해주세요 ');
                } else {
                    for (let i = 0; i < delList.length; i++) {
                        dispatch(
                            setPresentationList(
                                ptList.filter(
                                    (ele) => ele.ptName !== delList[i].ptName
                                )
                            )
                        );
                    }

                    alert(delList.length + '개가 삭제되었습니다.');
                    closeModal();
                }
            })
            .catch((err) => {
                console.log(err);
            });
        await updatePtList();
    };
    return (
        <div id="ptDelete">
            <span>발표 삭제</span>
            <section id="ptDelHeader">
                <span>발표명</span>
                <span>발표 생성일</span>
            </section>

            <section className="delListContainer">
                {ptDelList.length > 0 &&
                    ptDelList.map((ele) => {
                        return (
                            <section
                                onClick={select(ele)}
                                className={
                                    ele.selected
                                        ? 'selected dellist'
                                        : 'nonselected dellist'
                                }
                            >
                                <span>{ele.ptName}</span>
                                <span>{ele.createdAt}</span>
                            </section>
                        );
                    })}
            </section>
            <button onClick={send}>삭제하기</button>
        </div>
    );
};

export default PresentationDelete;
