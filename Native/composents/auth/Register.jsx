import axios from "axios";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Button, Text, TextField } from "react-native-paper";
import { Lock, Mail } from "lucide-react";
import { getUser } from "./Login";

export function Register({ user, setUser, navigate }) {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [pseudo, setPseudo] = useState("");
    const [error, setError] = useState(null);
    const navigate = useNavigate();
    const toast = useToast();

    const handleSubmit = async (e) => {
        e.preventDefault();
        setError(null);
        try {
            const res = await axios.post(process.env.EXPO_PUBLIC_API_URL + "/api/register", {
                email: email,
                password: password,
                password_confirmation: password,
                pseudo: pseudo
            }, {
                headers: {
                    "Accept": "application/json",
                }
            });
            if (res.status >= 200 && res.status < 300) {
                getUser().then((user) => {
                    setUser(user)
                    if (user) {
                        navigate("/profile")
                    }
                })
            }
        } catch (error) {
            setError(error.message);
        }
    };

    return (
        <View>
            <Text>Crée un compte</Text>
            <TextField
                mode="outlined"
                style={styles.input}
                label="Ton email"
                onChangeText={(e) => {
                    setEmail(e)
                }} value={email} placeholder={"Email"} type={"email"} />
            <TextInput
                mode="outlined"
                style={styles.input}
                label="Ton mot de passe"
                onChangeText={(e) => {
                    setPassword(e)
                }} value={password} placeholder={"Mot de passe"} textContentType={"password"} />
            <TextInput
                mode="outlined"
                style={styles.input}
                label="Ton pseudo"
                onChangeText={(e) => {
                    setPseudo(e)
                }} value={pseudo} placeholder={"Pseudo"} />
            <Button mode="contained" onPress={navigate}>Se connecter</Button>
            <Button mode="contained" onPress={handleSubmit}>Créer un compte</Button>

            {error && <p>{error}</p>}
        </View>
    );
}
