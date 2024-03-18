import {Link, useParams} from "react-router-dom";
import {useEffect, useState} from "react";
import axios from "axios";

export function Jeu(){
    let {id} = useParams();
    const [jeu,setJeu] = useState({succes:[]});
    useEffect(() => {
        axios.get("http://localhost:8000/api/jeux/"+id).then((response) => {
            setJeu(response.data.jeu);
            console.log("response",response.data);
        });
    }, [id]);
    return <>
        <Link to={"/"}>{"<"} Home</Link>

        <h1>Jeu {id}</h1>
        <h2>Informations</h2>
        <p>Nom: {jeu.nom}</p>
        <p>Description: {jeu.description}</p>
        <p>Nombre de succès: {jeu.succes.length}</p>
        <h2>Success</h2>
        <ul>
            {jeu.succes.map((item) => (
                <li key={item.idSucces}>
                    <Link to={"/succes/"+item.idSucces}>
                    <h2>{item.nom}</h2>
                    <p>{item.description}</p>
                    </Link>
                </li>
            ))
            }
        </ul>
        </>
}