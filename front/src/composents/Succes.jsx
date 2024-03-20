import {Link, useParams} from "react-router-dom";
import {useEffect, useState} from "react";
import axios from "axios";

export function Succes({user}){
    let {id} = useParams();
    const [succes,setSucces] = useState({"jeu":{nom:""}, "commentaires":[]});
    useEffect(() => {
        axios.get(process.env.REACT_APP_API_URL+"/api/succes/"+id).then((response) => {
            setSucces(response.data.succes);
            console.log("response",response.data);
        });
    }, [id]);

    function handleSendComment(event){
        event.preventDefault();
        const data = new FormData(event.target);
        setSucces({...succes, "commentaires":[{"idCommentaire":"-1","titre":data.get("titre"), "content":data.get("commentaire")},...succes.commentaires]});
        axios.post(process.env.REACT_APP_API_URL+"/api/succes/"+id+"/comment", {
            content:data.get("commentaire"),
            titre:data.get("titre")
        }, {
            headers: {
                "Accept": "application/json",
            }
        }).then((response) => {
            if (response.status >= 200 && response.status < 300){
                console.log("response",response.data);
                setSucces({...succes, "commentaires":[response.data.commentaire,...succes.commentaires]})
            }
        });
    }

    function handleModComment(){

    }

    function handleSupComment(e){
console.log("sup",e.target.parentNode.id);
        axios.delete(process.env.REACT_APP_API_URL+"/api/succes/"+id+"/comment/"+e.target.parentNode.id).then((response) => {
            if (response.status >= 200 && response.status < 300){
                console.log("response",response.data);
                setSucces({...succes, "commentaires":succes.commentaires.filter((item) => {
                        console.log(item.idCommentaire, e.target.parentNode.id)
                        console.log(item.idCommentaire !== parseInt(e.target.parentNode.id))
                        return item.idCommentaire !== parseInt(e.target.parentNode.id)
                    })})
            }
        });


    }
    return <>
        <Link to={"/"}>{"<"} Home</Link>

        <h1>Succes {id}</h1>
        <h2>Informations</h2>
        <div>
            <p>Nom: {succes.nom}</p>
            <p>Description: {succes.description}</p>
            <Link to={"/jeu/" + succes.jeu.idJeu}>Jeu : {succes.jeu.nom}</Link>

        </div>
        <h2>Commentaires et aides</h2>
        {user ?
        <form onSubmit={handleSendComment}>
            <label>
                Titre:
                <input type="text" name="titre" />
            </label>
            <label>
                Commentaire:
                <textarea name="commentaire" />
            </label>
            <input type="submit" value="Envoyer" />
        </form>:
            <>
                <p>Vous devez etre authentifier pour poser un commentaire</p>
                <Link to={"/login"}>Login</Link>
            </>
        }
        <ul>
            {succes.commentaires.map((item) => (
                <li id={item.idCommentaire} key={item.idCommentaire}>
                    <h2>{item.titre}</h2>
                    <p>{item.content}</p>
                    <>
                    <button>Up</button>
                        <button>Down</button>
                    </>
                    {item.idUser === user.id ?
                        <>
                        <button idCommentaire={item.idCommentaire} onClick={handleModComment}>Modification</button>
                            <button idCommentaire={item.idCommentaire} onClick={handleSupComment}>Suppression</button>
                        </>
                        :""}
                </li>
            ))
            }
        </ul>

    </>
}