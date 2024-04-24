import {Button, Text} from "react-native";
import {BottomNavigation} from "react-native-paper";
import {useEffect, useState} from "react";
import {Home} from "./Home";
import {Profile} from "./Profile";

export function BottomNav({navigation,token,user}) {
    const [index,setIndex] = useState(0)
    const [routes,setRoutes] = useState([
        {key: 'home', title: 'Home',focusedIcon:"home", unfocusedIcon:"home-outline"},
        {key: 'profile', title: 'Profile',  focusedIcon:"account-circle", unfocusedIcon:"account-circle-outline"},
        {key: 'message', title: 'Message', focusedIcon:"message", unfocusedIcon:"message-outline"},
    ])
    const renderScene = BottomNavigation.SceneMap({
        home: ()=><Home navigation={navigation}/>,
        profile: ()=><Profile navigation={navigation} token={token} user={user}/>,
        message: ()=><Text>Message</Text>
    })


    return <>
        <BottomNavigation navigationState={{index,routes}} onIndexChange={setIndex} renderScene={renderScene}/>
    </>

}