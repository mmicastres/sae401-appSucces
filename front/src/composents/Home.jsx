import { Link } from "react-router-dom";
import { useEffect, useState } from "react";
import axios from "axios";
import { Card, TextField, Button, Switch, IconButton } from "actify";
import { Search } from 'lucide-react'

export function Home({ user }) {
    const [jeux, setJeux] = useState([]);
    const [succes, setSucces] = useState([]);
    const [users, setUsers] = useState([]);
    const [page, setPage] = useState(1);
    const [search, setSearch] = useState("")
    useEffect(() => {
        axios.get(process.env.REACT_APP_API_URL + "/api/jeux?page=" + page + (search !== "" ? "&search=" + search : "")).then((response) => {
            setJeux(response.data.jeux);
            console.log("response", response.data);
        });
    }, [search, page]);

    return <div className={"flex justify-center items-center flex-col w-fit "}>
        <h1 className="text-4xl mb-5">Bienvenue sur Suckc</h1>
        <form className="flex flex-col" onSubmit={(e) => {
            e.preventDefault()
            setSearch(e.target[0].value)
        }}>
            <div className="flex flex-row items-baseline mb-5">
                <TextField variant="outlined" type={"search"} placeholder={"Rechercher..."}>
                    <TextField.TrailingIcon><IconButton><Search /></IconButton></TextField.TrailingIcon>
                </TextField>
                <Button className="ml-3" type={"submit"}>Chercher</Button>
            </div>
            <div className="flex flex-row items-baseline mb-5 gap-3">
                <label className="flex items-center gap-2"><Switch name="jeux" color="primary" type="checkbox" defaultSelected/><span>Jeux</span></label>
                <label className="flex items-center gap-2"><Switch name="succes" color="primary" type="checkbox" /><span>Succès</span></label>
                <label className="flex items-center gap-2"><Switch name="users" color="primary" type="checkbox" /><span>Utilisateurs</span></label>
            </div>
        </form>
        <h2 className="text-2xl mb-3">Jeux</h2>
        <ul className={"flex flex-wrap gap-4 justify-center"}>
            {jeux.map((item) => (
                <li key={item.idJeu} className={"w-1/5"}>
                    <Link to={"/jeu/" + item.idJeu}>
                        <Card className={"relative  rounded-xl"}>
                            <img src={"https://cdn.cloudflare.steamstatic.com/steam/apps/" + item.steamId + "/header.jpg"}
                                alt={"couverture de " + item.nom} />
                            <div className={"p-2 flex items-end text-white absolute bottom-0 left-0 h-full w-full bg-gradient-to-t from-black bg-opacity-50 to-100% to-transparent"}>
                                <h3>{item.nom}</h3>
                            </div>
                        </Card>
                    </Link>
                </li>
            ))
            }
        </ul>


        <div className={"flex"}>
            <Button className="mr-5" onClick={() => {
                if (page != 1) setPage(page - 1)
            }}>Prev</Button>
            <Button onClick={() => {
                setPage(page + 1)
            }}>Next</Button>
        </div>
        {user ? <h1>Connected as {user.pseudo}</h1> : <h1>Not connected</h1>}

    </div>
}