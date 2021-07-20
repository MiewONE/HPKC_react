import io from 'socket.io-client';
import { useSelector,useDispatch } from "react-redux";
import {useEffect, useRef} from "react";
import { voting } from '../store/modules/vote';


const socket = io.connect("http://localhost:3046");
function Vote()
{   
    const dispatch = useDispatch();

    useEffect( () => {
        socket.on("voteStart",(start) => {
            console.log(start.text);
            console.log("투표 시작");
            dispatch(voting());
        })
        socket.on('votedDone',(done) => {
            console.log(done);
        })
    })
    const state_login = useSelector(state => state.user);
    const state_vote = useSelector(state => state.vote)
    const intputRef = useRef();

    const con =  () => {
        // socket.emit("chat","text");
        // socket.on("chat",(data) => {
        //     console.log(data)
        // })

        // axios.get("/pt/test/vote").then((res)=>{console.log(res)});
        console.log("conn");
        socket.emit("joinRoom",{
            groupName :intputRef.current.value});
        socket.on("joined",(msg) => {
            console.log(msg);
        })
        // socket.emit("grouptest",{
        //     msg :"tests",
        //     user : state_login.user
        // });

    }
    const send = () => {
        socket.emit("grouptest",{
            groupName : intputRef.current.value,
            text : "test"
        });
    }
    const doneSend =() => {
        socket.emit("innerSocket",{text : "test"});
    }
    return (
        <>
            <input type="text" ref={intputRef}/>
            <button onClick={con}>connection</button>
            <button onClick={send}>send</button>
            <button onClick={doneSend}>doneSend</button>
            {
                state_vote.stateVote === true && <div>투표 시작</div>
            }
        </>
    )
}

export default Vote;