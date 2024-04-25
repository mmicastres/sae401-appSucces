import React, {useEffect, useState} from 'react';
import { View, Text, Button } from 'react-native';
import { List, ListItem } from 'react-native-paper';
import { useNavigation } from '@react-navigation/native';
import axios from "axios";

export function ConvList({token,navigation}) {
    const [open, setOpen] = useState(false);
    const [conv, setConv] = useState([]);
    const [friends, setFriends] = useState([]);
    useEffect(() => {
        axios.get(process.env.EXPO_PUBLIC_API_URL + "/api/conv",{
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
        <View style={{ minWidth: '33.3%' }}>
            <Text>Liste des conv</Text>
            {/* Assuming CreateConv is a modal */}
            <Button onPress={handleCreateConv} title="Create conv" />
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