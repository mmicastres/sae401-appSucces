import {useEffect} from "react";

export function Logout(){
    useEffect(() => {
        axios.get("https://localhost:8000")
    }, []);
}