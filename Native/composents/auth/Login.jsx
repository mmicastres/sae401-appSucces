import axios from "axios";
import { useState } from "react";
import { View, StyleSheet, TouchableOpacity } from "react-native";
import { useNavigation } from "@react-navigation/native";
import AsyncStorage from '@react-native-async-storage/async-storage';
import { TextInput, Text, Button } from 'react-native-paper';

export async function getUser(token) {
    const res = await axios.get(process.env.EXPO_PUBLIC_API_URL + "/api/me",
        {
            headers: {
                "Authorization": "Bearer " + token
            }
        })
    if (res.status >= 200 && res.status < 300 && res.status !== 204) {
        // store the user as json
        await AsyncStorage.setItem("token", token)
        await AsyncStorage.setItem("user", JSON.stringify(res.data))
        return res.data
    }
    return false;
}
export function Login({ setUser, user, token, setToken }) {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [error, setError] = useState(null);
    const navigation = useNavigation();

    console.log(process.env.EXPO_PUBLIC_API_URL)

    const handleSubmit = async (e) => {
        e.preventDefault();
        setError(null);
        try {

            const res = await axios.post(process.env.EXPO_PUBLIC_API_URL + `/api/login`, {
                email: email,
                password: password
            }, {
                headers: {
                    "Accept": "application/json",
                }
            });

            console.log("login")
            console.log(res)
            if (res.status >= 200 && res.status < 300) {
                console.log(res.data.accessToken)
                setToken(res.data.accessToken)
                getUser(res.data.accessToken).then((user) => {
                    setUser(user)
                    if (user) {
                        //toast("success","Vous êtes connecté")
                        navigate.navigate("profile")
                    }
                })
            } else {
                console.log(res.toJSON())
                console.log(res.status)
            }
        } catch (error) {
            console.log(error.response.data)
            setError(error.message);
        }
    };

    return (
        <View style={styles.container}>
            <Text style={styles.titre}>Connexion</Text>
            <TextInput
                mode="outlined"
                style={styles.input}
                label="Ton email"
                textContentType={"emailAddress"}
                keyboardType={"email-address"}
                onChangeText={(e) => {
                    setEmail(e)
                }} value={email} placeholder={"Email"} type={"email"} />
            <TextInput
                mode="outlined"
                style={styles.input}
                label="Ton mot de passe"
                secureTextEntry
                onChangeText={(e) => {
                    setPassword(e)
                }} value={password} placeholder={"Mot de passe"} textContentType={"password"} />
            <Button mode="contained" onPress={handleSubmit}>Connexion</Button>
            <TouchableOpacity onPress={() => navigation.navigate('Register')}>
                <Text style={styles.connexion} variant="bodyLarge">Pas encore de compte ? S'inscrire</Text>
            </TouchableOpacity>
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
    connexion: {
        marginTop: 10,
        color: 'purple'
    }
});


/*
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
);*/