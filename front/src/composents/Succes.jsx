import { Link, useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import axios from "axios";
import { Button, TextField, IconButton, useToast, ToastProvider, ToastContainer } from 'actify'
import { XCircle, ChevronUp, ChevronDown } from 'lucide-react'

export function Succes({ user }) {
    let { id } = useParams();
    const [succes, setSucces] = useState({ "jeu": { nom: "" }, "commentaires": [] });
    const [obtenu, setObtenu] = useState()
    const [titre, setTitre] = useState("")
    const [commentaire, setCommentaire] = useState("")
    const [modif, setModif] = useState(null)
    const toast = useToast()

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
                    toast('success', 'Vous avez obtenu le succès !')
                });
            } else {
                axios.delete(process.env.REACT_APP_API_URL + "/api/succes/" + id, {
                    headers: {
                        "Accept": "application/json",
                    }
                }).then((response) => {
                    setObtenu(0)
                    toast('error', 'Le succès a été supprimé')
                });
            }
        }
    }

    function changeTitre(e) {
        if (e.target) {
            setTitre(e.target.value)
        }
    }

    function changeCommentaire(e) {
        if (e.target) {
            setCommentaire(e.target.value)
        }
    }

    function clearTitre() {
        setTitre('')
    }

    function clearComment() {
        setCommentaire('')
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
        if (!e || !e.target) return
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
        <h1 className="text-3xl ml-8">Succes {id}</h1>
        <div className="flex justify-around">
            <div className="flex flex-col">
                <div className="flex flex-row items-center">
                    <div>
                        {succes ? (<img className="size-24" src={"https://achievementstats.com/" + succes.iconUnlocked} alt="Icone du succès" />) : (<></>)}
                    </div>
                    <div className="flex flex-col px-2.5">
                        <p className="text-3xl">{succes.nom}</p>
                        <Link className="underline text-violet-700" to={"/jeu/" + succes.jeu.idJeu}>Jeu : {succes.jeu.nom}</Link>
                    </div>
                </div>
                <p>Description : {succes.description}</p>
                <Button className="mt-5" variant="elevated" color="primary" onClick={handleSucces}>{obtenu == 1 ? "Supprimer le succès" : "Ajouter le succès"}</Button>

            </div>
            <div>
                <p>Amis ayant le succès :</p>
                <p>À venir</p>
            </div>
        </div>

        <div className="flex flex-col justify-center items-center">
            <h2 className="text-xl text-center mb-3">Commentaires et aides</h2>
            {user ?
                <form className="size-1/2" onSubmit={handleSendComment}>
                    <TextField className="mb-3" variant="outlined" label="Titre" name="titre" value={titre} onChange={changeTitre}>
                        <TextField.TrailingIcon>
                            <XCircle onClick={() => clearTitre} />
                        </TextField.TrailingIcon>
                    </TextField>
                    <TextField className="mb-3" variant="outlined" label="Commentaire" name="commentaire" value={commentaire} onChange={changeCommentaire}>
                        <TextField.TrailingIcon>
                            <XCircle onClick={() => clearComment} />
                        </TextField.TrailingIcon>
                    </TextField>
                    <Button type="submit" value="Envoyer" variant="elevated" color="primary">Envoyer</Button>
                </form> :
                <>
                    <p>Vous devez etre authentifié pour laisser un commentaire</p>
                    <Link to={"/login"}>Login</Link>
                </>
            }
            <h2 className="text-xl text-center">Tous les commentaires</h2>
            {succes.commentaires.map((item) => (
                <div className="w-max my-5" id={item.idCommentaire} key={item.idCommentaire}>
                    {modif === item.idCommentaire ? (
                        <>
                            <form onSubmit={(event) => handleModComment(event, item.idCommentaire)}>
                                <input type="text" name="titre" defaultValue={item.titre} />
                                <textarea name="content" defaultValue={item.content} />
                                <button type="submit">Enregistrer</button>
                            </form>
                        </>) : (
                        <div>
                            <div className="flex flex-row justify-end">
                                <a className="basis-10/12" href={`/user/${item.user.id}`}>{item.user.pseudo}</a>
                                <ChevronUp className="basis-1/12" />
                                <ChevronDown className="basis-1/12" />
                            </div>
                            <h2 className="font-semibold m-3">{item.titre}</h2>
                            <p className="m-5">{item.content}</p>

                            {item.idUser === user.id ?
                                <div className="flex flex-row flex-end">
                                    <Button idcommentaire={item.idCommentaire} onClick={modComment}>Modification</Button>
                                    <Button idcommentaire={item.idCommentaire} onClick={handleSupComment}>Suppression</Button>
                                </div>
                                : ""}

                        </div>
                    )}
                </div>
            ))
            }
        </div >
        <ToastProvider>
            <ToastContainer />
        </ToastProvider>

    </>
}