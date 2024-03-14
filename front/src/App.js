import logo from './logo.svg';
import './App.css';
import axios from 'axios';
import {useEffect, useState} from "react";
import {Login} from "./composents/auth/Login";
import {BrowserRouter, Route, Routes, useLocation, useNavigate} from "react-router-dom";
import {Profile} from "./composents/Profile";
import {Home} from "./composents/Home";
import {Logout} from "./composents/auth/Logout";

axios.defaults.withCredentials = true;
axios.defaults.withXSRFToken = true;
function App() {
  const [user, setUser] = useState(false)
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
        setUser(null);
    }
    let location = useLocation();
    const navigate = useNavigate();
    useEffect(() => {

       axios.get("http://localhost:8000/api/me").then((res)=> {
           if (res.status >= 200 && res.status < 300) {
               setUser(res.data)
               if (["/login","/register"].includes(location.pathname)){
                   navigate("/")
               }
           }
           setLoading(false)
       }).catch((e)=>{
           setLoading(false)
       })
    }, []);
    console.log("user",user)
  return (

          <Routes >
              {!user ?

                  <>

                      <Route path={"/login"} element={<Login/>}/>

                  </>:<></>}
                  <Route path={"/profile"} element={<AuthVerif user={user} elem={<Profile user={user} setUser={setUser} />}/>}/>
                  <Route path={"/logout"} element={<AuthVerif user={user} elem={<Logout user={user}/>}/>}/>

              <Route index path="/" element={
                  <>
                    <Home/>
                    {user ? <h1>Connected as {user.nom}</h1>:<h1>Not connected</h1>}
                  </>
              }/>
          </Routes>
  );
}

export default App;


function AuthVerif({user,elem}) {
    const navigate = useNavigate();
    if (!user) {
        navigate("/login")
    }
    return elem
}
