import axios from "axios";
import { useEffect } from "react";


function PresentorDetail({presentor})
{
    console.log(presentor.ptName);
    useEffect( ()=> {
        
    },presentor)

    return (
        <>
            <h1>{presentor && presentor.ptName}</h1>
        </>
    )
}

export default PresentorDetail;