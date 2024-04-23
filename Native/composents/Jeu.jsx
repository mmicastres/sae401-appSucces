import { View, Text, Image, TouchableOpacity, FlatList, Linking, StyleSheet } from 'react-native';
import { WebView } from 'react-native-webview';
import axios from 'axios';
import { useEffect, useState } from 'react';

export function Jeu ({ user,navigation,route }) {
    let id = route.params.idJeu
    const [jeu, setJeu] = useState({succes: [], joueur: false});
    const [obtenu, setObtenu] = useState();

    useEffect(() => {
        axios.get(process.env.EXPO_PUBLIC_API_URL + "/api/jeux/" + id).then((response) => {
            if (response.data.jeu.joueur == null) {
                response.data.jeu.joueur = false;
            }
            console.log("response",response.data.jeu)
            setJeu(response.data.jeu);
            setObtenu(response.data.jeu.succes);
        });
    }, []);

    function handleClick(action) {
        return
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
            }
        }).then((response) => {
            if (response.status >= 200 && response.status < 300 && response.data.joueur) {
                // correction du visuel
                setJeu({ ...jeu, joueur: response.data.joueur });
                toast("success","Changement effectué");
            }
        });
    }


    return <View style={styles.container}>
            <Text style={styles.title}>Jeu {id}</Text>
            <Image source={{ uri: jeu.image }} style={styles.image} />
            <Text>Nom: {jeu.nom}</Text>
            <Text>Description:</Text>
            <WebView
                style={styles.webview}
                originWhitelist={['*']}
                source={{ html: jeu.description }}
            />
            <Text>Nombre de succès: {jeu.succes.length}</Text>
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
                            <Image source={{ uri: `https://achievementstats.com/${item.iconUnlocked}` }} />
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
        width: 200,
        height: 200,
        marginBottom: 10,
    },
    webview: {
        width: '100%',
        height: 200,
        padding: "50%",
        marginBottom: 10,
    },
    playerInfoContainer: {
        backgroundColor: 'lightgray',
        padding: 10,
        marginBottom: 10,
    },
});

