import {Link} from "react-router-dom";
import {useEffect, useState} from "react";
import axios from "axios";
import {Card} from "actify";

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

    return <div className={"flex justify-center flex-col w-fit "}>
        <h1 className={"w-fit "}>Home page</h1>
        <form className={"w-fit "} onSubmit={(e)=>{
            e.preventDefault()
            setSearch(e.target[0].value)
        }}>
            <input type={"search"} placeholder={"search..."} />
            <button type={"submit"}>Chercher</button>
        </form>
        {user ? <Link className={"w-fit "} to={"/profile"}>Profile</Link> : <Link className={"w-fit "} to={"/login"}>Login</Link>}
        <h2 className={"w-fit "}>Jeux</h2>
        <ul className={"flex flex-wrap gap-4 w-1/3"}>
            {jeux.map((item) => (
                <li key={item.idJeu} className={"w-1/5"}>
                    <Link to={"/jeu/" + item.idJeu}>
                        <Card className={"relative  rounded-xl"}>
                        <img src={"https://cdn.cloudflare.steamstatic.com/steam/apps/" + item.steamId + "/header.jpg"}
                             alt={"couverture de " + item.nom}/>
                            <div className={"p-2 flex items-end text-white absolute bottom-0 left-0 h-full w-full bg-gradient-to-t from-black bg-opacity-50 to-100% to-transparent"}>
                                <h3>{item.nom}</h3>
                            </div>
                        </Card>
                    </Link>
                </li>
            ))
            }
        </ul>

        <div className={"flex w-fit"}>
            <button onClick={()=>{
                if (page != 1) setPage(page-1)
            }}>Prev</button>
            <button onClick={()=>{
                setPage(page+1)
            }}>Next</button>
        </div>


    </div>
}