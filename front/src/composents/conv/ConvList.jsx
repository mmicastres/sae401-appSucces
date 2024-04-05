import {useState} from "react";
import {Link, useNavigate} from "react-router-dom";
import {Button, List, ListItem} from "actify";
import {CreateConv} from "../modals/CreateConv";

export function ConvList({conv,friends}){
    const [open,setOpen] = useState(false)
    const navigate = useNavigate();
    return <div className={"min-w-1/3 border-2 border-violet-50 border-r-violet-200" +
        ""}>
        {open ? <CreateConv friends={friends} open={open} setOpen={setOpen}/>:null}
        <Button  className="m-5" variant={"filled"} onClick={()=>{setOpen(!open);}}>Nouvelle conversation</Button>
    <List>
        {conv.map((item)=>(
            <ListItem onClick={()=>{navigate("/conv/"+item.idConversation)}}>{item.titre}</ListItem>
        ))}
    </List>
    </div>
}