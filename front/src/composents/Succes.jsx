import { Link, useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import axios from "axios";
import { Button, TextField, IconButton } from 'actify'
import { XCircle } from 'lucide-react'

export function Succes({ user }) {
    let { id } = useParams();
    const [succes, setSucces] = useState({ "jeu": { nom: "" }, "commentaires": [] });
    const [obtenu, setObtenu] = useState()
    const [modif, setModif] = useState(null)

    useEffect(() => {
        axios.get(process.env.REACT_APP_API_URL + "/api/succes/" + id).then((response) => {
            setSucces(response.data.succes);
        });
        if (user && user.id) {
            axios.get(process.env.REACT_APP_API_URL + "/api/user/" + user.id).then((response) => {
                const succesObtenu = response.data.succes.find((element) => element.idSucces == id)
                console.log("succesObtenu", succesObtenu)
                succesObtenu != undefined ? setObtenu(1) : setObtenu(0);
            });
        }
    }, [id]);
    console.log(obtenu)

    function handleSucces(event) {
        event.preventDefault();
        if (user && user.id) {
            if (obtenu == 0) {
                axios.post(process.env.REACT_APP_API_URL + "/api/succes/" + id, {
                    headers: {
                        "Accept": "application/json",
                    }
                }).then((response) => {
                    setObtenu(1)
                });
            } else {
                axios.delete(process.env.REACT_APP_API_URL + "/api/succes/" + id, {
                    headers: {
                        "Accept": "application/json",
                    }
                }).then((response) => {
                    setObtenu(0)
                });
            }
        }
    }

    function handleSendComment(event) {
        event.preventDefault();
        const data = new FormData(event.target);
        setSucces({ ...succes, "commentaires": [{ "idCommentaire": "-1", "titre": data.get("titre"), "content": data.get("commentaire") }, ...succes.commentaires] });
        axios.post(process.env.REACT_APP_API_URL + "/api/succes/" + id + "/comment", {
            content: data.get("commentaire"),
            titre: data.get("titre")
        }, {
            headers: {
                "Accept": "application/json",
            }
        }).then((response) => {
            if (response.status >= 200 && response.status < 300) {
                console.log("response", response.data);
                setSucces({ ...succes, "commentaires": [response.data.commentaire, ...succes.commentaires] })
            }
        });
    }

    function modComment(item) {
        console.log(item)
        setModif(item.idCommentaire);
    }

    function handleModComment(event, idcommentaire) {
        event.preventDefault();
        const data = new FormData(event.target);

        const updatedCommentaires = succes.commentaires.map((item) => {
            if (item.idCommentaire === idcommentaire) {
                return {
                    ...item,
                    titre: data.get("titre"),
                    content: data.get("content"),
                };
            }
            return item;
        });

        setSucces({ ...succes, commentaires: updatedCommentaires });
        setModif(null);
    }

    function handleSupComment(e) {
        console.log("sup", e.target.parentNode.id);
        axios.delete(process.env.REACT_APP_API_URL + "/api/succes/" + id + "/comment/" + e.target.parentNode.id).then((response) => {
            if (response.status >= 200 && response.status < 300) {
                console.log("response", response.data);
                setSucces({
                    ...succes, "commentaires": succes.commentaires.filter((item) => {
                        console.log(item.idCommentaire, e.target.parentNode.id)
                        console.log(item.idCommentaire !== parseInt(e.target.parentNode.id))
                        return item.idCommentaire !== parseInt(e.target.parentNode.id)
                    })
                })
            }
        });


    }
    return <>
        <Link to={"/"}>{"<"} Home</Link>

        <h1 class="text-3xl">Succes {id}</h1>
        <div class="flex justify-around">
            <div class="flex flex-row">
                <div>
                    {succes ? (<img src={"https://achievementstats.com/" + succes.iconUnlocked} alt="Icone du succès" />) : (<></>)}
                </div>
                <div class="flex flex-col">
                    <p class="text-3xl">{succes.nom}</p>
                    <Link to={"/jeu/" + succes.jeu.idJeu}>Jeu : {succes.jeu.nom}</Link>
                </div>
            </div>
            <div>
                <p>Amis ayant le succès :</p>
            </div>
        </div>
        <p>Description: {succes.description}</p>

        <Button variant="elevated" color="primary" onClick={handleSucces}>{obtenu == 1 ? "Supprimer le succès" : "Ajouter le succès"}</Button>

        <div class="flex flex-col justify-center">
            <h2>Commentaires et aides</h2>
            {user ?
                <form onSubmit={handleSendComment}>
                    <TextField label="Titre" name="titre" >
                        <TextField.TrailingIcon>
                            <XCircle />
                        </TextField.TrailingIcon>
                    </TextField>
                    <TextField label="Commentaire" name="commentaire" >
                        <TextField.TrailingIcon>
                            <XCircle />
                        </TextField.TrailingIcon>
                    </TextField>
                    <Button type="submit" value="Envoyer" variant="elevated" color="primary">Envoyer</Button>
                </form> :
                <>
                    <p>Vous devez etre authentifié pour laisser un commentaire</p>
                    <Link to={"/login"}>Login</Link>
                </>
            }

            <ul>
                {succes.commentaires.map((item) => (
                    <li id={item.idCommentaire} key={item.idCommentaire}>
                        {modif === item.idCommentaire ? (
                            <>
                                <form onSubmit={(event) => handleModComment(event, item.idCommentaire)}>
                                    <input type="text" name="titre" defaultValue={item.titre} />
                                    <textarea name="content" defaultValue={item.content} />
                                    <button type="submit">Enregistrer</button>
                                </form>
                            </>) : (
                            <>
                                <div>
                                    <h2>{item.titre}</h2>
                                    <a href={`/user/${item.user.id}`}>{item.user.pseudo}</a>
                                </div>
                                <p>{item.content}</p>

                                <button>Up</button>
                                <button>Down</button>

                                {item.idUser === user.id ?
                                    <>
                                        <button idcommentaire={item.idCommentaire} onClick={modComment}>Modification</button>
                                        <button idcommentaire={item.idCommentaire} onClick={handleSupComment}>Suppression</button>
                                    </>
                                    : ""}
                            </>)}

                    </li>
                ))
                }
            </ul>
        </div>

    </>
}