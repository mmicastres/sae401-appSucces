import axios from "axios";
import {useState} from "react";
import {useNavigate} from "react-router-dom";
import {Button, TextField} from "actify";
import {Lock, Mail} from "lucide-react";

export function Register() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [pseudo,setPseudo] = useState("");
  const [error, setError] = useState(null);
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError(null);
    try {
        await axios.get( process.env.REACT_APP_API_URL+"/sanctum/csrf-cookie");
        const res = await axios.post(process.env.REACT_APP_API_URL+"/register", {
            email: email,
            password: password,
            password_confirmation:password,
	        pseudo:pseudo
        }, {
            headers: {
                "Accept": "application/json",
            }
        });
        if (res.status >= 200 && res.status < 300) {
            window.location.reload();
        }
    } catch (error) {
      setError(error.message);
    }
  };

  return (
      <div className={"w-full h-full flex flex-col justify-center items-center gap-4"}>
          <h1>Crée un compte</h1>
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
              <TextField label="Pseudo" variant={"outlined"} value={pseudo} color={"primary"} defaultValue={"fdksifsj"}
                         type={"text"} onChange={(e) => {
                  if (e.target) setPseudo(e.target.value)
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
              </div>
              <div className={"flex gap-4"}>
                  <Button variant={"outlined"} className={"flex-1"} onClick={() => {
                      navigate("/login")
                  }}>se connecter
                  </Button>
                  <Button color={"primary"} className={"flex-1"} type={"submit"} variant={"filled"}>Crée un compte</Button>
              </div>
          </form>

          {error && <p>{error}</p>}
      </div>
  );
}
