import {useEffect, useState} from "react";
import axios from "axios";
import {SendHorizonal} from "lucide-react";

export function ConvMessage({current,user}){
    const [messages, setMessages] = useState([]);
    useEffect(() => {
        axios.get("http://localhost:8000/api/conv/"+current).then((response) => {
            console.log(response.data);
            setMessages(response.data["conversation"]["messages"]);

        })

    }, []);
    return <div style={{flex:1}}>
        <h2>Messages {current}</h2>
        <ul style={{display:"flex",flexDirection:"column"}}>
            {messages.map((item)=>(
                <li
                    style={item.userId == user.id ? {alignSelf: "end"} : {alignSelf: "start"}}><p>{item.content}</p>
                    <button idItem={item.idMessage} onClick={(e) => {
                        const itemId = e.target.getAttribute("idItem");
                        axios.post("http://localhost:8000/api/conv/" + current + "/" + itemId).then((response) => {
                            console.log(response.data);
                            setMessages(messages.map((message) => {
                               if (message.idMessage == itemId) {
                                   return {...message, likes: message.likes + 1}
                               }else{
                                   return message
                               }
                            }));
                        })
                    }}>Like
                    </button>
                    {item.userId == user.id ? (
                            <>
                                <p>Vous</p>

                                <button idItem={item.idMessage} onClick={(e) => {
                                    const itemId = e.target.getAttribute("idItem");
                                    axios.delete("http://localhost:8000/api/conv/" + current + "/" + itemId).then((response) => {
                                        console.log(response.data);
                                        setMessages(messages.filter((message) => parseInt(message.idMessage) !== parseInt(itemId)));
                                    })
                                }}>Suppr
                                </button>
                            </>
                        )
                        :
                        (
                            <>
                                <p>Autre</p>

                            </>
                        )}

                </li>
            ))}
        </ul>
        <form onSubmit={(e) => {
            e.preventDefault();
            axios.post("http://localhost:8000/api/conv/" + current, {content: e.target[0].value}).then((response) => {
                console.log(response.data);
                setMessages([...messages, response.data["newMessage"]]);
                e.target[0].value = "";
            })
        }}>
            <input type="text" placeholder={"Message..."}/>
            <button type={"submit"}>Envoyer <SendHorizonal/></button>
        </form>
    </div>
}