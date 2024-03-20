import {useEffect, useState} from "react";
import axios from "axios";
import {Link} from "react-router-dom";
import {User} from "./User";

export function Profile({user}){
    const [success,setSuccess] = useState([]);
    const [friends,setFriends] = useState([]);
    const [friendsRequests,setFriendsRequests] = useState([]);
    const [friendsRequestsSent,setFriendsRequestsSent] = useState([]);


    useEffect(() => {
        if (!user) return;
        axios.get(process.env.REACT_APP_API_URL+"/api/user/"+user.id).then((response) => {
            setSuccess(response.data.succes);
            setFriends(response.data.friends);
            setFriendsRequests(response.data.friend_requests);
            setFriendsRequestsSent(response.data.friend_requests_sent);
            console.log("response",response.data.succes);
        });

    }, [user]);

    return <>
        <Link to={"/"}>{"<"} Home</Link>
        <h1>Profile</h1>
        <h2>Informations</h2>
        <p>Nom: {user.nom}</p>
        <p>Email: {user.email}</p>
        <p>Nombre de succès: {success.length}</p>
        <h2>Success</h2>
        <ul>
            {success.map((item) => (
                <li key={item.idSucces}>
                    <h2>{item.nom}</h2>
                    <p>{item.description}</p>
                </li>
            ))
            }
        </ul>
        <h2>Friends</h2>
        <ul>
            {friends.map((item) => (
                <User friend={true} key={item.id} user={item}/>
            ))
            }
        </ul>
        <h2>Friends requests</h2>
        <ul>
            {friendsRequests.map((item) => (
                <User key={item.id} user={item}/>
            ))
            }
        </ul>
        <h2>Friends requests sent</h2>
        <ul>
            {friendsRequestsSent.map((item) => (
                <User key={item.id} user={item}/>
            ))
            }
        </ul>
        </>;
}