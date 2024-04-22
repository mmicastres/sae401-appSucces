import { StatusBar } from 'expo-status-bar';
import {Button, StyleSheet, Text, View} from 'react-native';
import {NavigationContainer} from "@react-navigation/native";
import {createNativeStackNavigator} from "@react-navigation/native-stack";
import {useState} from "react";
import {Login} from "./composents/auth/Login";
const Stack = createNativeStackNavigator();

export default function App() {
  const [user,setUser] = useState(false);
  return (
      <NavigationContainer>
        <Stack.Navigator initialRouteName={"Login"} >
          {
            user !==false ?
                <>
                  <Stack.Screen name={"Profile"} children={()=><Text>Profile</Text>}/>
                </>
                :
                <>
                  <Stack.Screen name={"Login"} children={<><Login user={user} setUser={setUser} /></>}/>
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
