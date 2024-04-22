import { StatusBar } from 'expo-status-bar';
import {Button, StyleSheet, Text, View} from 'react-native';
import {NavigationContainer, useNavigation} from "@react-navigation/native";
import {createNativeStackNavigator} from "@react-navigation/native-stack";
import {useEffect, useState} from "react";
import {getUser, Login} from "./composents/auth/Login";
import {Home} from "./composents/Home";
const Stack = createNativeStackNavigator();

export default function App() {
  const [user,setUser] = useState(false);
  const [token,setToken] = useState(null)

    useEffect(() => {
        const localtoken = localStorage.getItem("token");
        if (localtoken){
            setUser(getUser(localtoken))
            setToken(localtoken)
        }
    }, []);
  return (
      <NavigationContainer>
        <Stack.Navigator initialRouteName={"Login"} >
          {
            user !==false ?
                <>
                  <Stack.Screen name={"Profile"} component={Home}/>
                  <Stack.Screen name={"Jeu"} children={({navigation,route})=>{
                      const id = route.params.id
                      return <><Text>Jeu {id} s</Text><Button onPress={()=>{
                          navigation.push("Succes")
                      }} title={"Push"}/> </>
                  }}/>
                    <Stack.Screen name={"Succes"} children={()=>{<Text>Suces</Text>}}/>
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
