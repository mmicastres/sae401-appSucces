import {useEffect} from "react";
import axios from "axios";
import {useNavigate} from "react-router-dom";
import {useToast} from "actify";

export function Logout({setUser}){

    const navigate = useNavigate();
    const toast = useToast();
    useEffect(() => {

    }, []);

    function logout(){
        // clear localStorage + sessions
        localStorage.removeItem("user");
        axios.post(process.env.REACT_APP_API_URL+"/api/logout").then(() => {
            setUser(false);
            toast("success","Vous êtes maintenant déconnecté")
            navigate("/");
        });
        //axios.get(process.env.REACT_APP_API_URL+"/logout").then(() => {
        //    window.location = "/";
        //    navigate("/");
        //});
    }
    return <button onClick={logout}>Logout</button>
}