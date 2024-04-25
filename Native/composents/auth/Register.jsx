import axios from "axios";
import { useState } from "react";
import { View, StyleSheet, TouchableOpacity } from "react-native";
import { useNavigation } from "@react-navigation/native";
import { Button, Text, TextInput } from "react-native-paper";
import { getUser } from "./Login";

export function Register({ user, setUser }) {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [pseudo, setPseudo] = useState("");
    const navigation = useNavigation();
    const [error, setError] = useState(null);

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
        <View style={styles.container}>
            <Text style={styles.titre}>Créer un compte</Text>
            <TextInput
                mode="outlined"
                style={styles.input}
                label="Email"
                keyboardType={"email-address"}
                onChangeText={(e) => {
                    setEmail(e)
                }} value={email} placeholder={"Email"} type={"email"} />
            <TextInput
                mode="outlined"
                style={styles.input}
                label="Mot de passe"
                secureTextEntry
                onChangeText={(e) => {
                    setPassword(e)
                }} value={password} placeholder={"Mot de passe"} textContentType={"password"} />
            <TextInput
                mode="outlined"
                style={styles.input}
                label="Pseudo"
                onChangeText={(e) => {
                    setPseudo(e)
                }} value={pseudo} placeholder={"Pseudo"} />
            <Button style={styles.button} mode="contained" onPress={handleSubmit}>Créer un compte</Button>
            <TouchableOpacity onPress={() => navigation.navigate('Login')}>
                <Text style={styles.connexion} variant="bodyLarge">Déja inscript ? Se connecter</Text>
            </TouchableOpacity>

            {error && <p>{error}</p>}
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        marginTop: 50,
        flex: 1,
        alignItems: 'center'
    },
    titre: {
        fontSize: 30,
        textAlign: 'center',
        marginBottom: 30
    },
    input: {
        width: '80%',
        marginBottom: 20
    },
    button: {
        marginBottom: 10,
        width: '40%'
    }
});