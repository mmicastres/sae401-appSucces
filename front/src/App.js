import logo from './logo.svg';
import './App.css';
import axios from 'axios';
import {useEffect, useState} from "react";
import {Login} from "./composents/auth/Login";
import {BrowserRouter, Route, Routes, useLocation, useNavigate} from "react-router-dom";
import {Profile} from "./composents/Profile";
import {Home} from "./composents/Home";

axios.defaults.withCredentials = true;
axios.defaults.withXSRFToken = true;
function App() {
  const [userName, setUserName] = useState("")
    const [loading,setLoading] = useState(true)
  const onRegister = async () => {
    await axios.get("http://localhost:8000/sanctum/csrf-cookie");
    await axios.post("http://localhost:8000/register", {
      nom: "test",
      prenom: "test",
      pseudo:"jpm",
      email: "test@example.com",
      password: "password",
        password_confirmation: "password",
    }, {
      headers: {
        "Accept": "application/json",
      }
    })
  }


    const onLogout = async () => {
        await axios.post("http://localhost:8000/logout", {
        }, {
        headers: {
            "Accept": "application/json",
        }
        })
        setUserName("");
    }
    let location = useLocation();
    const navigate = useNavigate();
    useEffect(() => {

       axios.get("http://localhost:8000/api/me").then((res)=> {
           if (res.status >= 200 && res.status < 300) {

               setUserName(res.data.nom)
               if (["/login","/register"].includes(location.pathname)){
                   navigate("/")
               }
           }
           setLoading(false)
       }).catch((e)=>{
           setLoading(false)
       })
    }, []);
  return (

          <Routes>
              {userName != "" ?
                  <>
                      <Route path={"/profile"} element={<Profile/>}/>
                      <Route path={"/logout"} element={<Logout/>}/>
                  </>
                  :
                  <>
                      <Route path={"/login"} element={<Login/>}/>

                  </>
              }
              <Route path="/" element={<Home/>}/>
          </Routes>
  );
}

export default App;
