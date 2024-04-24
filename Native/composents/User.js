import {Text} from "react-native";
import {Button} from "react-native-paper";

export function User({user,friend=false}){
    return <>
        <Text>{user.pseudo}</Text>

        {friend ? <Button>Envoyer un message</Button>
            :
            null
        }
            </>
        }