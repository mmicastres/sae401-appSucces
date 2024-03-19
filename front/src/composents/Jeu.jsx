import {Link, useParams} from "react-router-dom";
import {useEffect, useState} from "react";
import axios from "axios";

export function Jeu({user}){
    let {id} = useParams();
    const [jeu,setJeu] = useState({succes:[],joueur:false});

    useEffect(() => {
        axios.get(process.env.REACT_APP_API_URL+"/api/jeux/"+id).then((response) => {
            if (response.data.jeu.joueur == null){
                response.data.jeu.joueur = false;
            }
            setJeu(response.data.jeu);
            console.log("response",response.data);
        });
    }, [id]);

    function handleClick(action){
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

        setJeu({...jeu,joueur:joueur})
        // changemet en base
        axios.post(process.env.REACT_APP_API_URL+"/api/jeux/"+id+"/"+action, {
            actif:joueur.actif,
            favori:joueur.favori,
            possede:joueur.possede
        }, {
            headers: {
                "Accept": "application/json",
            }
        }).then((response) => {
            if (response.status >= 200 && response.status < 300 && response.data.joueur){
                // correction du visuel
                setJeu({...jeu,joueur:response.data.joueur});
            }
        });
    }
    return <>
        <Link to={"/"}>{"<"} Home</Link>

        <h1>Jeu {id}</h1>
        <h2>Informations</h2>
        <p>Nom: {jeu.nom}</p>
        <p>Description: {jeu.description}</p>
        <p>Nombre de succès: {jeu.succes.length}</p>
        {jeu.joueur != false ? <div style={{backgroundColor:"lightgray"}}>
            <h2>Informations joueur</h2>
                <div>
                    <p>Actif: {jeu.joueur.actif == 1 ? "Oui" : "Non"}</p>
        <button onClick={()=>{
            handleClick("actif")
        }}>Changer</button>
                </div>
            <div>
                <p>Favorie: {jeu.joueur.favori == 1 ? "Oui" : "Non"} </p>
                <button onClick={()=>{
                    handleClick("favori")
                }}>Changer</button>
            </div>
            <div>
                <p>Possede: {jeu.joueur.possede == 1 ? "Oui" : "Non"} </p>
                <button onClick={()=>{
                    handleClick("possede")
                }}>Changer</button>
            </div>


                {/*  <p>Favorie: {jeu.joueur.favorie == 1 ? "Oui" : "Non"} </p>
                <p>Note: {jeu.joueur.note ?? 0}</p>
                <p>Possede: {jeu.joueur.possede == 1 ? "Oui" : "Non"} </p>
            */}
              </div>


            : <></>}
        <h2>Success</h2>
        {jeu.noSuccess ? <h3>Pas de succes</h3> :
        <ul>
            {jeu.succes.map((item) => (
                <li key={item.idSucces}>
                    <Link to={"/succes/"+item.idSucces} className={"flex"}>

                        <img src={"https://achievementstats.com/"+item.iconUnlocked} alt={item.nom} />
                        <div>
                            <h2>{item.nom}</h2>
                            <p>{item.description}</p>
                        </div>
                    </Link>
                </li>
            ))
            }
        </ul>}
        </>
}