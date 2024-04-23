import { StatusBar } from 'expo-status-bar';
import {Button, StyleSheet, Text, View} from 'react-native';
import {NavigationContainer, useNavigation} from "@react-navigation/native";
import {createNativeStackNavigator} from "@react-navigation/native-stack";
import {useEffect, useState} from "react";
import {getUser, Login} from "./composents/auth/Login";
import {BottomNav, Home} from "./composents/BottomNav";
import {Jeu} from "./composents/Jeu";
import AsyncStorage from '@react-native-async-storage/async-storage';

const Stack = createNativeStackNavigator();

export default function App() {
  const [user,setUser] = useState(false);
  const [token,setToken] = useState(null)

    useEffect(() => {
        AsyncStorage.getItem("token").then((localtoken)=>{
            console.log(localtoken)
            if (localtoken){
                setUser(getUser(localtoken))
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
                  <Stack.Screen name={"Profile"} component={BottomNav}/>
                  <Stack.Screen name={"Jeu"} component={Jeu}/>
                    <Stack.Screen name={"Succes"} children={()=>{<Text>Succes</Text>}}/>
                    </>
                :
                <>
                  <Stack.Screen name={"Login"} children={()=><Login user={user} setUser={setUser} token={token} setToken={setToken} />}/>
                  <Stack.Screen name={"Register"} children={()=><Text>Register</Text>}/>
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
