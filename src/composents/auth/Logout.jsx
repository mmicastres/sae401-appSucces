import {useEffect} from "react";
import axios from "axios";
import {useNavigate} from "react-router-dom";

export function Logout(){

    const navigate = useNavigate();
    useEffect(() => {
        axios.get(process.env.REACT_APP_API_URL+"/logout").then(() => {
            window.location = "/";
            navigate("/");
        });

    }, []);
    return <h1>Logout</h1>
}