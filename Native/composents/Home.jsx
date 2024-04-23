
import {useEffect, useState} from "react";
import axios from "axios";
import { View, Text, TextInput, FlatList, TouchableOpacity } from 'react-native';
import { Card, Title, Button } from 'react-native-paper';

export function Home({user,navigation}) {
    const [jeux,setJeux] = useState([]);
    const [page,setPage] = useState(1);
    const [search,setSearch] = useState("")
    useEffect(() => {
        axios.get(process.env.EXPO_PUBLIC_API_URL+"/api/jeux?page="+page+(search !== "" ? "&search="+search : ""  )).then((response) => {
            setJeux(response.data.jeux);
            console.log("response",response.data);
        });
    }, [search,page]);

    const handleSearch = () => {
        //
    }

    const renderItem = ({ item }) => (
        <TouchableOpacity onPress={() => navigation.navigate('Jeu', { idJeu: item.idJeu })}>
            <Card style={{ margin: 8 }}>
                <Card.Cover source={{ uri: `https://cdn.cloudflare.steamstatic.com/steam/apps/${item.steamId}/header.jpg` }} />
                <Card.Content>
                    <Title>{item.nom} {item.idJeu}</Title>
                </Card.Content>
            </Card>
        </TouchableOpacity>
    );

    return (
        <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
            <Text>Home page</Text>
            <View style={{ flexDirection: 'row', alignItems: 'center', marginBottom: 16 }}>
                <TextInput
                    style={{ flex: 1, borderWidth: 1, padding: 8 }}
                    placeholder="Search..."
                    onChangeText={(text) => setSearch(text)}
                />
                <Button mode={"contained"} onPress={handleSearch} >Search</Button>
            </View>
            {user ? (
                <Button onPress={() => navigation.navigate('Profile')} >Profile</Button>
            ) : (
                <Button onPress={() => navigation.navigate('Login')} >Login</Button>
            )}
            <Text>Jeux</Text>
            <FlatList
                data={jeux}
                renderItem={renderItem}
                keyExtractor={(item) => item.idJeu.toString()}
                numColumns={2}
                contentContainerStyle={{ paddingHorizontal: 16 }}
            />
            <View style={{ flexDirection: 'row', marginTop: 16 }}>
                <Button
                    mode={"contained"}
                    onPress={() => {
                        if (page > 1) setPage(page - 1);
                    }}
                >Previous</Button>
                <Button
                    mode={"contained"}
                    onPress={() => setPage(page + 1)} >Next</Button>
            </View>
            {user ? <Text>Connected as {user.nom}</Text> : <Text>Not connected</Text>}
        </View>
    );
}