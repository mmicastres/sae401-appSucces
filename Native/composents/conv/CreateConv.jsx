import React, {useEffect, useState} from 'react';
import {  Text, TextInput, Button } from 'react-native-paper';
import { ScrollView, View } from 'react-native';
import axios from 'axios';

export function CreateConv({token,navigation}) {
    const [selectedFriends, setSelectedFriends] = useState([]);
    const [title, setTitle] = useState('');
    const [friends, setFriends] = useState([]);

    useEffect(() => {
        axios.get(`${process.env.EXPO_PUBLIC_API_URL}/api/conv`, {
            headers: {
                'Authorization': 'Bearer ' + token,
            },
        }).then((response) => {

            setFriends(response.data.friends);
        })
    }, []);

    const handleFriendToggle = (friendId) => {
        const isSelected = selectedFriends.some((friend) => friend.id === friendId);

        if (isSelected) {
            setSelectedFriends(selectedFriends.filter((friend) => friend.id !== friendId));
        } else {
            const selectedFriend = friends.find((friend) => friend.id === friendId);
            setSelectedFriends([...selectedFriends, selectedFriend]);
        }
    };

    const handleCreateConversation = async () => {
        try {
            const participantIds = selectedFriends.map((friend) => friend.id);
            const response = await axios.post(`${process.env.EXPO_PUBLIC_API_URL}/api/conv`, {
                titre: title,
                participants: participantIds
            },{
                headers: {
                    "Authorization": "Bearer " + token,
                }
            });
            console.log(response.data);
            navigation.goBack();
            // Optionally handle successful creation (e.g., navigate to a new screen)
        } catch (error) {
            console.error('Error creating conversation:', error);
        }
    };

    return (
        <View style={{ flex: 1, padding: 16 }}>
            <Text style={{ fontSize: 20, marginBottom: 16 }}>Create Conversation</Text>
            <TextInput
                label="Title"
                value={title}
                onChangeText={(text) => setTitle(text)}
                style={{ marginBottom: 16 }}
            />
            <ScrollView style={{ marginBottom: 16 }}>
                {friends.map((friend) => (
                    <Button
                        key={friend.id}
                        mode={selectedFriends.some((selectedFriend) => selectedFriend.id === friend.id) ? 'contained' : 'outlined'}
                        onPress={() => handleFriendToggle(friend.id)}
                        style={{ marginBottom: 8 }}>
                        {friend.pseudo}
                    </Button>
                ))}
            </ScrollView>
            <Button mode="contained" onPress={handleCreateConversation}>
                Create Conversation
            </Button>
        </View>
    );
}