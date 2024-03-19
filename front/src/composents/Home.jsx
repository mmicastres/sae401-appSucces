import {Link} from "react-router-dom";
import {useEffect, useState} from "react";
import axios from "axios";

export function Home({user}){
    const [jeux,setJeux] = useState([]);
    const [page,setPage] = useState(1);
    const [search,setSearch] = useState("")
    useEffect(() => {
        axios.get(process.env.REACT_APP_API_URL+"/api/jeux?page="+page+(search !== "" ? "&search="+search : ""  )).then((response) => {
            setJeux(response.data.jeux);
            console.log("response",response.data);
        });
    }, [search,page]);

    return <>
        <h1>Home page</h1>
        <form onSubmit={(e)=>{
            e.preventDefault()
            setSearch(e.target[0].value)
        }}>
            <input type={"search"} placeholder={"search..."} />
            <button type={"submit"}>Chercher</button>
        </form>
        {user ? <Link to={"/profile"}>Profile</Link> : <Link to={"/login"}>Login</Link>}
        <h2>Jeux</h2>
        <ul>
            {jeux.map((item) => (
                <li key={item.idJeu}>
                    <Link to={"/jeu/" + item.idJeu}>
                        <img src={"https://cdn.cloudflare.steamstatic.com/steam/apps/" + item.steamId + "/header.jpg"}
                             alt={"couverture de " + item.nom}/>
                        <h3>{item.nom}</h3>
                    </Link>
                </li>
            ))
            }
        </ul>

        <div className={"flex"}>
            <button onClick={()=>{
                if (page != 1) setPage(page-1)
            }}>Prev</button>
            <button onClick={()=>{
                setPage(page+1)
            }}>Next</button>
        </div>
        {user ? <h1>Connected as {user.nom}</h1> : <h1>Not connected</h1>}
        <p>env : {process.env.REACT_APP_API_URL}</p>

    </>
}