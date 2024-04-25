import { Text, View } from "react-native";
import { Button } from "react-native-paper";

export function User({ user, friend = false }) {
    return (
        <View style={{flex: 1, flexDirection:"row", alignItems:"center" }}>
            <Text>{user.pseudo}</Text>

            {friend ? <Button variant="outlined">Envoyer un message</Button>
                :
                null
            }
        </View>
    )
}