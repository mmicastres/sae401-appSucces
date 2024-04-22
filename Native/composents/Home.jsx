import {Button, Text} from "react-native";

export function Home({navigation}) {
    return <><Text>Profile</Text><Button onPress={()=>{
    navigation.push("Jeu",{id:"1"})
}} title={"Jeu"}/>
    </>

}