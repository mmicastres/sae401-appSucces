import { View } from "react-native";
import { Text, Button, Avatar } from "react-native-paper";

export function User({ user, friend = false, navigation }) {
    return (
        <View style={{ flex: 1, flexDirection: "row", alignItems: "center", marginVertical: 5 }}>
            {user.picture ? (
                <Avatar.Image size={24} style={{ marginHorizontal: 5 }} source={`http://localhost:8000/storage/imgprofile/${user.picture}`} />
            ) : <></>}
            <Text variant="bodyLarge"  onPress={() => navigation.navigate(`Profile`, { id: user.id })} >{user.pseudo}</Text>
            {friend ? <Button variant="outlined">Envoyer un message</Button>
                :
                null
            }
        </View>
    )
}