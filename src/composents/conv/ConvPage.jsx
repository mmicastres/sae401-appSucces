import {ConvList} from "./ConvList";
import {ConvMessage} from "./ConvMessage";
import {useEffect, useState} from "react";
import {Link, useParams} from "react-router-dom";
import axios from "axios";


export function ConvPage({user}){

    let {current} = useParams();
    let [conv, setConv] = useState([]);
    useEffect(() => {
        axios.get("http://localhost:8000/api/conv").then((response) => {
            console.log(response.data);
            setConv(response.data["conversations"]);
        })
    }, []);
    return <>
        <Link to={"/"}>Back</Link>
        <div style={{display:"flex", justifyContent:"space-evenly",gap:16}}>
        <ConvList conv={conv}/>
            {current && <ConvMessage current={current} user={user}/> }

    </div></>
}