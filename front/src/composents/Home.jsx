import {Link} from "react-router-dom";
import {useEffect, useState} from "react";
import axios from "axios";

export function Home({user}){
    const [jeux,setJeux] = useState([]);
    useEffect(() => {
        axios.get(process.env.REACT_APP_API_URL+"/api/jeux").then((response) => {
            setJeux(response.data.jeux);
            console.log("response",response.data);
        });
    }, []);

    return <>
        <h1>Home page</h1>
        {user ? <Link to={"/profile"}>Profile</Link> : <Link to={"/login"}>Login</Link>}
        <h2>Jeux</h2>
        <ul>
            {jeux.map((item) => (
                <li key={item.idJeu}>
                    <Link to={"/jeu/"+item.idJeu}>
                        <img src={"https://cdn.cloudflare.steamstatic.com/steam/apps/"+item.steamId+"/header.jpg"} alt={"couverture de "+item.nom}/>
                        <h3>{item.nom}</h3>
                    </Link>
                </li>
            ))
            }
        </ul>
        {user ? <h1>Connected as {user.nom}</h1>:<h1>Not connected</h1>}

        </>
}