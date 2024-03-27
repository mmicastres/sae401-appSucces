import {Link} from "react-router-dom";

export function User({user,friend=false}){
    return <>
        <Link to ={"/user/" + user.id}>
        <p>{user.pseudo}</p>
        </Link>
        {friend ? <Link to={"/conv/" + user.id}>
                <button>Envoyer un message</button>
            </Link>
            :
            null
        }
            </>
        }