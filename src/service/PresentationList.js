import axios from "axios";
import {useState,useEffect} from "react";

function PresentationList({match})
{
    const {teamname} = match.params;
    const [attendents,setAttendents] = useState([]);
    useEffect( ()=> {
        console.log("teamname output",teamname);
        axios.post("/pt/ptlist",{teamname: teamname})
        .then((data) => {
            console.log("ptlist call");
            console.log(data.data);
            setAttendents(data.data);
        })
        .catch((err) => {
            console.log(err);
        })
    },[])
    return (
        <>
            <span>pt 리스트</span>
            <span>{attendents[0]}</span>
        </>
    )
}

export default PresentationList;