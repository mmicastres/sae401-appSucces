import {useEffect} from "react";
import axios from "axios";
import {useNavigate} from "react-router-dom";
import {Button, useToast} from "actify";

export function Logout({setUser}){

    const navigate = useNavigate();
    const toast = useToast();
    useEffect(() => {

    }, []);

    function logout(){
        // clear localStorage + sessions
        localStorage.removeItem("user");
        localStorage.removeItem("token");
        axios.post(process.env.REACT_APP_API_URL+"/api/logout").then(() => {
            setUser(false);

            localStorage.removeItem("user");
            localStorage.removeItem("token");
            toast("success","Vous êtes maintenant déconnecté")
            navigate("/");
        });
        //axios.get(process.env.REACT_APP_API_URL+"/logout").then(() => {
        //    window.location = "/";
        //    navigate("/");
        //});
    }
    return <div className={"flex flex-col justify-center w-1/3 center h-screen m-auto  "}>
        <h1>Voulez vous vraiment vous déconnecter ?</h1>
        <Button variant={"filled"} onClick={logout}>Logout</Button>
    </div>
}