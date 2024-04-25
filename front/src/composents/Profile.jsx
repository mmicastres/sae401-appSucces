import { useEffect, useState } from "react";
import axios from "axios";
import { Link, useParams } from "react-router-dom";
import { User } from "./User";
import { useNavigate } from "react-router-dom";
import { Button, TextField, IconButton, useToast, ToastProvider, ToastContainer, Card } from 'actify'
import { XCircle, ChevronUp, ChevronDown, Plus, Minus, Loader, Check } from 'lucide-react'

export function Profile({ user }) {
    const { id } = useParams();
    const [profile, setProfile] = useState();
    const [joueur, setJoueur] = useState([]);
    const [success, setSuccess] = useState([]);
    const [friends, setFriends] = useState([]);
    const [friendsRequests, setFriendsRequests] = useState([]);
    const [friendsRequestsSent, setFriendsRequestsSent] = useState([]);
    const [file, setFile] = useState({})
    const navigate = useNavigate()
    const toast = useToast()


    useEffect(() => {
        if ((user && id) && (id !== user.id)) {
            axios.get(process.env.REACT_APP_API_URL + "/api/user/" + id,
                {headers: {
                    "Authorization": "Bearer " + user.token,
                    }
                    }
                ).then((response) => {
                setSuccess(response.data.succes);
                setFriends(response.data.friends);
                setJoueur(response.data.joueur);
                setProfile(response.data);
            });

        } else {
            if (!user || !user.id) return;
            console.log("USER ID", user["id"])
            axios.get(process.env.REACT_APP_API_URL + "/api/user/" + user.id,{
                headers: {
                    "Authorization": "Bearer " + user.token,
                }
            }).then((response) => {
                setSuccess(response.data.succes);
                setFriends(response.data.friends);
                setFriendsRequests(response.data.friend_requests);
                setFriendsRequestsSent(response.data.friend_requests_sent);
                setJoueur(response.data.joueur);
                setProfile(user);
            });
        }


    }, [user]);
    console.log(friendsRequests)
    console.log(friendsRequestsSent)
    function ajoutAmi() {
        axios.post(process.env.REACT_APP_API_URL + "/api/user/" + id + "/friend",{},{
            headers: {
                "Authorization": "Bearer " + user.token,
            }
        }).then((response) => {
            //navigate("/profile/" + id)
            setProfile({ ...joueur, isFriendRequestSent: !joueur.isFriendRequestSent })
            toast("success", response.data.message, 5000)

        });
    }

    const handleChangeFile = (event) => {
        setFile(event.target.files[0])
    }

    function handlePdp(event) {
        event.preventDefault()
        let formData = new FormData()
        formData.append("avatar", file)
        axios.post(process.env.REACT_APP_API_URL + "/api/user/" + user.id + "/profilepicture", formData, {
            headers: {
                "Accept": "application/json",
                'Content-Type': 'multipart/form-data',
                "Authorization": "Bearer " + user.token,
            }
        }).then((response) => {
            setProfile(user)
        });
    }

    return <>
        <div className="m-5 flex flex-row justify-start align-baseline">
            <div className="flex flex-col align-center justify-center w-1/4 mr-5">
                {profile ? (<img className="rounded-full object-cover size-64 w-64 mb-2" src={`${process.env.REACT_APP_API_URL}/storage/imgprofile/${profile.picture}`} alt="Profile picture" />) : (<></>)}
                {!id || user?.id == id ?
                    <form method="POST" className="flex flex-row justify-center" encType="multipart/form-data" onSubmit={handlePdp}>
                        <input className="mr-2" type="file" id="avatar" name="avatar" accept="image/png, image/jpeg, image/jpg, image/gif" onChange={handleChangeFile} />
                        <Button type="submit" value="Valider">Envoyer</Button>
                    </form> : <></>}
            </div>
            <div className="flex flex-col justify-center w-1/4">
                <p className="text-5xl mb-5">{profile?.pseudo}</p>
                {user ? (profile && user.id != profile.id ?
                    <Button className="w-1/2" onClick={ajoutAmi}>
                        {profile?.isFriendRequestSent ? "En attente d'ajout" :
                            profile?.isFriendRequest ? "Accepter la demande d'ami" :
                                profile?.isFriend ? "Retirer l'ami" : "Ajouter l'ami"}
                    </Button>
                    : <></>) : <><Button className="w-1/2" onClick={()=>{navigate("/login")}}>Login to add Friend</Button></>}
            </div>
        </div>
        <div className="flex flex-row">
            <div className="m-5 w-1/4">
                <p className="text-xl mb-2">Jeux favoris :</p>
                <ul>
                    {joueur.filter(item => item.favori === 1).map(item => (
                        <li className="mb-3" key={item.idJeu}>
                            <Link to={"/jeu/" + item.idJeu}>
                                <img src={item.jeu.capsule}
                                    alt={"couverture de " + item.jeu.nom} />
                                <h3>{item.nom}</h3>
                            </Link>
                        </li>
                    ))}
                </ul>
                <p className="text-xl mb-2">Jeux actifs :</p>
                <ul>
                    {joueur.filter(item => item.actif === 1).map(item => (
                        <li className="mb-3" key={item.idJeu}>
                            <Link to={"/jeu/" + item.idJeu}>
                                <img src={item.jeu.capsule}
                                    alt={"couverture de " + item.jeu.nom} />
                                <h3>{item.nom}</h3>
                            </Link>
                        </li>
                    ))}
                </ul>
                <p className="text-xl mb-2">Jeux possédés :</p>
                <ul>
                    {joueur.filter(item => item.possede === 1).map(item => (
                        <li className="mb-3" key={item.idJeu}>
                            <Link to={"/jeu/" + item.idJeu}>
                                <img src={item.jeu.capsule}
                                    alt={"couverture de " + item.jeu.nom} />
                                <h3>{item.nom}</h3>
                            </Link>
                        </li>
                    ))}
                </ul>
            </div>
            <div className="flex flex-col align-center w-3/4 gap-2">
                <div>
                    <h2 className="text-2xl mb-3">Nombre de succès : {success.length}</h2>
                    <ul className="flex flex-row grid grid-cols-4 gap-4">
                        {success.map((item) => (
                            <li key={item.idSucces}>
                                <Card className="p-5 succes-card">
                                    <Link to={"/succes/" + item.idSucces} className={"flex justify-center"}>
                                        <img className="mr-2" src={"https://achievementstats.com/" + item.iconUnlocked} alt={item.nom} />
                                        <div>
                                            <h2>{item.nom}</h2>
                                            <p>{item.description}</p>
                                        </div>
                                    </Link>
                                </Card>
                            </li>
                        ))
                        }
                    </ul>
                </div>
                <div>
                    <h2 className="text-2xl mb-3">Amis</h2>
                    <ul>
                        {friends.map((item) => (
                            <User friend={user?.id == id ? true : false} key={item.id} user={item} />
                        ))
                        }
                    </ul>
                </div>
                {!id || user?.id == id ? (
                    <>
                        { (friendsRequests != undefined && friendsRequests?.length == 0) ? (
                            <p className="text-2xl mb-3">Pas de demandes d'ami</p>
                        ) : (<><h2 className="text-2xl mb-3">Demandes d'amis</h2>
                            <ul>
                                {friendsRequests?.map((item) => (
                                    <User key={item.id} user={item} />
                                ))
                                }
                            </ul></>)}
                        {(friendsRequestsSent && friendsRequestsSent?.length == 0) ? (
                            <p className="text-2xl mb-3">Pas de demandes envoyées</p>
                        ) : (<>
                            <h2 className="text-2xl mb-3">Demandes envoyées</h2>
                            <ul>
                                {friendsRequestsSent?.map((item) => (
                                    <User key={item.id} user={item} />
                                ))
                                }
                            </ul>
                        </>)}
                    </>
                ) : <></>}
            </div>
        </div>
    </>;
}