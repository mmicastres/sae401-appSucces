import {useEffect} from "react";
import axios from "axios";
import {useNavigate} from "react-router-dom";

export function Logout(){

    const navigate = useNavigate();
    useEffect(() => {

    }, []);

    function logout(){
        // clear localStorage + sessions
        localStorage.removeItem("user");
        axios.post(process.env.REACT_APP_API_URL+"/logout").then(() => {
            window.location.reload();
        });
        //axios.get(process.env.REACT_APP_API_URL+"/logout").then(() => {
        //    window.location = "/";
        //    navigate("/");
        //});
    }
    return <button onClick={logout}>Logout</button>
}