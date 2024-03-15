import {useEffect, useState} from "react";
import axios from "axios";
import {Link} from "react-router-dom";

export function Profile({user}){
    const [success,setSuccess] = useState([]);
    useEffect(() => {
        if (!user) return;
        axios.get("http://localhost:8000/api/user/"+user.id).then((response) => {
            setSuccess(response.data.succes);
            console.log("response",response.data.succes);
        });

    }, [user]);

    return <>
        <Link to={"/"}>{"<"} Home</Link>
        <h1>Profile</h1>
        <h2>Informations</h2>
        <p>Nom: {user.nom}</p>
        <p>Email: {user.email}</p>
        <p>Nombre de succès: {success.length}</p>
        <h2>Success</h2>
        <ul>
            {success.map((item) => (
                <li key={item.idSucces}>
                    <h2>{item.nom}</h2>
                    <p>{item.description}</p>
                </li>
            ))
            }
        </ul>
        </>;
}