import { useEffect, useState } from "react";
import axios from "axios";
import { StyleSheet, Image, View, TouchableOpacity, ScrollView, FlatList } from 'react-native';
import { Button, TextInput, Card, Text, Surface, Avatar } from 'react-native-paper';
import { useWebViewLogic } from "react-native-webview/lib/WebViewShared";

export function Succes({ user, route, navigation, token }) {
    console.log("user", user)
    let id = route.params.idSucces;
    const [succes, setSucces] = useState({ "jeu": { nom: "" }, "commentaires": [], "detenteurs": [] });
    const [obtenu, setObtenu] = useState()
    const [titre, setTitre] = useState("")
    const [titreMod, setTitreMod] = useState("")
    const [commentaireMod, setCommentaireMod] = useState("")
    const [commentaire, setCommentaire] = useState("")
    const [modif, setModif] = useState(null)

    useEffect(() => {
        axios.get(process.env.EXPO_PUBLIC_API_URL + "/api/succes/" + id, {
            headers: {
                "Authorization": "Bearer " + token,
            }
        }).then((response) => {
            setSucces(response.data.succes);
        });
        if (user && user.id) {
            axios.get(process.env.EXPO_PUBLIC_API_URL + "/api/user/" + user.id, {
                headers: {
                    "Authorization": "Bearer " + token,
                }
            }).then((response) => {
                const succesObtenu = response.data.succes.find((element) => element.idSucces == id)
                console.log("succesObtenu", succesObtenu, succesObtenu != undefined)
                succesObtenu != undefined ? setObtenu(1) : setObtenu(0);
            });
        }
    }, [id]);
    console.log(obtenu)

    function handleSucces(event) {
        event.preventDefault();
        console.log("HandleSuccess", user, user.id)
        if (user && user.id) {

            if (obtenu == 0) {
                console.log("Authenticated request to add success", token)
                axios.post(process.env.EXPO_PUBLIC_API_URL + "/api/succes/" + id, {}, {
                    headers: {
                        "Accept": "application/json",
                        "Authorization": "Bearer " + token,
                    }
                }).then((response) => {
                    setObtenu(1)
                    //toast('success', 'Vous avez obtenu le succès !',5000)
                }).catch((e) => {
                    //toast('error', 'Erreur lors de l\'obtention du succès',5000)

                });
            } else {
                axios.delete(process.env.EXPO_PUBLIC_API_URL + "/api/succes/" + id, {
                    headers: {
                        "Accept": "application/json",
                        "Authorization": "Bearer " + token,
                    }
                }).then((response) => {
                    setObtenu(0)
                    //toast('success', 'Le succès a été supprimé',5000)
                }).catch((e) => {
                    //toast('error', 'Erreur lors de la suppression du succès',5000)

                });
            }
        }
    }

    function changeTitre(e) {
        if (e) {
            setTitre(e)
        }
    }

    function changeCommentaire(e) {
        if (e) {
            setCommentaire(e)
        }
    }

    function clearTitre() {
        setTitre('')
    }

    function clearComment() {
        setCommentaire('')
    }

    function handleSendComment(event) {
        event.preventDefault();
        //const data = new FormData(event.target);
        const data = new FormData();
        data.append("titre", titre);
        data.append("commentaire", commentaire);
        setSucces({ ...succes, "commentaires": [{ "idCommentaire": "-1", "titre": data.get("titre"), "content": data.get("commentaire") }, ...succes.commentaires] });
        axios.post(process.env.EXPO_PUBLIC_API_URL + "/api/succes/" + id + "/comment", {
            content: data.get("commentaire"),
            titre: data.get("titre")
        }, {
            headers: {
                "Accept": "application/json",
                "Authorization": "Bearer " + token,
            }
        }).then((response) => {
            if (response.status >= 200 && response.status < 300) {
                console.log("response", response.data);
                setSucces({ ...succes, "commentaires": [response.data.commentaire, ...succes.commentaires] })
                //toast('success', 'Commentaire ajouté',5000)
            }
        });
    }

    function modComment(idCommentaire) {
        console.log("item", idCommentaire)
        setModif(idCommentaire);
        console.log(succes.commentaires)
        const item = succes.commentaires.find((item) => parseInt(item.idCommentaire) === parseInt(idCommentaire));
        console.log("ITEM", item)
        setTitreMod(item.titre);
        setCommentaireMod(item.content);
    }

    function handleModComment(event, idcommentaire) {
        event.preventDefault();
        console.log("mod", idcommentaire)
        axios.put(process.env.EXPO_PUBLIC_API_URL + "/api/succes/" + id + "/comment/" + idcommentaire, {
            content: commentaireMod,
            titre: titreMod,
        }, {
            headers: {
                "Accept": "application/json",
                "Authorization": "Bearer " + token,
            }
        }).then((res) => {
            console.log("res", res)
            if (res.status >= 200 && res.status < 300) {
                setSucces({
                    ...succes, "commentaires": succes.commentaires.map((item) => {
                        if (item.idCommentaire === parseInt(idcommentaire)) {
                            return { ...item, titre: titreMod, content: commentaireMod }
                        }
                        //toast('success', 'Modification du commentaire',5000)

                        return item
                    })
                })
            } else {
                //toast('error', 'Erreur lors de la modification du commentaire',5000)
            }

        })
        setModif(null);
    }

    function handleSupComment(idCommentaire) {
        console.log("SUP,", idCommentaire)
        axios.delete(process.env.EXPO_PUBLIC_API_URL + "/api/succes/" + id + "/comment/" + idCommentaire, {
            headers: {
                "Authorization": "Bearer " + token,
            }
        }).then((response) => {
            if (response.status >= 200 && response.status < 300) {
                console.log("response", response.data);
                //toast('success', 'Commentaire supprimé',5000)
                setSucces({
                    ...succes, "commentaires": succes.commentaires.filter((item) => {
                        console.log(item.idCommentaire, idCommentaire)
                        console.log(item.idCommentaire !== parseInt(idCommentaire))
                        return item.idCommentaire !== parseInt(idCommentaire)
                    })
                })
            }
        });


    }

    console.log(id)
    console.log(titre)

    return (
        <ScrollView>
            <View style={styles.container}>
                <Text style={styles.title}>{succes?.nom}</Text>
                {succes && succes.iconUnlocked ? (
                    <Image style={{ width: 128, height: 128 }} source={{ uri: `https://achievementstats.com/${succes.iconUnlocked}` }} />
                ) : <Image style={{ width: 128, height: 128 }} source={{ uri: `https://achievementstats.com/${succes.iconLocked}` }} />}
                <View style={{ paddingHorizontal: 10, marginVertical: 10 }}>
                    <Text variant="labelLarge">
                        Jeu : <Text onPress={() => navigation.goBack()} style={{ color: 'violet', textDecorationLine: 'underline' }}>{succes?.jeu?.nom}</Text>
                    </Text>
                </View>
                <Text style={{ marginBottom: 10 }} variant="bodyMedium">Description : {succes?.description}</Text>
                <Button
                    style={styles.button}
                    mode="contained"
                    onPress={handleSucces}
                >
                    {obtenu === 1 ? 'Supprimer le succès' : 'Ajouter le succès'}
                </Button>
                <Text>Amis ayant le succès :</Text>
                <FlatList
                    style={{ marginVertical: 10 }}
                    data={succes.detenteurs}
                    renderItem={({ item }) => (
                        <TouchableOpacity onPress={() => navigation.navigate(`Profile`, { id: item?.user?.id })}>
                            <Avatar.Image size={24} style={{marginHorizontal:5}} source={`http://localhost:8000/storage/imgprofile/${item.user.picture}`} />
                        </TouchableOpacity>
                    )}
                    keyExtractor={(item) => item.idSucces.toString()}
                    numColumns={3}
                    contentContainerStyle={{ paddingHorizontal: 16 }}>
                </FlatList>
                
                <Text style={styles.title}>Commentaires et aides</Text>
                {user ? (
                    <View style={{ width: '100%', alignItems:"center" }}>
                        <TextInput
                            mode="outlined"
                            style={{ marginBottom: 20, marginTop: 10 }}
                            label="Titre"
                            value={titre}
                            onChangeText={changeTitre}
                            right={<TextInput.Icon name="close-circle" onPress={clearTitre} />}
                        />
                        <TextInput
                            mode="outlined"
                            style={{ marginBottom: 20, marginTop: 10 }}
                            label="Commentaire"
                            value={commentaire}
                            onChangeText={changeCommentaire}
                            right={<TextInput.Icon name="close-circle" onPress={clearComment} />}
                        />
                        <Button mode="contained" onPress={handleSendComment} style={styles.button}>
                            Envoyer
                        </Button>
                    </View>
                ) : (
                    <>
                        <Text>Vous devez être authentifié pour laisser un commentaire</Text>
                        <TouchableOpacity onPress={() => navigation.navigate('Login')}>
                            <Button style={styles.button}>Login</Button>
                        </TouchableOpacity>
                    </>
                )}

                <Text style={styles.title}>Tous les commentaires</Text>
                {succes?.commentaires.map((item) => (
                    <Surface key={item.idCommentaire} style={styles.card}>
                        {modif === item.idCommentaire ? (
                            <View>
                                <TextInput
                                    style={{ marginBottom: 10 }}
                                    label="Titre"
                                    value={titreMod}
                                    onChangeText={(text) => setTitreMod(text)}
                                    right={<TextInput.Icon name="close-circle" onPress={() => setTitreMod('')} />}
                                />
                                <TextInput
                                    style={{ marginBottom: 10 }}
                                    label="Commentaire"
                                    value={commentaireMod}
                                    onChangeText={(text) => setCommentaireMod(text)}
                                    right={<TextInput.Icon name="close-circle" onPress={() => setCommentaireMod('')} />}
                                />
                                <Button mode="contained" onPress={(event) => handleModComment(event, item.idCommentaire)} color="blue">
                                    Envoyer
                                </Button>
                            </View>
                        ) : (
                            <View>
                                <View style={{ flexDirection: 'row', justifyContent: 'flex-end' }}>
                                    <Text style={{ flex: 1 }} onPress={() => navigation.navigate(`Profile`, { id: item?.user?.id })}>
                                        {item?.user?.pseudo}
                                    </Text>
                                    {/* Upvote and Downvote buttons */}
                                </View>
                                <Text style={{ fontWeight: 'bold', marginVertical: 10 }}>{item.titre}</Text>
                                <Text style={{ margin: 5 }}>{item.content}</Text>
                                {item.idUser === user.id ? (
                                    <View style={{ flexDirection: 'row', justifyContent: 'flex-end' }}>
                                        <Button style={styles.button} onPress={() => modComment(item.idCommentaire)}>Modification</Button>
                                        <Button style={styles.button} onPress={() => handleSupComment(item.idCommentaire)}>Suppression</Button>
                                    </View>
                                ) : null}
                            </View>
                        )}
                    </Surface>
                ))}
            </View>
        </ScrollView >
    );
}

const styles = StyleSheet.create({
    button: {
        marginBottom: 10,
        width: '60%'
    },
    card: {
        marginBottom: 10,
        width: 340
    },
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        padding: 20,
    },
    titre: {
        fontSize: 30,
        textAlign: 'center',
        marginBottom: 30
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
    }
});