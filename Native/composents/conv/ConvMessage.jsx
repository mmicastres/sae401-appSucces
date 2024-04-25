import React, { useEffect, useState } from 'react';
import { View, Text, ScrollView, TextInput } from 'react-native';
import { Button, Card } from 'react-native-paper';
import axios from 'axios';

export function ConvMessage({ user, token, route }) {
    const [messages, setMessages] = useState([]);
    const [content, setContent] = useState('');
    const current = route.params.convId;

    useEffect(() => {
        const fetchMessages = async () => {
            try {
                const response = await axios.get(`${process.env.EXPO_PUBLIC_API_URL}/api/conv/${current}`,{
                    headers: {
                        "Authorization": "Bearer " + token,
                    }
                });
                setMessages(response.data?.conversation?.messages || []);
            } catch (error) {
                console.error('Error fetching messages:', error);
            }
        };

        fetchMessages();


    }, [current]);

    const handleLikeMessage = async (itemId) => {
        try {
            const response = await axios.post(`${process.env.EXPO_PUBLIC_API_URL}/api/conv/${current}/${itemId}`,{},{
                headers: {
                "Authorization": "Bearer " + token,
                }
            });
            const updatedMessages = messages.map((message) =>
                message.idMessage === itemId ? { ...message, likes: message.likes + 1 } : message
            );
            setMessages(updatedMessages);
            console.log(response.data);
        } catch (error) {
            console.error('Error liking message:', error);
        }
    };

    const handleDeleteMessage = async (itemId) => {
        try {
            const response = await axios.delete(`${process.env.EXPO_PUBLIC_API_URL}/api/conv/${current}/${itemId}`,{
                headers: {
                    "Authorization": "Bearer " + token,
                }
            });
            const updatedMessages = messages.filter((message) => message.idMessage !== itemId);
            setMessages(updatedMessages);
            console.log(response.data);
        } catch (error) {
            console.error('Error deleting message:', error);
        }
    };

    const handleSendMessage = async (content) => {
        try {
            const response = await axios.post(`${process.env.EXPO_PUBLIC_API_URL}/api/conv/${current}`, { content:content },{
                headers: {
                    "Authorization": "Bearer " + token,
                }
            });
            setMessages([...messages, response.data?.newMessage]);
            console.log(response.data);
            setContent("")
        } catch (error) {
            console.error('Error sending message:', error);
        }
    };

    return (
        <View style={{ flex: 1 }}>
            <Text>Messages {current}</Text>
            <ScrollView style={{ flex: 1 }}>
                {messages.map((item) => (
                    <Card
                        key={item.idMessage}
                        style={{
                            padding: 10,
                            backgroundColor: item.userId === user.id ? '#007bff' : '#6c757d',
                            alignSelf: item.userId === user.id ? 'flex-end' : 'flex-start',
                            marginBottom: 10,
                        }}>
                        <Text>{item.content}</Text>
                        <View style={{ flexDirection: 'row', justifyContent: 'space-between', marginTop: 10 }}>
                            <Button onPress={() => handleLikeMessage(item.idMessage)}>Like</Button>
                            <Text>{item.userId === user.id ? 'Vous' : 'Autre'}</Text>
                            {item.userId === user.id && (
                                <Button onPress={() => handleDeleteMessage(item.idMessage)}>Suppr</Button>
                            )}
                        </View>
                    </Card>
                ))}
            </ScrollView>
            <View style={{ flexDirection: 'row', alignItems: 'center', padding: 10 }}>
                <TextInput
                    style={{ flex: 1, marginRight: 10, borderWidth: 1, borderColor: '#ccc', padding: 5 }}
                    placeholder="Message"
                    onChangeText={(text) => setContent(text)}
                />
                <Button onPress={() => handleSendMessage(content)} mode="contained">
                    Envoyer
                </Button>
            </View>
        </View>
    );
}