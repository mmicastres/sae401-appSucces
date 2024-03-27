import {useState} from "react";
import {Link} from "react-router-dom";

export function ConvList({conv}){

    return <div><h2>Liste des conv</h2>
    <ul>
        {conv.map((item)=>(
            <li><Link to={"/conv/"+item.idConversation}>{item.titre}</Link></li>
        ))}
    </ul>
    </div>
}