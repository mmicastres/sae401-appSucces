import axios from "axios";
import {useState} from "react";
import {Button, Text, TextInput, View} from "react-native";
import {useNavigation} from "@react-navigation/native";
export async function  getUser(token){
    const res =await axios.get(process.env.EXPO_PUBLIC_API_URL+"/api/me",
        {
            headers:{
                "Authorization" : "Bearer "+token
            }
        })
    if (res.status >= 200 && res.status < 300 && res.status !== 204) {
        // store the user as json
        localStorage.setItem("token",token)
        localStorage.setItem("user", JSON.stringify(res.data))
        return res.data
    }
    return false;
}
export function Login({setUser,user,token,setToken}) {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState(null);
  const navigate = useNavigation();

    console.log(process.env.EXPO_PUBLIC_API_URL)

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError(null);
    try {
        const res = await axios.post(process.env.EXPO_PUBLIC_API_URL+"/api/login", {
            email: email,
            password: password,
        }, {
            headers: {
                "Accept": "application/json",
            }
        });
        if (res.status >= 200 && res.status < 300) {
            console.log(res.data.accessToken)
            setToken(res.data.accessToken)
            getUser(res.data.accessToken).then((user)=>{
                setUser(user)
                if (user){
                    //toast("success","Vous êtes connecté")
                    navigate.navigate("/profile")
                }
            })
        }
    } catch (error) {
      setError(error.message);
    }
  };

    return <View>
        <Text>Connexion</Text>
        <TextInput onChange={(e) => {
            if (e.target) setEmail(e.target.value)
        }} value={email} placeholder={"Email"} type={"email"}/>
        <TextInput onChange={(e) => {
            if (e.target) setPassword(e.target.value)
        }} value={password} placeholder={"Password"} textContentType={"password"}/>
        <Button title={"Connexion"} onPress={handleSubmit}/>

    </View>
  /*
  return (
      <div className={"w-full h-full flex flex-col justify-center items-center gap-4"}>
          <h1>Connexion</h1>
          <form onSubmit={handleSubmit} className={"gap-4 flex flex-col"}>
              <TextField label="Email" variant={"outlined"} value={email} color={"primary"} defaultValue={"fdksifsj"}
                         type={"email"} onChange={(e) => {
                  if (e.target) setEmail(e.target.value)
                  if (e.target) console.log(e.target.value)
              }}>
                  <TextField.LeadingIcon>
                      <Mail/>
                  </TextField.LeadingIcon>
              </TextField>
              <div className={"flex flex-col"}>
                  <TextField label="Password" variant={"outlined"} value={password} color={"primary"}
                             defaultValue={"fdksifsj"} type={"password"} onChange={(e) => {
                      if (e.target) setPassword(e.target.value)
                      if (e.target) console.log(e.target.value)
                  }}>
                      <TextField.LeadingIcon>
                          <Lock/>
                      </TextField.LeadingIcon>
                  </TextField>
                  <Link className={"underline text-end"} to={"/forgotPass"}>Mot de passe oublié</Link>
              </div>

            <div className={"flex gap-4"}>
                <Button variant={"outlined"} className={"flex-1"} onClick={() => {
                    navigate("/register")
                }}>register
                </Button>
                <Button color={"primary"} className={"flex-1"} type={"submit"} variant={"filled"}>Connexion</Button>
            </div>
          </form>

          {error && <p>{error}</p>}
      </div>
  );*/
}