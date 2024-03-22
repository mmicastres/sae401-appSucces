import { useEffect, useState } from "react";
import axios from "axios";
import { Link } from "react-router-dom";
import { User } from "./User";

export function Profile({ user }) {
    const [joueur, setJoueur] = useState([]);
    const [success, setSuccess] = useState([]);
    const [friends, setFriends] = useState([]);
    const [friendsRequests, setFriendsRequests] = useState([]);
    const [friendsRequestsSent, setFriendsRequestsSent] = useState([]);


    useEffect(() => {
        if (!user) return;
        axios.get(process.env.REACT_APP_API_URL + "/api/user/" + user.id).then((response) => {
            setSuccess(response.data.succes);
            setFriends(response.data.friends);
            setFriendsRequests(response.data.friend_requests);
            setFriendsRequestsSent(response.data.friend_requests_sent);
            setJoueur(response.data.joueur);
            console.log("response", response.data.succes);
        });

    }, [user]);

    return <>
        <Link to={"/"}>{"<"} Home</Link>
        <h1>Profile</h1>
        <h2>Informations</h2>
        <p>Nom: {user.nom}</p>
        <p>Email: {user.email}</p>
        <p>Jeux favoris :</p>
        <ul>
            {joueur.filter(item => item.favori === 1).map(item => (
                <li key={item.idJeu}>
                    <Link to={"/jeu/" + item.idJeu}>
                        <img src={"https://cdn.cloudflare.steamstatic.com/steam/apps/" + item.steamId + "/header.jpg"}
                            alt={"couverture de " + item.nom} />
                        <h3>{item.nom}</h3>
                    </Link>
                </li>
            ))}
        </ul>
        <p>Jeux actifs :</p>
        <ul>
            {joueur.filter(item => item.actif === 1).map(item => (
                <li key={item.idJeu}>
                    <p>{item.idJeu}</p>
                </li>
            ))}
        </ul>
        <p>Jeux possédés :</p>
        <ul>
            {joueur.filter(item => item.possede === 1).map(item => (
                <li key={item.idJeu}>
                    <p>{item.idJeu}</p>
                </li>
            ))}
        </ul>
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
        <h2>Friends</h2>
        <ul>
            {friends.map((item) => (
                <User friend={true} key={item.id} user={item} />
            ))
            }
        </ul>
        <h2>Friends requests</h2>
        <ul>
            {friendsRequests.map((item) => (
                <User key={item.id} user={item} />
            ))
            }
        </ul>
        <h2>Friends requests sent</h2>
        <ul>
            {friendsRequestsSent.map((item) => (
                <User key={item.id} user={item} />
            ))
            }
        </ul>
    </>;
}