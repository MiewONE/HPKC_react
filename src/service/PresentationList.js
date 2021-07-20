import axios from "axios";
import {useState,useEffect} from "react";

function PresentationList({match})
{
    const {teamname} = match.params;
    const [attendents,setAttendents] = useState([]);
    useEffect( ()=> {
        setAttendents();
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
        return () => {

        }
    },[match])
    return (
        <>
            <ul>
            <span>pt 리스트</span>
            {attendents && attendents.map(ele => {
                return (
                    <li key={ele._id}>
                    <ul key={ele._id+"ul"}>
                        <li>{ele.ptName}</li>
                        <li>
                            {ele.attendents.map(sub_ele => {
                                return (
                                <ul>
                                    <li>{sub_ele.name}</li>
                                    <li>{sub_ele.subject}</li>
                                    <li>{sub_ele.order}</li>
                                </ul>
                                )
                            })}
                        </li>
                        <li>{ele.joined_people}</li>
                    </ul>
                    </li>
                )
            })}
            </ul>
        </>
    )
}

export default PresentationList;