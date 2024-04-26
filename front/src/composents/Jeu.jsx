import { Link, useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import axios from "axios";
import * as sanitizeHtml from 'sanitize-html'
import { useToast, Button, Card, LinearProgress } from "actify";

export function Jeu({ user }) {
    let { id } = useParams();
    const [jeu, setJeu] = useState({ succes: [], joueur: false });
    const [obtenu, setObtenu] = useState();
    const toast = useToast();

    useEffect(() => {
        axios.get(process.env.REACT_APP_API_URL + "/api/jeux/" + id).then((response) => {
            if (response.data.jeu.joueur == null) {
                response.data.jeu.joueur = false;
            }
            { user ? response.data.jeu.nbObtenues = response.data.jeu.succes.filter((item) => item.detenteurs.some((item2) => item2.idUser === user.id)).length : <></> }
            response.data.jeu.nbSuccess = response.data.jeu.succes.length;
            setJeu(response.data.jeu);
            setObtenu(response.data.jeu.succes);
        });
    }, [id]);

    function handleClick(action) {
        // changement du visuel
        let joueur = jeu.joueur;
        switch (action) {
            case "actif":
                joueur.actif = jeu.joueur.actif == 1 ? 0 : 1
                break;
            case "favori":
                joueur.favori = jeu.joueur.favori == 1 ? 0 : 1
                break;
            case "possede":
                joueur.possede = jeu.joueur.possede == 1 ? 0 : 1
                break;
        }

        setJeu({ ...jeu, joueur: joueur })
        // changement en base
        axios.post(process.env.REACT_APP_API_URL + "/api/jeux/" + id + "/" + action, {
            actif: joueur.actif,
            favori: joueur.favori,
            possede: joueur.possede
        }, {
            headers: {
                "Accept": "application/json",
            }
        }).then((response) => {
            if (response.status >= 200 && response.status < 300 && response.data.joueur) {
                // correction du visuel
                setJeu({ ...jeu, joueur: response.data.joueur });
                toast("success", "Changement effectué");
            }
        });
    }

    console.log("Jeu : ", jeu)
    return <>
        <div className={"flex justify-evenly items-center"}>
            <h2 className="text-3xl mt-3 mb-3 flex justify-center">{jeu.nom}</h2>
            {jeu.joueur != false ?
                <div className={"flex items-center gap-4 "}>
                    <progress className={"h-8 w-64 rounded-2xl border border-black border-2"} max={100} value={(jeu.nbObtenues / jeu.nbSuccess) * 100} />
                    Completed {jeu.nbObtenues} / {jeu.nbSuccess}</div> : <></>}
        </div>
        <div className="flex flex-col w-2/3 m-auto justify-center">
            <img className="justify-center" src={jeu.image}></img>

        </div>
        <div className="ml-3">
            <p className="mb-2 text-xl">Description :</p>
            <div id="description" dangerouslySetInnerHTML={{ __html: sanitizeHtml(jeu.description) }} ></div>
            <p>Nombre de succès : {jeu.succes.length}</p>
            {jeu.joueur != false ?
                <div className="mb-3 flex flex-col justify-center content-center">
                    <h2 className="text-xl mt-3 mb-3">Informations joueur</h2>
                    <div className="flex flex-row gap-4">
                        <div className="flex flex-row items-center gap-2">
                            <p>Actif :</p>
                            <Button onClick={() => {
                                handleClick("actif")
                            }}>{jeu.joueur.actif == 1 ? "Oui" : "Non"}</Button>
                        </div>
                        <div className="flex flex-row items-center gap-2">
                            <p>Favori :</p>
                            <Button onClick={() => {
                                handleClick("favori")
                            }}>{jeu.joueur.favori == 1 ? "Oui" : "Non"}</Button>
                        </div>
                        <div className="flex flex-row items-center gap-2">
                            <p>Possédé :</p>
                            <Button onClick={() => {
                                handleClick("possede")
                            }}>{jeu.joueur.possede == 1 ? "Oui" : "Non"}</Button>
                        </div>
                    </div>
                </div>


                : <p>Vous devez être connecté pour enregistrer votre progression</p>}
            <h2 className="text-xl mb-3">Tous les succès</h2>
            {jeu.noSuccess ? <h3>Pas de succès</h3> :
                <ul className="flex flex-row grid grid-cols-4 gap-4">
                    {jeu.succes.map((item) => (
                        <li key={item.idSucces}>
                            <Link to={"/succes/" + item.idSucces} className={"flex"}>
                                <Card className="p-5">
                                    <div>
                                        <h2>{item.nom}</h2>
                                        <p>{item.description}</p>
                                    </div>
                                    {user ? (
                                        <>
                                            {item.detenteurs.some((item2) => item2.idUser === user.id) ? (
                                                <>
                                                    <img className="pt-2 pb-2" src={"https://achievementstats.com/" + item.iconUnlocked} alt={item.nom} />
                                                    <p>Vous avez débloqué ce succès !</p>
                                                </>
                                            ) : (
                                                <>
                                                    <img className="pt-2 pb-2" src={"https://achievementstats.com/" + item.iconLocked} alt={item.nom} />
                                                    <p>Vous n'avez pas encore débloqué ce succès</p>
                                                </>
                                            )}
                                        </>
                                    ) : <><img className="pt-2 pb-2" src={"https://achievementstats.com/" + item.iconLocked} alt={item.nom} />
                                        <p>Connectez-vous pour enregistrer ce succès</p></>}
                                </Card>
                            </Link>
                        </li>
                    ))
                    }
                </ul>}
        </div>
    </>
}