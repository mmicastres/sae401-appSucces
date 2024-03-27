import axios from "axios";
import {useState} from "react";
import {useNavigate} from "react-router-dom";

export function Login() {
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
            navigate("/profile");
        }
    } catch (error) {
      setError(error.message);
    }
  };

  return (
    <div>
      <h1>Connexion</h1>
      <form onSubmit={handleSubmit}>
        <input
          type="email"
          placeholder="Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />
        <input
          type="password"
          placeholder="Mot de passe"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
        <button type="submit">Connexion</button>
      </form>
      {error && <p>{error}</p>}
    </div>
  );
}