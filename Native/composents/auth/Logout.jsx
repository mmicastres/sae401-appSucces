import React, { useEffect } from 'react';
import { Button } from 'react-native-paper';
import axios from 'axios';
import AsyncStorage from "@react-native-async-storage/async-storage";

export function Logout({ setUser,setToken,navigation }) {

    useEffect(() => {
        // You can add any necessary setup logic here
        // This useEffect will run once on component mount
    }, []);

    function logout() {
        // Clear localStorage or any other session management here
        // Example: AsyncStorage.removeItem('user');

        // Simulate a logout API call (replace with your actual API endpoint)
        axios.post(`${process.env.EXPO_PUBLIC_API_URL}/api/logout`)
            .then(() => {
                AsyncStorage.multiRemove(['token', 'user']).then(()=>{
                    setUser(false); // Update the user state
                    setToken(null); // Update the token state
                }); // Clear the token and user data from storage

            })
            .catch((error) => {
                console.error('Logout Error:', error);
            });
    }

    return (
        <Button mode="contained" onPress={logout}>
            Déconnexion
        </Button>
    );
}