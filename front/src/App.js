import logo from './logo.svg';
import './App.css';
import axios from 'axios';
import React, {useEffect, useState} from "react";
import {getUser, Login} from "./composents/auth/Login";
import {BrowserRouter, Route, Routes, useLocation, useNavigate} from "react-router-dom";
import {Profile} from "./composents/Profile";
import {Home} from "./composents/Home";
import {Logout} from "./composents/auth/Logout";
import {Jeu} from "./composents/Jeu";
import {Succes} from "./composents/Succes";
import {ConvPage} from "./composents/conv/ConvPage";
import {Register} from "./composents/auth/Register";
import Header from "./composents/Header";

axios.defaults.withCredentials = true;
axios.defaults.withXSRFToken = true;
function App() {

    console.log("LOCALSTORE = ", localStorage.getItem("user"))
  const [user, setUser] = useState( JSON.parse(localStorage.getItem("user")))
    const [loading,setLoading] = useState(true)


    let location = useLocation();
    const navigate = useNavigate();
    useEffect(() => {


        getUser().then((user)=>{
            setUser(user)
        }).catch((e)=>{
           if (e.response && e.response.status === 401){
                setUser(false)
                localStorage.removeItem("user")

           }

           setLoading(false)
       })
    }, [navigate]);

  return (
        <>
            <Header user={user} setUser={setUser}/>
            <div className={"flex w-full min-h-screen"}>
                <span className={"w-20"}></span>

                <div className={"flex-1 h-full"}>
                    <Routes >
                        {!user ?

                            <>

                                <Route path={"/login"} element={<Login user={user} setUser={setUser}/>}/>
                                <Route path={"/register"} element={<Register/>}/>

                            </>:<></>}
                        <Route path={"/profile"} element={<AuthVerif user={user} elem={<Profile user={user} setUser={setUser} />}/>}/>
                        <Route path={"/logout"} element={<AuthVerif user={user} elem={<Logout user={user} setUser={setUser}/>}/>}/>
                        <Route path={"/conv"} element={<AuthVerif user={user} elem={<ConvPage user={user}/>}/>}/>
                        <Route path={"/conv/:current"} element={<AuthVerif user={user} elem={<ConvPage user={user}/>}/>}/>
                        <Route path={"/jeu/:id"} element={<Jeu user={user}/>}/>
                        <Route path={"/user/:id"} element={<Profile user={user}/>}></Route>
                        <Route path={"/succes/:id"} element={<Succes user={user}/>}/>
                        <Route index path="/" element={
                            <>
                                <Home user={user}/>
                            </>
                        }/>
                    </Routes>

                </div>
            </div>

        </>
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
