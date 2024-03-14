import axios from "axios";
import {useState} from "react";

export function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState(null);


  const handleSubmit = async (e) => {
    e.preventDefault();
    setError(null);
    try {
        await axios.get("http://localhost:8000/sanctum/csrf-cookie");
        await axios.post("http://localhost:8000/login", {
            email: email,
            password: password,
        }, {
            headers: {
                "Accept": "application/json",
            }
        })
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