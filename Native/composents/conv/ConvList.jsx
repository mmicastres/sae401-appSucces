import React, { useEffect, useState } from 'react';
import { StyleSheet, View, Text } from 'react-native';
import { List, ListItem, Button } from 'react-native-paper';
import { useNavigation } from '@react-navigation/native';
import axios from "axios";

export function ConvList({ token, navigation }) {
    const [open, setOpen] = useState(false);
    const [conv, setConv] = useState([]);
    const [friends, setFriends] = useState([]);
    useEffect(() => {
        axios.get(process.env.EXPO_PUBLIC_API_URL + "/api/conv", {
            headers: {
                "Authorization": "Bearer " + token,
            }
        }).then((response) => {
            console.log(response.data);
            setConv(response.data["conversations"]);
            setFriends(response.data["friends"])
        })
    }, []);

    const handleCreateConv = () => {
        navigation.navigate('CreateConv');
    };

    const handleListItemPress = (itemId) => {
        navigation.navigate('Conv', { convId: itemId });
    };

    return (
        <View style={styles.container}>
            <Text style={styles.titre}>Liste des conversations</Text>

                <Button mode="contained" style={styles.button} onPress={handleCreateConv}>Nouvelle conversation</Button>
            <List.Section>
                {conv.map((item) => (
                    <List.Item

                        key={item.idConversation}
                        title={item.titre}
                        onPress={() => handleListItemPress(item.idConversation)}
                    />
                ))}
            </List.Section>
        </View>
    );
}

const styles = StyleSheet.create({
    button: {
        marginBottom: 10,
        width: '60%',
        alignItems: "center"
    },
    container: {
        flex: 1,
        alignItems: 'center'
    },
    titre: {
        marginTop: 10,
        fontSize: 30,
        textAlign: 'center',
        marginBottom: 20
    }
});