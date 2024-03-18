import {useEffect} from "react";
import axios from "axios";
import {useNavigate} from "react-router-dom";

export function Logout(){

    const navigate = useNavigate();
    useEffect(() => {
        axios.get("https://localhost:8000/logout").then(() => {
            window.location = "/";
            navigate("/");
        });

    }, [navigate]);
    return <h1>Logout</h1>
}