import React, { useRef } from 'react';
import { setPresentationList } from '../store/modules/presentation';
import { useSelector, useDispatch } from 'react-redux';
import axios from 'axios';
const PresentationDelete = ({ teamName, updatePtList }) => {
    const ptName = useRef();
    const { presentation } = useSelector((stat) => stat);
    const { ptList } = presentation;
    const dispatch = useDispatch();
    const send = async () => {
        await axios
            .delete('/pt/delete', {
                data: {
                    teamName,
                    ptName: ptName.current.value,
                },
            })
            .then((res) => {
                if (!res.data.success) {
                    alert('팀이름과 발표이름을 확인해주세요 ');
                } else {
                    dispatch(
                        setPresentationList(
                            ptList.filter(
                                (ele) => ele.ptName !== ptName.current.value
                            )
                        )
                    );
                    alert(res.data.msg + '가 삭제되었습니다.');
                }
            })
            .catch((err) => {
                console.log(err);
            });
        await updatePtList();
    };
    return (
        <div>
            <input name="ptName" type="text" ref={ptName} />
            <button onClick={send}>삭제하기</button>
        </div>
    );
};

export default PresentationDelete;
