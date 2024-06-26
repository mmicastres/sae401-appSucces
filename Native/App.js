import { StatusBar } from 'expo-status-bar';
import {Button, LogBox, StyleSheet, Text, View} from 'react-native';
import {NavigationContainer, useNavigation} from "@react-navigation/native";
import {createNativeStackNavigator} from "@react-navigation/native-stack";
import {useEffect, useState} from "react";
import {getUser, Login} from "./composents/auth/Login";
import {Register} from "./composents/auth/Register";
import {BottomNav, Home} from "./composents/BottomNav";
import {Jeu} from "./composents/Jeu";
import AsyncStorage from '@react-native-async-storage/async-storage';
import {Succes} from "./composents/Succes";
import {Profile} from "./composents/Profile";
import {ConvMessage} from "./composents/conv/ConvMessage";
import {Logout} from "./composents/auth/Logout";
import {CreateConv} from "./composents/conv/CreateConv";

const Stack = createNativeStackNavigator();

LogBox.ignoreAllLogs();

export default function App() {
  const [user,setUser] = useState(false);
  const [token,setToken] = useState(null)
    console.log("Hey ! i'm a user, here is my state : ",user)
    useEffect(() => {
        AsyncStorage.getItem("token").then((localtoken)=>{
            console.log(localtoken)

            if (localtoken){
                getUser(localtoken).then((data)=>{
                    setUser(data)
                })
                setToken(localtoken)
            }
        })
    }, []);
  return (
      <NavigationContainer>
        <Stack.Navigator initialRouteName={"Login"} >
          {
            user !==false ?
                <>

                  <Stack.Screen name={"Home"} children={({navigation})=><BottomNav navigation={navigation} token={token} user={user}/> }/>
                    <Stack.Screen name={"Profile"} children={({navigation,route})=><Profile route={route} user={user} navigation={navigation} token={token}/>}/>
                  <Stack.Screen name={"Jeu"} children={({route,navigation})=><Jeu route={route} navigation={navigation} token={token}/>}/>
                    <Stack.Screen name={"Succes"} children={({route,navigation})=><Succes user={user} navigation={navigation} route={route} token={token} />}/>
                    <Stack.Screen name={"CreateConv"} children={({route,navigation})=><CreateConv navigation={navigation} token={token} />}/>
                    <Stack.Screen name={"Conv"} children={({route,navigation})=><ConvMessage route={route} user={user} token={token} />}/>
                    <Stack.Screen name={"Logout"} children={()=><Logout user={user} setUser={setUser} token={token} setToken={setToken} />}/>

                </>
                :
                <>
                    <Stack.Screen name={"Login"} children={()=><Login user={user} setUser={setUser} token={token} setToken={setToken} />}/>
                  <Stack.Screen name={"Register"} children={()=><Register user={user} setUser={setUser} token={token} setToken={setToken}/>}/>
                </>

          }
        </Stack.Navigator>
      </NavigationContainer>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
