import { useEffect, useState } from "react";
import axios from "axios";
import { Link, useParams } from "react-router-dom";
import { User } from "./User";

export function Profile({ user }) {
    const { id } = useParams();
    const [profile, setProfile] = useState();
    const [joueur, setJoueur] = useState([]);
    const [success, setSuccess] = useState([]);
    const [friends, setFriends] = useState([]);
    const [friendsRequests, setFriendsRequests] = useState([]);
    const [friendsRequestsSent, setFriendsRequestsSent] = useState([]);


    useEffect(() => {
        if (id && id !== user.id) {
            axios.get(process.env.REACT_APP_API_URL + "/api/user/" + id).then((response) => {
                setSuccess(response.data.succes);
                setFriends(response.data.friends);
                setJoueur(response.data.joueur);
                setProfile(response.data);

                console.log("response", response.data.succes);
            });

        } else {
            if (!user || !user.id) return;
            console.log("USER ID", user["id"])
            axios.get(process.env.REACT_APP_API_URL + "/api/user/" + user.id).then((response) => {
                setSuccess(response.data.succes);
                setFriends(response.data.friends);
                setFriendsRequests(response.data.friend_requests);
                setFriendsRequestsSent(response.data.friend_requests_sent);
                setJoueur(response.data.joueur);
                setProfile(user);

                console.log("response", response.data.succes);
            });
        }


    }, [user]);

    return <>
        <Link to={"/"}>{"<"} Home</Link>
        <h1>Profile</h1>
        <h2>Informations</h2>
        <p>Nom: {profile?.nom}</p>
        <p>Email: {profile?.email}</p>
        <p>Jeux favoris :</p>
        <ul>
            {joueur.filter(item => item.favori === 1).map(item => (
                <li key={item.idJeu}>
                    {console.log(item)}
                    <Link to={"/jeu/" + item.idJeu}>
                        <img src={item.jeu.image}
                            alt={"couverture de " + item.jeu.nom} />
                        <h3>{item.nom}</h3>
                    </Link>
                </li>
            ))}
        </ul>
        <p>Jeux actifs :</p>
        <ul>
            {joueur.filter(item => item.actif === 1).map(item => (
                <li key={item.idJeu}>
                    <Link to={"/jeu/" + item.idJeu}>
                        <img src={item.jeu.image}
                            alt={"couverture de " + item.jeu.nom} />
                        <h3>{item.nom}</h3>
                    </Link>
                </li>
            ))}
        </ul>
        <p>Jeux possédés :</p>
        <ul>
            {joueur.filter(item => item.possede === 1).map(item => (
                <li key={item.idJeu}>
                    <Link to={"/jeu/" + item.idJeu}>
                        <img src={item.jeu.image}
                            alt={"couverture de " + item.jeu.nom} />
                        <h3>{item.nom}</h3>
                    </Link>
                </li>
            ))}
        </ul>
        <h2>Success</h2>
        <p>Nombre de succès: {success.length}</p>
        <ul>
            {success.map((item) => (
                <li key={item.idSucces}>
                    <Link to={"/succes/" + item.idSucces} className={"flex"}>
                        <img src={"https://achievementstats.com/" + item.iconUnlocked} alt={item.nom} />
                        <div>
                            <h2>{item.nom}</h2>
                            <p>{item.description}</p>
                        </div>
                    </Link>
                </li>
            ))
            }
        </ul>
        <h2>Friends</h2>
        <ul>
            {friends.map((item) => (
                <User friend={user.id == id ? true : false} key={item.id} user={item} />
            ))
            }
        </ul>
        {user.id == id ? (
            <>
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
            </>
        ) : <></>}

    </>;
}