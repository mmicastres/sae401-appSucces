import {Button, Text} from "react-native";
import {BottomNavigation} from "react-native-paper";
import {useState} from "react";
import {Home} from "./Home";

export function BottomNav({navigation}) {
    const [index,setIndex] = useState(0)
    const [routes,setRoutes] = useState([
        {key: 'home', title: 'Home',focusedIcon:"home", unfocusedIcon:"home-outline"},
        {key: 'profile', title: 'Profile',  focusedIcon:"account-circle", unfocusedIcon:"account-circle-outline"},
        {key: 'message', title: 'Message', focusedIcon:"message", unfocusedIcon:"message-outline"},
    ])
    const renderScene = BottomNavigation.SceneMap({
        home: ()=><Home navigation={navigation}/>,
        profile: ()=><Text>Profile</Text>,
        message: ()=><Text>Message</Text>
    })

    return <><Text>Profile</Text><Button onPress={()=>{
    navigation.push("Jeu",{idJeu:"1"})
}} title={"Jeu"}/>
        <BottomNavigation navigationState={{index,routes}} onIndexChange={setIndex} renderScene={renderScene}/>
    </>

}