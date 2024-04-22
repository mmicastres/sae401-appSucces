import { Link, useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import axios from "axios";
import * as sanitizeHtml from 'sanitize-html'
import {useToast} from "actify";
export function Jeu({ user }) {
    let { id } = useParams();
    const [jeu, setJeu] = useState({ succes: [], joueur: false });
    const [obtenu, setObtenu] = useState();
    const toast = useToast();

    useEffect(() => {
        axios.get(process.env.EXPO_PUBLIC_API_URL + "/api/jeux/" + id).then((response) => {
            if (response.data.jeu.joueur == null) {
                response.data.jeu.joueur = false;
            }
            setJeu(response.data.jeu);
            setObtenu(response.data.jeu.succes);
            //console.log("response", response.data.jeu.succes[0].detenteurs);
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
        axios.post(process.env.EXPO_PUBLIC_API_URL + "/api/jeux/" + id + "/" + action, {
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
                toast("success","Changement effectué");
            }
        });
    }
    return <>
        <h1 className="text-3xl ml-8">Jeu {id}</h1>
        <div className="flex flex-column justify-center">
            <img className="justify-center" src={jeu.image}></img>
        </div>
        <p>Nom: {jeu.nom}</p>
        <p>Description: </p>
        <div dangerouslySetInnerHTML={{ __html: sanitizeHtml(jeu.description) }} ></div>
        <p>Nombre de succès: {jeu.succes.length}</p>
        {jeu.joueur != false ? <div style={{ backgroundColor: "lightgray" }}>
            <h2>Informations joueur</h2>
            <div>
                <p>Actif: {jeu.joueur.actif == 1 ? "Oui" : "Non"}</p>
                <button onClick={() => {
                    handleClick("actif")
                }}>Changer</button>
            </div>
            <div>
                <p>Favori: {jeu.joueur.favori == 1 ? "Oui" : "Non"} </p>
                <button onClick={() => {
                    handleClick("favori")
                }}>Changer</button>
            </div>
            <div>
                <p>Possédé: {jeu.joueur.possede == 1 ? "Oui" : "Non"} </p>
                <button onClick={() => {
                    handleClick("possede")
                }}>Changer</button>
            </div>


            {/*  <p>Favorie: {jeu.joueur.favorie == 1 ? "Oui" : "Non"} </p>
                <p>Note: {jeu.joueur.note ?? 0}</p>
                <p>Possede: {jeu.joueur.possede == 1 ? "Oui" : "Non"} </p>
            */}
        </div>


            : <></>}
        <h2>Succès</h2>
        {jeu.noSuccess ? <h3>Pas de succès</h3> :
            <ul>
                {jeu.succes.map((item) => (
                    <li key={item.idSucces}>
                        <Link to={"/succes/" + item.idSucces} className={"flex"}>
                            <div>
                                <h2>{item.nom}</h2>
                                <p>{item.description}</p>
                            </div>
                        </Link>
                        {item.detenteurs.some((item2) => item2.idUser === user.id) ? (
                            <>
                                <img src={"https://achievementstats.com/" + item.iconUnlocked} alt={item.nom} />
                                <p>Vous avez débloqué ce succès !</p>
                            </>
                        ) : (
                            <>
                                <img src={"https://achievementstats.com/" + item.iconLocked} alt={item.nom} />
                                <p>Vous n'avez pas encore débloqué ce succès</p>
                            </>
                        )}
                    </li>
                ))
                }
            </ul>}
    </>
}