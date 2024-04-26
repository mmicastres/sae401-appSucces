import { useEffect, useState } from "react";
import axios from "axios";
import { User } from "./User";
import { View, Image, StyleSheet, ScrollView, FlatList, TouchableOpacity } from 'react-native';
import { Text, TextInput, IconButton, Card, Avatar, Button, Title } from 'react-native-paper';

export function Profile({ navigation, token, user, route = "" }) {
    let id = "";
    if (route !== "") {
        id = route.params.id;
    }
    console.log("id", id)
    const [profile, setProfile] = useState();
    const [joueur, setJoueur] = useState([]);
    const [success, setSuccess] = useState([]);
    const [friends, setFriends] = useState([]);
    const [friendsRequests, setFriendsRequests] = useState([]);
    const [friendsRequestsSent, setFriendsRequestsSent] = useState([]);
    console.log(friendsRequests)
    console.log(friendsRequestsSent)

    useEffect(() => {
        if (id !== "" && id !== user.id) {
            console.log("NOT ME")
            axios.get(process.env.EXPO_PUBLIC_API_URL + "/api/user/" + id, {
                headers: {
                    "Authorization": "Bearer " + token,
                }
            }).then((response) => {
                setSuccess(response.data.succes);
                setFriends(response.data.friends);
                setJoueur(response.data.joueur);
                setProfile(response.data);

                console.log("response", response.data);
            });

        } else {
            if (!user || !user.id) return;
            console.log("ME")
            console.log("USER ID", user["id"])
            axios.get(process.env.EXPO_PUBLIC_API_URL + "/api/user/" + user.id, {
                headers: {
                    "Authorization": "Bearer " + token,
                }
            }).then((response) => {
                setSuccess(response.data.succes);
                setFriends(response.data.friends);
                setFriendsRequests(response.data.friend_requests);
                setFriendsRequestsSent(response.data.friend_requests_sent);
                setJoueur(response.data.joueur);
                setProfile(user);

                console.log("response", response.data.friends);
            });
        }


    }, [user]);

    function ajoutAmi() {
        axios.post(process.env.EXPO_PUBLIC_API_URL + "/api/user/" + id + "/friend", {}, {
            headers: {
                "Authorization": "Bearer " + token,
            }
        }).then((response) => {
            //navigate("/profile/" + id)
            setProfile({ ...joueur, isFriendRequestSent: !joueur.isFriendRequestSent })
            //toast("success",response.data.message,5000)

        });
    }


    function handlePdp(event) {
        event.preventDefault()
        const form = event.target
        let formData = new FormData(form);

        axios.post(process.env.EXPO_PUBLIC_API_URL + "/api/user/" + id + "/profilepicture", formData, {
            headers: {
                "Accept": "application/json",
                'Content-Type': 'multipart/form-data',
                "Authorization": "Bearer " + token,
            }
        }).then((response) => {
            console.log('test')
        });
    }

    return (<ScrollView>
        <View style={styles.container}>
            <View style={{ flexDirection: 'row', alignItems: 'center', justifyContent: 'space-evenly' }}>
                {profile ? (
                    <Avatar.Image size={128} source={{ uri: `http://localhost:8000/imgprofile/${profile.picture}` }} />
                ) : null}
                <Text style={{marginLeft:10}} variant="displayMedium">{profile?.pseudo}</Text>
            </View>
            {id !== "" && id !== user.id ? (
                <Button mode="contained" style={{ marginTop:10, width: '70%' }} onPress={ajoutAmi} >
                    {profile?.isFriendRequestSent ? "En attente d'ajout" :
                        profile?.isFriendRequest ? "Accepter la demande d'ami" :
                            profile?.isFriend ? "Retirer l'ami" : "Ajouter l'ami"}
                </Button>
            ) : <></>}
        </View>

        <View style={{ flex: 1, margin: 5 }}>
            <Text variant="titleLarge" style={styles.title}>Jeux favoris :</Text>
            <FlatList
                data={joueur.filter((item) => item.favori === 1)}
                renderItem={({ item }) => (
                    <TouchableOpacity onPress={() => navigation.navigate('Jeu', { idJeu: item.idJeu })}>
                        <Card style={{ margin: 8 }}>
                            <Card.Cover source={{ uri: `https://cdn.cloudflare.steamstatic.com/steam/apps/${item.jeu.steamId}/header.jpg` }} />
                            <Card.Content style={{ alignItems: "center" }}>
                                <Title>{item.jeu.nom}</Title>
                            </Card.Content>
                        </Card>
                    </TouchableOpacity>
                )}
                keyExtractor={(item) => item.idJeu.toString()}
                numColumns={1}>
            </FlatList>

            <Text variant="titleLarge" style={styles.title}>Jeux actifs :</Text>
            <FlatList
                data={joueur.filter((item) => item.actif === 1)}
                renderItem={({ item }) => (
                    <TouchableOpacity onPress={() => navigation.navigate('Jeu', { idJeu: item.idJeu })}>
                        <Card style={{ margin: 8 }}>
                            <Card.Cover source={{ uri: `https://cdn.cloudflare.steamstatic.com/steam/apps/${item.jeu.steamId}/header.jpg` }} />
                            <Card.Content style={{ alignItems: "center" }}>
                                <Title>{item.jeu.nom}</Title>
                            </Card.Content>
                        </Card>
                    </TouchableOpacity>
                )}
                keyExtractor={(item) => item.idJeu.toString()}
                numColumns={1}>
            </FlatList>

            <Text variant="titleLarge" style={styles.title}>Jeux possédés :</Text>
            <FlatList
                data={joueur.filter((item) => item.possede === 1)}
                renderItem={({ item }) => (
                    <TouchableOpacity onPress={() => navigation.navigate('Jeu', { idJeu: item.idJeu })}>
                        <Card style={{ margin: 8 }}>
                            <Card.Cover source={{ uri: `https://cdn.cloudflare.steamstatic.com/steam/apps/${item.jeu.steamId}/header.jpg` }} />
                            <Card.Content style={{ alignItems: "center" }}>
                                <Title>{item.jeu.nom}</Title>
                            </Card.Content>
                        </Card>
                    </TouchableOpacity>
                )}
                keyExtractor={(item) => item.idJeu.toString()}
                numColumns={1}>
            </FlatList>
        </View>

        <View style={styles.container}>
            <Text variant="titleLarge" style={styles.title}>Nombre de succès : {success.length}</Text>
            <FlatList
                style={{ marginTop: 10 }}
                data={success}
                renderItem={({ item }) => (
                    <TouchableOpacity onPress={() => navigation.navigate('Succes', { idSucces: item.idSucces })}>
                        <Card key={item.idSucces} style={styles.card}>
                            <Card.Title
                                title={item.nom}
                                left={() => <Avatar.Image size={48} source={{ uri: "https://achievementstats.com/" + item.iconUnlocked }} />}
                            />
                            <Card.Content>
                                <Text variant="bodyMedium">{item.description}</Text>
                            </Card.Content>
                        </Card>
                    </TouchableOpacity>
                )}
                keyExtractor={(item) => item.idSucces.toString()}
                numColumns={1}>
            </FlatList>
        </View>
        <View>
            <View style={styles.container}>
                <Text variant="titleLarge" style={styles.title}>Amis</Text>
                <FlatList
                    style={{ marginTop: 10 }}
                    data={friends}
                    renderItem={({ item }) => (
                        <User friend={user.id === id} key={item.id} user={item} navigation={navigation} />
                    )}
                    keyExtractor={(item) => item.id.toString()}
                    numColumns={1}>
                </FlatList>
            </View>
            {!id || user?.id === id ? (
                <View style={styles.container}>
                    {friendsRequests.length != 0 ? (
                        <View>
                            <Text>Demandes d'amis reçues</Text>
                            {friendsRequests?.map(item => (
                                <User key={item.id} user={item} />
                            ))}
                        </View>
                    ) : <Text>Pas de demandes d'amis en attente</Text>}
                    {friendsRequestsSent.length != 0 ? (
                        <View>
                            <Text>Demandes d'amis envoyées</Text>
                            {friendsRequestsSent?.map(item => (
                                <User key={item.id} user={item} />
                            ))}
                        </View>
                    ) : <Text>Pas de demandes d'amis envoyées</Text>}
                </View>
            ) : null}
        </View>
    </ScrollView>
    );


}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        flexDirection: 'column',
        padding: 20,
        justifyContent: 'center',
        alignItems: 'center',
    },
    profileContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        marginBottom: 20,
    },
    detailsContainer: {
        alignItems: 'center',
    },
    name: {
        fontSize: 24,
        fontWeight: 'bold',
        marginBottom: 10,
    },
    title: {
        alignItems: 'center'
    },
    card: {
        marginBottom: 10,
        width: 340
    }
});