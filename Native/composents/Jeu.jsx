import { View, Image, TouchableOpacity, FlatList, Linking, StyleSheet, useWindowDimensions } from 'react-native';
import { WebView } from 'react-native-webview';
import axios from 'axios';
import { useEffect, useState } from 'react';
import { TextInput, Text, Card, Title, Button } from 'react-native-paper';
import RenderHtml from 'react-native-render-html';

export function Jeu({ user, token, navigation, route }) {
    let id = route.params.idJeu;
    const [jeu, setJeu] = useState({ succes: [], joueur: false });
    const [obtenu, setObtenu] = useState();
    const { height, width } = useWindowDimensions();
    console.log("token", token)

    useEffect(() => {
        axios.get(process.env.EXPO_PUBLIC_API_URL + "/api/jeux/" + id, {
            headers: {
                "Authorization": "Bearer " + token,
            }
        }).then((response) => {
            console.log("response", response.data.jeu)

            if (response.data.jeu.joueur == null) {
                response.data.jeu.joueur = false;
            }
            setJeu(response.data.jeu);
            setObtenu(response.data.jeu.succes);
        });
    }, []);

    function handleClick(action) {
        // changement du visuel
        let joueur = jeu.joueur;
        switch (action) {
            case "actif":
                joueur.actif = jeu.joueur.actif == 1 ? 0 : 1
                break;
            case "favori":
                joueur.favori = jeu.joueur.favori == 1 ? 0 : 1
                break;
            case "possede":
                joueur.possede = jeu.joueur.possede == 1 ? 0 : 1
                break;
        }

        setJeu({ ...jeu, joueur: joueur })


        // changement en base
        axios.post(process.env.EXPO_PUBLIC_API_URL + "/api/jeux/" + id + "/" + action, {
            actif: joueur.actif,
            favori: joueur.favori,
            possede: joueur.possede
        }, {
            headers: {
                "Accept": "application/json",
                "Authorization": "Bearer " + token,

            }
        }).then((response) => {
            if (response.status >= 200 && response.status < 300 && response.data.joueur) {
                // correction du visuel
                setJeu({ ...jeu, joueur: response.data.joueur });
                toast("success", "Changement effectué");
            }
        });
    }

    console.log(jeu.joueur)

    return <View style={styles.container}>
        <Text style={styles.title}>{jeu.nom}</Text>
        <Image source={{ uri: jeu.image }} style={styles.image} />
        <RenderHtml source={{ html: jeu.description }} />
        <Text>Nombre de succès : {jeu.succes.length}</Text>
        <Text>Joueur ? {jeu.joueur !== false ? "true" : "false"}</Text>
        {jeu.joueur !== false && (
            <View style={styles.playerInfoContainer}>
                <Text>Actif: {jeu.joueur.actif === 1 ? 'Oui' : 'Non'}</Text>
                <TouchableOpacity onPress={() => handleClick('actif')}>
                    <Text>Changer</Text>
                </TouchableOpacity>
                {/* Render other player info and buttons similarly */}
            </View>
        )}
        <Text>Succès</Text>
        <FlatList
            data={jeu.succes}
            renderItem={({ item }) => (
                <View>
                    <TouchableOpacity
                        onPress={() => Linking.openURL(`https://achievementstats.com/${item.iconUnlocked}`)}
                    >
                        <Image source={{ uri: "https://achievementstats.com/" + item.iconLocked }} />
                        <Text>{item.nom}</Text>
                        <Text>{item.description}</Text>
                    </TouchableOpacity>
                </View>
            )}
            keyExtractor={(item) => item.idSucces.toString()}
        />
    </View>

};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        padding: 20,
    },
    title: {
        fontSize: 24,
        fontWeight: 'bold',
        marginBottom: 10,
    },
    image: {
        width: 350,
        height: 150,
        marginBottom: 10,
    },
    playerInfoContainer: {
        backgroundColor: 'lightgray',
        padding: 10,
        marginBottom: 10,
    },
});

