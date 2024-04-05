import { Link } from "react-router-dom";
import { Button } from 'actify';

export function User({ user, friend }) {
    return <div className="flex flex-row align-start items-center gap-5 mb-4">
        <img className="size-20" src={`http://localhost:8000/storage/imgprofile/${user.picture}`} />
        <Link to={"/user/" + user.id}>
            <p>{user.pseudo}</p>
        </Link>
        <Link to={"/conv/" + user.id}>
            <Button>Envoyer un message</Button>
        </Link>
    </div>
}