import axios from "axios";
import {useState} from "react";
import {Link, useNavigate} from "react-router-dom";
import {Button, TextField} from "actify";
import {Lock, Mail} from "lucide-react";
export async function  getUser(){
    const res =await axios.get(process.env.REACT_APP_API_URL+"/api/me")
    if (res.status >= 200 && res.status < 300 && res.status !== 204) {
        // store the user as json
        localStorage.setItem("user", JSON.stringify(res.data))
        return res.data
    }
    return false;
}
export function Login({setUser,user}) {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState(null);
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError(null);
    try {
        await axios.get( process.env.REACT_APP_API_URL+"/sanctum/csrf-cookie");
        const res = await axios.post(process.env.REACT_APP_API_URL+"/login", {
            email: email,
            password: password,
        }, {
            headers: {
                "Accept": "application/json",
            }
        });
        if (res.status >= 200 && res.status < 300) {
            getUser().then((user)=>{
                setUser(user)
                if (user){
                    navigate("/profile")
                }
            })
        }
    } catch (error) {
      setError(error.message);
    }
  };

  return (
      <div className={"w-full h-full flex flex-col justify-center items-center gap-4"}>
          <h1>Connexion</h1>
          <form onSubmit={handleSubmit} className={"gap-4 flex flex-col"}>
              <TextField label="Email" variant={"outlined"} value={email} color={"primary"} defaultValue={"fdksifsj"}
                         type={"email"} onChange={(e) => {
                  if (e.target) setEmail(e.target.value)
                  if (e.target) console.log(e.target.value)
              }}>
                  <TextField.LeadingIcon>
                      <Mail/>
                  </TextField.LeadingIcon>
              </TextField>
              <div className={"flex flex-col"}>
                  <TextField label="Password" variant={"outlined"} value={password} color={"primary"}
                             defaultValue={"fdksifsj"} type={"password"} onChange={(e) => {
                      if (e.target) setPassword(e.target.value)
                      if (e.target) console.log(e.target.value)
                  }}>
                      <TextField.LeadingIcon>
                          <Lock/>
                      </TextField.LeadingIcon>
                  </TextField>
                  <Link className={"underline text-end"} to={"/forgotPass"}>Mot de passe oublié</Link>
              </div>

            <div className={"flex gap-4"}>
                <Button variant={"outlined"} className={"flex-1"} onClick={() => {
                    navigate("/register")
                }}>register
                </Button>
                <Button color={"primary"} className={"flex-1"} type={"submit"} variant={"filled"}>Connexion</Button>
            </div>
          </form>

          {error && <p>{error}</p>}
      </div>
  );
}