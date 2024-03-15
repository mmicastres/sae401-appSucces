import {Link, useParams} from "react-router-dom";

export function Jeu(){
    let {id} = useParams();
    return <>
        <Link to={"/"}>{"<"} Home</Link>

        <h1>Jeu {id}</h1>
        </>
}