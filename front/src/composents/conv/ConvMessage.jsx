import {useEffect, useState} from "react";
import axios from "axios";
import {SendHorizonal} from "lucide-react";
import {Button, Card, TextField} from "actify";
import io from 'socket.io-client';
export function ConvMessage({current,user}){
    const [messages, setMessages] = useState([]);
    useEffect(() => {
        axios.get(process.env.REACT_APP_API_URL+"/api/conv/"+current).then((response) => {
            console.log(response.data);
            setMessages(response.data["conversation"]["messages"]);

        })
        const socket = io(process.env.REACT_APP_API_URL+"/api/WSmsg/"+current);
        socket.on('newMessage', (msg) => {
            console.log("newMessage",msg)
            //setMessages([...messages,msg])
        });






    }, [current]);

    function likeMsg(itemId) {
        axios.post(process.env.REACT_APP_API_URL+"/api/conv/" + current + "/" + itemId).then((response) => {
            console.log(response.data);
            setMessages(messages.map((message) => {
                if (message.idMessage == itemId) {
                    return {...message, likes_count: message.likes_count + response.data.status}
                }else{
                    return message
                }
            }));
        })
    }

    function deleteMsg(itemId) {
        axios.delete(process.env.REACT_APP_API_URL+"/api/conv/" + current + "/" + itemId).then((response) => {
            console.log(response.data);
            setMessages(messages.filter((message) => parseInt(message.idMessage) !== parseInt(itemId)));
        })
    }

    return <div style={{flex:1}} className={"flex flex-col h-full pb-4 justify-between"}>
        <ul className={"flex flex-col gap-2"}>
            {messages.map((item)=>(
                <li
                    style={item.userId == user.id ? {alignSelf: "end"} : {alignSelf: "start"}}>
                    <Card className={"p-4 "+(item.userId == user.id ? " bg-primary": "bg-secondary")}>
                        <p>{item.content}</p>
                        <div className={"flex gap-4"}>
                            <Button variant={"elevated"} className={"p-2 px-4"} onClick={()=>likeMsg(item.idMessage)}>Like
                            </Button>
                            {item.userId == user.id ? (
                                    <>
                                        <Button variant={"elevated"} className={"p-2 px-4"}  onClick={()=>{
                                            deleteMsg(item.idMessage)

                                        }}>Suppr
                                        </Button>
                                    </>
                                )
                                :
                                ( <></> )}
                        </div>
                        {
                            item.likes_count > 0 ? <p>{item.likes_count} ❤️</p> : <></>
                        }
                    </Card>

                </li>
            ))}
        </ul>
        <form onSubmit={(e) => {
            e.preventDefault();
            axios.post(process.env.REACT_APP_API_URL+"/api/conv/" + current, {content: e.target[0].value}).then((response) => {
                console.log(response.data);
                setMessages([...messages, response.data["newMessage"]]);
                e.target[0].value = "";
            })
        }}
        className={"flex gap-4 items-center "}
        >
            <TextField className={"flex-1"} placeholder={"message"} variant={"outlined"}/>
            <Button type={"submit"}>Envoyer <SendHorizonal/></Button>
        </form>
    </div>
}