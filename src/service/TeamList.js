import {useState,useEffect} from "react";
import axios from "axios";
import {Route,Link} from "react-router-dom";
import PresentationList from "./PresentationList";

function TeamList()
{
    const [teamList,setTeamList] = useState();
    useEffect( ()=> {
        console.log("teamList request");
        axios.get("/team/teamlist")
        .then((data) => {
            console.log(data.data);
            setTeamList(data.data);
        }).catch((err) => {
            console.log(err);
        })
    },[])
    return(
        <>
            <ul>
                {
                    teamList && teamList.map((ele) => {
                        return (
                            <div>
                                <li>
                                    <Link to={"/ptlist/"+ele}>{ele}</Link>
                                </li>
                                
                            </div>
                        )
                })}
            </ul>
            <Route path="/ptlist/:teamname" component={PresentationList} exact/>
            
        </>
    )
}

export default TeamList;