
import { useEffect, useState } from "react";
import axios from "axios";
import { View, FlatList, TouchableOpacity, StyleSheet, ScrollView } from 'react-native';
import { TextInput, Text, Card, Title, Button } from 'react-native-paper';

export function Home({ user, navigation }) {
    const [jeux, setJeux] = useState([]);
    const [page, setPage] = useState(1);
    const [search, setSearch] = useState("")
    useEffect(() => {
        axios.get(process.env.EXPO_PUBLIC_API_URL + "/api/jeux?page=" + page + (search !== "" ? "&search=" + search : "")).then((response) => {
            setJeux(response.data.jeux);
            console.log("response", response.data);
        });
    }, [search, page]);

    const handleSearch = () => {
        //
    }

    const renderItem = ({ item }) => (
        <TouchableOpacity onPress={() => navigation.navigate('Jeu', { idJeu: item.idJeu })}>
            <Card style={styles.card}>
                <Card.Cover source={{ uri: `https://cdn.cloudflare.steamstatic.com/steam/apps/${item.steamId}/header.jpg` }} />
                <Card.Content style={{ alignItems: "center" }}>
                    <Title>{item.nom}</Title>
                </Card.Content>
            </Card>
        </TouchableOpacity>
    );

    return (
        <ScrollView>
            <View style={{ flex: 1, alignItems: "center" }}>
                <Button onPress={()=>navigation.navigate("Logout")}>Logout</Button>
                <Text variant="headlineLarge">Jeux</Text>
                <TextInput
                    mode="outlined"
                    style={{ width: '80%', marginBottom: 20, marginTop: 10 }}
                    placeholder="Rechercher un jeu"
                    onChangeText={(text) => setSearch(text)}
                />
                <Button style={styles.button} mode={"contained"} onPress={handleSearch} >Rechercher</Button>
                <FlatList
                    data={jeux}
                    renderItem={renderItem}
                    keyExtractor={(item) => item.idJeu.toString()}
                    numColumns={1}
                />
                <View style={{ flexDirection: 'row', marginTop: 16 }}>
                    <Button
                        style={{ marginRight: 5, marginBottom: 10 }}
                        mode={"contained"}
                        onPress={() => {
                            if (page > 1) setPage(page - 1);
                        }}
                    >Précédent</Button>
                    <Button
                        style={{ marginLeft: 5, marginBottom: 10 }}
                        mode={"contained"}
                        onPress={() => setPage(page + 1)} >Suivant</Button>
                </View>
            </View>
        </ScrollView>
    );
}

const styles = StyleSheet.create({
    button: {
        marginBottom: 10,
        width: '40%'
    },
    card: {
        marginBottom: 10,
        width: 340
    }
});