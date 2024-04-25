import {ConvList} from "./ConvList";
import {ConvMessage} from "./ConvMessage";
import {useEffect, useState} from "react";
import {Link, useParams} from "react-router-dom";
import axios from "axios";


export function ConvPage({user}){

    let {current} = useParams();
    let [conv, setConv] = useState([]);
    let [friends,setFriends] = useState([])
    useEffect(() => {
        axios.get(process.env.REACT_APP_API_URL + "/api/conv",{
            headers:{
                "Authorization": "Bearer " + user.token,
            }
        }).then((response) => {
            console.log(response.data);
            setConv(response.data["conversations"]);
            setFriends(response.data["friends"])
        })
    }, []);
    return <>
        <div className={"flex justify-evenly gap-4 h-full"} >
        <ConvList conv={conv} friends={friends} />
            {current ? <ConvMessage current={current} user={user}/> : <div style={{flex:1}}></div> }

    </div></>
}