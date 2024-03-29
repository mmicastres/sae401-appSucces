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
import {ConvPage} from "./composents/conv/ConvPage";
import {Register} from "./composents/auth/Register";

axios.defaults.withCredentials = true;
axios.defaults.withXSRFToken = true;
function App() {

    console.log("LOCALSTORE = ", localStorage.getItem("user"))
  const [user, setUser] = useState( JSON.parse(localStorage.getItem("user")))
    const [loading,setLoading] = useState(true)


    let location = useLocation();
    const navigate = useNavigate();
    useEffect(() => {

       axios.get(process.env.REACT_APP_API_URL+"/api/me").then((res)=> {
           if (res.status >= 200 && res.status < 300 && res.status !== 204) {
               setUser(res.data)
               // store the user as json
                localStorage.setItem("user", JSON.stringify(res.data))
               if (["/login","/register"].includes(location.pathname)){
                   navigate("/")
               }
           }else{
                setUser(false)
                localStorage.removeItem("user")
           }
           setLoading(false)
       }).catch((e)=>{
           if (e.response && e.response.status === 401){
                setUser(false)
                localStorage.removeItem("user")

           }

           setLoading(false)
       })
    }, [navigate]);

  return (

          <Routes >
              {!user ?

                  <>

                      <Route path={"/login"} element={<Login/>}/>
                      <Route path={"/register"} element={<Register/>}/>

                  </>:<></>}
                  <Route path={"/profile"} element={<AuthVerif user={user} elem={<Profile user={user} setUser={setUser} />}/>}/>
                  <Route path={"/logout"} element={<AuthVerif user={user} elem={<Logout user={user}/>}/>}/>
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
