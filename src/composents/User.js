import {Link} from "react-router-dom";

export function User({user,friend=false}){
    return <>
        {friend ? <Link to={"/conv/" + user.id}>
                <div>{user.pseudo}</div>
            </Link>
            :
            <div>{user.pseudo}</div>
        }
            </>
        }