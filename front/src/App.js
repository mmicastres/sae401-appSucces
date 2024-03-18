import logo from './logo.svg';
import './App.css';
import axios from 'axios';
import {useEffect, useState} from "react";
import {Login} from "./composents/auth/Login";
import {BrowserRouter, Route, Routes, useLocation, useNavigate} from "react-router-dom";
import {Profile} from "./composents/Profile";
import {Home} from "./composents/Home";
import {Logout} from "./composents/auth/Logout";
import {Jeu} from "./composents/Jeu";
import {Succes} from "./composents/Succes";

axios.defaults.withCredentials = true;
axios.defaults.withXSRFToken = true;
function App() {
  const [user, setUser] = useState(false)
    const [loading,setLoading] = useState(true)
  const onRegister = async () => {
    await axios.get(process.env.REACT_APP_API_URL+"/sanctum/csrf-cookie");
    await axios.post(process.env.REACT_APP_API_URL+"/register", {
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
        await axios.post(process.env.REACT_APP_API_URL+"/logout", {
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

       axios.get(process.env.REACT_APP_API_URL+"/api/me").then((res)=> {
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
  return (

          <Routes >
              {!user ?

                  <>

                      <Route path={"/login"} element={<Login/>}/>
                      <Route path={"/register"} element={<Login/>}/>

                  </>:<></>}
                  <Route path={"/profile"} element={<AuthVerif user={user} elem={<Profile user={user} setUser={setUser} />}/>}/>
                  <Route path={"/logout"} element={<AuthVerif user={user} elem={<Logout user={user}/>}/>}/>
            <Route path={"/jeu/:id"} element={<Jeu user={user}/>}/>
              <Route path={"/succes/:id"} element={<Succes user={user}/>}/>
              <Route index path="/" element={
                  <>
                    <Home user={user}/>
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
