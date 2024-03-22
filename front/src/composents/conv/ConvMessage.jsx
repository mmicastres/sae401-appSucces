import {useEffect, useState} from "react";
import axios from "axios";

export function ConvMessage({current}){
    const [messages, setMessages] = useState([]);
    useEffect(() => {
        axios.get("http://localhost:8000/api/conv/"+current).then((response) => {
            console.log(response.data);
            setMessages(response.data["conversation"]["messages"]);
        })

    }, []);
    return <>
        <h2>Messages {current}</h2>
        <ul>
            {messages.map((item)=>(
                <li>{item.content}</li>
            ))}
        </ul>
        </>
}