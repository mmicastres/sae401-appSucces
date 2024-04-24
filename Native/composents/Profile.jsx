import { useEffect, useState } from "react";
import axios from "axios";
import { User } from "./User";
import { View, Text,  Image, StyleSheet } from 'react-native';
import { TextInput, IconButton, Card, Avatar,Button } from 'react-native-paper';

export function Profile({ navigation,token,user,route="" }) {
    let id =  "";
    if (route !== ""){
        id = route.params.id;
    }
    const [profile, setProfile] = useState();
    const [joueur, setJoueur] = useState([]);
    const [success, setSuccess] = useState([]);
    const [friends, setFriends] = useState([]);
    const [friendsRequests, setFriendsRequests] = useState([]);
    const [friendsRequestsSent, setFriendsRequestsSent] = useState([]);


    useEffect(() => {
        if (id !== "" && id !== user.id) {
            axios.get(process.env.EXPO_PUBLIC_API_URL + "/api/user/" + id).then((response) => {
                setSuccess(response.data.succes);
                setFriends(response.data.friends);
                setJoueur(response.data.joueur);
                setProfile(response.data);

                console.log("response", response.data);
            });

        } else {
            if (!user || !user.id) return;
            console.log("USER ID", user["id"])
            axios.get(process.env.EXPO_PUBLIC_API_URL + "/api/user/" + user.id,{
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
        axios.post(process.env.EXPO_PUBLIC_API_URL + "/api/user/" + id + "/friend").then((response) => {
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
            }
        }).then((response) => {
            console.log('test')
        });
    }

    return (<>
        <View style={{ margin: 5, flexDirection: 'row', justifyContent: 'flex-start', alignItems: 'baseline' }}>
            <View style={{ flexDirection: 'column', alignItems: 'center', justifyContent: 'center', width: '25%', marginRight: 5 }}>
                {profile ? (
                    <Avatar.Image size={64} source={{ uri: `http://localhost:8000/imgprofile/${profile.picture}` }} />
                ) : null}
                {!id || user?.id === id ? (
                    <View style={{ flexDirection: 'row', justifyContent: 'center' }}>
                        <Button mode="contained" style={{ marginRight: 10 }}>Choisir un fichier</Button>
                        <Button mode="contained" onPress={handlePdp}>Envoyer</Button>
                    </View>
                ) : null}
            </View>
            <View style={{ flexDirection: 'column', justifyContent: 'center', width: '25%' }}>
                <Text style={{ fontSize: 24, marginBottom: 10 }}>{profile?.pseudo}</Text>
                {id !== "" && id !== user.id && (
                    <Button mode="contained" style={{ width: '50%' }} onPress={ajoutAmi} >
                        {profile.isFriendRequestSent ? "En attente d'ajout" :
                            profile.isFriendRequest ? "Accepter la demande d'ami" :
                                profile.isFriend ? "Retirer l'ami" : "Ajouter l'ami"}
                    </Button>
                )}
            </View>
        </View>
    <View style={{ flexDirection: 'row' }}>
        <View style={{ margin: 5, width: '25%' }}>
            <Text>Jeux favoris :</Text>
            <View>
                {joueur.filter(item => item.favori === 1).map(item => (
                    <View style={{ marginBottom: 10 }} key={item.idJeu}>
                        <Image source={{ uri: item.jeu.capsule }} style={{ width: 50, height: 50 }} />
                        <Text>{item.nom}</Text>
                    </View>
                ))}
            </View>
            <Text>Jeux actifs :</Text>
            <View>
                {joueur.filter(item => item.actif === 1).map(item => (
                    <View style={{ marginBottom: 10 }} key={item.idJeu}>
                        <Image source={{ uri: item.jeu.capsule }} style={{ width: 50, height: 50 }} />
                        <Text>{item.nom}</Text>
                    </View>
                ))}
            </View>
            <Text>Jeux possédés :</Text>
            <View>
                {joueur.filter(item => item.possede === 1).map(item => (
                    <View style={{ marginBottom: 10 }} key={item.idJeu}>
                        <Image source={{ uri: item.jeu.capsule }} style={{ width: 50, height: 50 }} />
                        <Text>{item.nom}</Text>
                    </View>
                ))}
            </View>
        </View>
        <View style={{ flexDirection: 'column', alignItems: 'center', width: '75%' }}>
            <View>
                <Text style={{ fontSize: 18, marginBottom: 10 }}>Nombre de succès : {success.length}</Text>
                <View style={{ flexDirection: 'row', flexWrap: 'wrap' }}>
                    {success.map(item => (
                        <Card key={item.idSucces} style={{ padding: 10, marginBottom: 10 }}>
                            <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                                <Image source={{ uri: `https://achievementstats.com/${item.iconUnlocked}` }} style={{ marginRight: 10, width: 50, height: 50 }} />
                                <View>
                                    <Text>{item.nom}</Text>
                                    <Text>{item.description}</Text>
                                </View>
                            </View>
                        </Card>
                    ))}
                </View>
            </View>
            <View>
                <Text>Amis</Text>
                <View>
                    {friends.map(item => (
                        <User friend={user.id === id} key={item.id} user={item} />
                    ))}
                </View>
            </View>
            {!id || user?.id === id ? (
                <>
                    <Text>Friends requests</Text>
                    <View>
                        {friendsRequests?.map(item => (
                            <User key={item.id} user={item} />
                        ))}
                    </View>
                    <Text>Friends requests sent</Text>
                    <View>
                        {friendsRequestsSent?.map(item => (
                            <User key={item.id} user={item} />
                        ))}
                    </View>
                </>
            ) : null}
        </View>
    </View>
    </>
);


}

const styles = StyleSheet.create({
    container: {
        flex: 1,
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
});