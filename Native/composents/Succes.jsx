import { useEffect, useState } from "react";
import axios from "axios";
import { View, Text, Image, TouchableOpacity, ScrollView } from 'react-native';
import { Button, TextInput, Card } from 'react-native-paper';

export function Succes({ user,route,navigation }) {
    console.log(route.params)
    let id  = route.params.idSucces;
    const [succes, setSucces] = useState({ "jeu": { nom: "" }, "commentaires": [] });
    const [obtenu, setObtenu] = useState()
    const [titre, setTitre] = useState("")
    const [titreMod,setTitreMod] = useState("")
    const [commentaireMod, setCommentaireMod] = useState("")
    const [commentaire, setCommentaire] = useState("")
    const [modif, setModif] = useState(null)

    useEffect(() => {
        axios.get(process.env.EXPO_PUBLIC_API_URL + "/api/succes/" + id).then((response) => {
            setSucces(response.data.succes);
        });
        if (user && user.id) {
            axios.get(process.env.EXPO_PUBLIC_API_URL + "/api/user/" + user.id).then((response) => {
                const succesObtenu = response.data.succes.find((element) => element.idSucces == id)
                console.log("succesObtenu", succesObtenu,succesObtenu != undefined)
                succesObtenu != undefined ? setObtenu(1) : setObtenu(0);
            });
        }
    }, [id]);
    console.log(obtenu)

    function handleSucces(event) {
        event.preventDefault();
        if (user && user.id) {

            if (obtenu == 0) {
                axios.post(process.env.EXPO_PUBLIC_API_URL + "/api/succes/" + id, {
                    headers: {
                        "Accept": "application/json",
                    }
                }).then((response) => {
                    setObtenu(1)
                    //toast('success', 'Vous avez obtenu le succès !',5000)
                }).catch((e)=>{
                    //toast('error', 'Erreur lors de l\'obtention du succès',5000)

                });
            } else {
                axios.delete(process.env.EXPO_PUBLIC_API_URL + "/api/succes/" + id, {
                    headers: {
                        "Accept": "application/json",
                    }
                }).then((response) => {
                    setObtenu(0)
                    //toast('success', 'Le succès a été supprimé',5000)
                }).catch((e)=>{
                    //toast('error', 'Erreur lors de la suppression du succès',5000)

                });
            }
        }
    }

    function changeTitre(e) {
        if (e.target) {
            setTitre(e.target.value)
        }
    }

    function changeCommentaire(e) {
        if (e.target) {
            setCommentaire(e.target.value)
        }
    }

    function clearTitre() {
        setTitre('')
    }

    function clearComment() {
        setCommentaire('')
    }

    function handleSendComment(event) {
        event.preventDefault();
        const data = new FormData(event.target);
        setSucces({ ...succes, "commentaires": [{ "idCommentaire": "-1", "titre": data.get("titre"), "content": data.get("commentaire") }, ...succes.commentaires] });
        axios.post(process.env.EXPO_PUBLIC_API_URL + "/api/succes/" + id + "/comment", {
            content: data.get("commentaire"),
            titre: data.get("titre")
        }, {
            headers: {
                "Accept": "application/json",
            }
        }).then((response) => {
            if (response.status >= 200 && response.status < 300) {
                console.log("response", response.data);
                setSucces({ ...succes, "commentaires": [response.data.commentaire, ...succes.commentaires] })
                //toast('success', 'Commentaire ajouté',5000)
            }
        });
    }

    function modComment(event) {
        const button  = event.currentTarget
        const idCommentaire = button.getAttribute("idCommentaire")
        console.log("item",idCommentaire)
        setModif(idCommentaire);
        const item = succes.commentaires.find((item) => item.idCommentaire === parseInt(idCommentaire));
        setTitreMod(item.titre);
        setCommentaireMod(item.content);
    }

    function handleModComment(event, idcommentaire) {
        event.preventDefault();
        console.log("mod",idcommentaire)
        axios.put(process.env.EXPO_PUBLIC_API_URL + "/api/succes/" + id + "/comment/" + idcommentaire, {
            content: commentaireMod,
            titre: titreMod
        }).then((res)=>{
            console.log("res",res)
            if (res.status >= 200 && res.status < 300) {
                setSucces({
                    ...succes, "commentaires": succes.commentaires.map((item) => {
                        if (item.idCommentaire === parseInt(idcommentaire)) {
                            return { ...item, titre: titreMod, content: commentaireMod }
                        }
                        //toast('success', 'Modification du commentaire',5000)

                        return item
                    })
                })
            }else{
                //toast('error', 'Erreur lors de la modification du commentaire',5000)
            }

        })
        setModif(null);
    }

    function handleSupComment(e) {
        if (!e || !e.target) return
        const idCommentaire = e.currentTarget.getAttribute("idCommentaire")
        console.log("SUP,", idCommentaire)
        axios.delete(process.env.EXPO_PUBLIC_API_URL + "/api/succes/" + id + "/comment/" + idCommentaire).then((response) => {
            if (response.status >= 200 && response.status < 300) {
                console.log("response", response.data);
                //toast('success', 'Commentaire supprimé',5000)
                setSucces({
                    ...succes, "commentaires": succes.commentaires.filter((item) => {
                        console.log(item.idCommentaire, idCommentaire)
                        console.log(item.idCommentaire !== parseInt(idCommentaire))
                        return item.idCommentaire !== parseInt(idCommentaire)
                    })
                })
            }
        });


    }

    console.log(id)

    return        <ScrollView>
        <Text style={{ fontSize: 24, marginLeft: 16 }}>Succes {id}</Text>
        <View style={{ flexDirection: 'row', justifyContent: 'space-around' }}>
            <View style={{ flexDirection: 'column' }}>
                <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                    {succes && succes.iconUnlocked ? (
                        <Image style={{ width: 24, height: 24 }} source={{ uri: `https://achievementstats.com/${succes.iconUnlocked}` }} />
                    ) : null}
                    <View style={{ paddingHorizontal: 10 }}>
                        <Text style={{ fontSize: 24 }}>{succes?.nom}</Text>
                        <Text>
                            Jeu : <Text style={{ color: 'violet', textDecorationLine: 'underline' }}>{succes?.jeu?.nom}</Text>
                        </Text>
                    </View>
                </View>
                <Text>Description : {succes?.description}</Text>
                <Button
                    style={{ marginTop: 10 }}
                    mode="contained"
                    color="blue"
                    onPress={handleSucces}
                >
                    {obtenu === 1 ? 'Supprimer le succès' : 'Ajouter le succès'}
                </Button>
            </View>
            <View>
                <Text>Amis ayant le succès :</Text>
                <Text>À venir</Text>
            </View>
        </View>

        <View style={{ justifyContent: 'center', alignItems: 'center' }}>
            <Text style={{ fontSize: 18, textAlign: 'center', marginBottom: 10 }}>Commentaires et aides</Text>
            {user ? (
                <View style={{ width: '50%' }}>
                    <TextInput
                        style={{ marginBottom: 10 }}
                        label="Titre"
                        value={titre}
                        onChangeText={changeTitre}
                        right={<TextInput.Icon name="close-circle" onPress={clearTitre} />}
                    />
                    <TextInput
                        style={{ marginBottom: 10 }}
                        label="Commentaire"
                        value={commentaire}
                        onChangeText={changeCommentaire}
                        right={<TextInput.Icon name="close-circle" onPress={clearComment} />}
                    />
                    <Button mode="contained" onPress={handleSendComment} color="blue">
                        Envoyer
                    </Button>
                </View>
            ) : (
                <>
                    <Text>Vous devez être authentifié pour laisser un commentaire</Text>
                    <TouchableOpacity onPress={() => navigation.navigate('Login')}>
                        <Text>Login</Text>
                    </TouchableOpacity>
                </>
            )}

            <Text style={{ fontSize: 18, textAlign: 'center', marginTop: 20 }}>Tous les commentaires</Text>
            <ScrollView style={{ width: '50%' }}>
                {succes?.commentaires.map((item) => (
                    <Card key={item.idCommentaire} style={{ marginVertical: 10, padding: 10 }}>
                        {modif === item.idCommentaire ? (
                            <View>
                                <TextInput
                                    style={{ marginBottom: 10 }}
                                    label="Titre"
                                    value={titreMod}
                                    onChangeText={(text) => setTitreMod(text)}
                                    right={<TextInput.Icon name="close-circle" onPress={() => setTitreMod('')} />}
                                />
                                <TextInput
                                    style={{ marginBottom: 10 }}
                                    label="Commentaire"
                                    value={commentaireMod}
                                    onChangeText={(text) => setCommentaireMod(text)}
                                    right={<TextInput.Icon name="close-circle" onPress={() => setCommentaireMod('')} />}
                                />
                                <Button mode="contained" onPress={(event) => handleModComment(event, item.idCommentaire)} color="blue">
                                    Envoyer
                                </Button>
                            </View>
                        ) : (
                            <View>
                                <View style={{ flexDirection: 'row', justifyContent: 'flex-end' }}>
                                    <Text style={{ flex: 1 }} onPress={() => navigation.navigate(`/user/${item?.user?.id}`)}>
                                        {item?.user?.pseudo}
                                    </Text>
                                    {/* Upvote and Downvote buttons */}
                                </View>
                                <Text style={{ fontWeight: 'bold', marginVertical: 10 }}>{item.titre}</Text>
                                <Text style={{ margin: 5 }}>{item.content}</Text>
                                {item.idUser === user.id ? (
                                    <View style={{ flexDirection: 'row', justifyContent: 'flex-end' }}>
                                        <Button onPress={() => modComment(item.idCommentaire)}>Modification</Button>
                                        <Button onPress={() => handleSupComment(item.idCommentaire)}>Suppression</Button>
                                    </View>
                                ) : null}
                            </View>
                        )}
                    </Card>
                ))}
            </ScrollView>
        </View>
    </ScrollView>
    return <>
        <h1 className="text-3xl ml-8">Succes {id}</h1>
        <div className="flex justify-around">
            <div className="flex flex-col">
                <div className="flex flex-row items-center">
                    <div>
                        {succes ? (<img className="size-24" src={"https://achievementstats.com/" + succes.iconUnlocked} alt="Icone du succès" />) : (<></>)}
                    </div>
                    <div className="flex flex-col px-2.5">
                        <p className="text-3xl">{succes.nom}</p>
                        <Link className="underline text-violet-700" to={"/jeu/" + succes.jeu.idJeu}>Jeu : {succes.jeu.nom}</Link>
                    </div>
                </div>
                <p>Description : {succes.description}</p>
                <Button className="mt-5" variant="elevated" color="primary" onClick={handleSucces}>{obtenu == 1 ? "Supprimer le succès" : "Ajouter le succès"}</Button>

            </div>
            <div>
                <p>Amis ayant le succès :</p>
                <p>À venir</p>
            </div>
        </div>

        <div className="flex flex-col justify-center items-center">
            <h2 className="text-xl text-center mb-3">Commentaires et aides</h2>
            {user ?
                <form className="size-1/2" onSubmit={handleSendComment}>
                    <TextField className="mb-3" variant="outlined" label="Titre" name="titre" value={titre} onChange={changeTitre}>
                        <TextField.TrailingIcon>
                            <XCircle onClick={() => clearTitre} />
                        </TextField.TrailingIcon>
                    </TextField>
                    <TextField className="mb-3" variant="outlined" label="Commentaire" name="commentaire" value={commentaire} onChange={changeCommentaire}>
                        <TextField.TrailingIcon>
                            <XCircle onClick={() => clearComment} />
                        </TextField.TrailingIcon>
                    </TextField>
                    <Button type="submit" value="Envoyer" variant="elevated" color="primary">Envoyer</Button>
                </form> :
                <>
                    <p>Vous devez etre authentifié pour laisser un commentaire</p>
                    <Link to={"/login"}>Login</Link>
                </>
            }
            <h2 className="text-xl text-center">Tous les commentaires</h2>
            <ul className={"w-1/2"}>
                {succes.commentaires.map((item) => (
                    <li id={item.idCommentaire} key={item.idCommentaire}>
                        <Card className="w-max my-5 p-4 w-full" >
                            {modif == item.idCommentaire ? (
                                <>
                                    <form idCommentaire={item.idCommentaire} onSubmit={(event) => handleModComment(event, item.idCommentaire)}>
                                        <TextField className="mb-3" variant="outlined" label="Titre" name="titre" value={titreMod} onChange={(e)=>{
                                            if (!e || !e.target) return
                                            setTitreMod(e.target.value)
                                        }}>
                                            <TextField.TrailingIcon>
                                                <XCircle onClick={() => setTitreMod("")} />
                                            </TextField.TrailingIcon>
                                        </TextField>
                                        <TextField className="mb-3" variant="outlined" label="Commentaire" name="commentaire" value={commentaireMod} onChange={(e)=>{
                                            if (!e || !e.target) return
                                            setCommentaireMod(e.target.value)
                                        }}>
                                            <TextField.TrailingIcon>
                                                <XCircle onClick={() => setCommentaireMod("")} />
                                            </TextField.TrailingIcon>
                                        </TextField>
                                        <Button type="submit" value="Envoyer" variant="elevated" color="primary">Envoyer</Button>

                                    </form>
                                </>) : (
                                <div>
                                    <div className="flex flex-row justify-end">
                                        <a className="basis-10/12" href={`/user/${item?.user?.id}`}>{item?.user?.pseudo}</a>
                                        <ChevronUp className="basis-1/12" />
                                        <ChevronDown className="basis-1/12" />
                                    </div>
                                    <h2 className="font-semibold m-3">{item.titre}</h2>
                                    <p className="m-5">{item.content}</p>

                                    {item.idUser === user.id ?
                                        <div className="flex flex-row flex-end">
                                            <Button idCommentaire={item.idCommentaire} onClick={modComment}>Modification</Button>
                                            <Button idCommentaire={item.idCommentaire} onClick={handleSupComment}>Suppression</Button>
                                        </div>
                                        : ""}

                                </div>
                            )}
                        </Card>
                    </li>

                ))
                }
            </ul>

        </div >

    </>
}