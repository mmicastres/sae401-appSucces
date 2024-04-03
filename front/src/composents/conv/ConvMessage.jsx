import {useEffect, useState} from "react";
import axios from "axios";
import {SendHorizonal} from "lucide-react";
import {Button, Card, TextField} from "actify";

export function ConvMessage({current,user}){
    const [messages, setMessages] = useState([]);
    useEffect(() => {
        axios.get(process.env.REACT_APP_API_URL+"/api/conv/"+current).then((response) => {
            console.log(response.data);
            setMessages(response.data["conversation"]["messages"]);

        })

    }, [current]);
    return <div style={{flex:1}} className={"flex flex-col h-full pb-4 justify-between"}>
        <h2>Messages {current}</h2>
        <ul className={"flex flex-col gap-2"}>
            {messages.map((item)=>(
                <li
                    style={item.userId == user.id ? {alignSelf: "end"} : {alignSelf: "start"}}>
                    <Card className={"p-4 "+(item.userId == user.id ? " bg-primary": "bg-secondary")}>
                        <p>{item.content}</p>
                        <div className={"flex gap-4"}>
                            <button idItem={item.idMessage} onClick={(e) => {
                                const itemId = e.target.getAttribute("idItem");
                                axios.post(process.env.REACT_APP_API_URL+"/api/conv/" + current + "/" + itemId).then((response) => {
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
                                            axios.delete(process.env.REACT_APP_API_URL+"/api/conv/" + current + "/" + itemId).then((response) => {
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
                        </div>


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