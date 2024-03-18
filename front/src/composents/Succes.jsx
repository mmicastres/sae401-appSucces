import {Link, useParams} from "react-router-dom";
import {useEffect, useState} from "react";
import axios from "axios";

export function Succes(){
    let {id} = useParams();
    const [succes,setSucces] = useState({"jeu":{nom:""}});
    useEffect(() => {
        axios.get("http://localhost:8000/api/succes/"+id).then((response) => {
            setSucces(response.data.succes);
            console.log("response",response.data);
        });
    }, [id]);
    return <>
        <Link to={"/"}>{"<"} Home</Link>

        <h1>Succes {id}</h1>
        <h2>Informations</h2>
        <p>Nom: {succes.nom}</p>
        <p>Description: {succes.description}</p>
        <Link to={"/jeu/"+succes.jeu.idJeu}>Jeu : {succes.jeu.nom}</Link>
        </>
}