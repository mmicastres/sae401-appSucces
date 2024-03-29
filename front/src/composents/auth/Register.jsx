import axios from "axios";
import {useState} from "react";
import {useNavigate} from "react-router-dom";

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
    <div>
      <h1>Crée un compte</h1>
      <form onSubmit={handleSubmit}>
        <input
          type="email"
          placeholder="Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />
	<input
	  type="text"
	  placeholder="Pseudo"
	  value={pseudo}
	  onChange={(e)=>setPseudo(e.target.value)}
	/>
        <input
          type="password"
          placeholder="Mot de passe"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
        <button type="submit">Crée un compte</button>
      </form>
        
      {error && <p>{error}</p>}
    </div>
  );
}
