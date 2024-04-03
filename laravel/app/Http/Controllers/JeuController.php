<?php

namespace App\Http\Controllers;

use App\Models\Jeu;
use App\Models\Joueur;
use App\Models\Succes;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;

class JeuController extends Controller
{

    function jeux(Request $request) // testée et fonctionnelle
    {
        $search = "";
        if ( isset($request->search)){
            $search = $request->search;
        }
        $page = $request->page-1 || 0;
        $step= 80;
        $jeux = Jeu::where("nom","like","%".$search."%")->skip($step*$page)->take($step)->orderByRaw('ISNULL(mostPlayed), mostPlayed ASC')->get();
        return response()->json(["message" => "OK", "jeux" => $jeux]);
    }

    function jeuInfo(Request $request, $id) // testée et fonctionnelle
    {
        $jeu = Jeu::with(["succes"=>function($q){$q->with("detenteurs");}])->find($id);
        $user = $request-user();
        if ($jeu->annee == null || $jeu->description == null){
            $url = "https://store.steampowered.com/api/appdetails?appids=";
            $url .= $jeu->steamId;
            $response = file_get_contents($url);
            $data = json_decode($response, true);
            if ($data[$jeu->steamId]["success"]) {
                $data = $data[$jeu->steamId]["data"];
                $jeu->annee = explode(" ", $data["release_date"]["date"])[2];
                $jeu->description = $data["detailed_description"];
                $jeu->image = $data["header_image"];
                $jeu->capsule = $data["capsule_image"];
                $jeu->priceInitial = isset($data["is_free"]) ? 0 : $data["price_overview"]["initial"];
                $jeu->priceFinal = isset($data["is_free"]) ? 0 : $data["price_overview"]["final"];
                $jeu->dev = $data["developers"][0];
                $jeu->save();
            }

        }
        $achievementkey = env('ACHIEVEMENTSTAT_ACCESSTOKEN');
        if (count($jeu->succes) == 0 && !$jeu->noSuccess) {
            $url="https://api.achievementstats.com/games/".$jeu->steamId."/achievements/?key=".$achievementkey;
            $response = file_get_contents($url);
            $data = json_decode($response, true);
            if (count($data) > 0) {
                foreach ($data as $succesdata) {
                    $succesdata = (object) $succesdata;
                    $succes = new Succes;
                    $succes->idJeu = $jeu->idJeu;
                    $succes->nom = $succesdata->name;
                    $succes->description = $succesdata->description;
                    $succes->iconLocked = $succesdata->iconLocked;
                    $succes->iconUnlocked = $succesdata->iconUnlocked;
                    $succes->save();

                }
            }else{
                $jeu->noSuccess = 1;
                $jeu->save();
            }
        }
        if ($user) {
            $joueur = Joueur::where('idJeu', $id)->where('idUser', $user->id)->first();
            if ($joueur == null) {
                $joueur = new Joueur;
                $joueur->idUser = $user->id;
                $joueur->idJeu = $id;
                $joueur->favori = 0;
                $joueur->possede = 0;
                $joueur->note = null;
                $joueur->actif = 0;
                $joueur->save();
            }
            $jeu->joueur = $joueur;
        }
        return response()->json(["message" => "OK", "jeu" => $jeu]);
    }

    function jeuFavori(Request $request, $id)
    {
        $user = $request-user();
        if (!$user) return response()->json(["status" => 0, "message" => "Vous devez être connecté pour ajouter un jeu aux favoris"], 400);
        $joueur = Joueur::where('idJeu', $id)->where('idUser', $user->id)->first();
        if ($joueur == null) {
            $joueur = new Joueur;
            $joueur->idUser = $user->id;
            $joueur->idJeu = $id;
            $joueur->favori = $request->favori;
            $joueur->possede = 0;
            $joueur->note = null;
            $joueur->actif = 0;
        } else {
            $joueur->favori = $request->favori;
        }
        $ok = $joueur->save();
        if ($ok) {
            return response()->json(["status" => 1, "message" => "Le jeu a été ajouté aux favoris","joueur"=>$joueur], 201);
        } else {
            return response()->json(["status" => 0, "message" => "Erreur"], 400);
        }
    }

    function jeuNoter(Request $request, $id)
    {
        $user = $request-user();
        if (!$user) return response()->json(["status" => 0, "message" => "Vous devez être connecté pour ajouter un jeu aux favoris"], 400);
        $joueur = Joueur::where('idJeu', $id)->where('idUser', $user->id)->first();
        if ($joueur == null) {
            $joueur = new Joueur;
            $joueur->idUser = $user->id;
            $joueur->idJeu = $id;
            $joueur->favori = 0;
            $joueur->possede = 0;
            $joueur->actif = 0;
        }
        $joueur->note = $request->note;
        $ok = $joueur->save();
        if ($ok) {
            return response()->json(["status" => 1, "message" => "La note a été sauvegardée","joueur"=>$joueur], 201);
        } else {
            return response()->json(["status" => 0, "message" => "pb lors de la modification"], 400);
        }
    }

    function jeuPossede(Request $request, $id)
    {
        $user = $request-user();
        if (!$user) return response()->json(["status" => 0, "message" => "Vous devez être connecté pour ajouter un jeu aux favoris"], 400);
        $joueur = Joueur::where('idJeu', $id)->where('idUser', $user->id)->first();
        if ($joueur == null) $joueur = new Joueur(["idUser" => $user->id,"idJeu" => $id,"favori" => 0,"possede" => $request->possede,"note" => null,"actif" => 0]);
        else $joueur->possede = $request->possede;

        $ok = $joueur->save();
        if ($ok) {
            return response()->json(["status" => 1, "message" => "Le jeu a été ajouté à la bibliothèque","joueur"=>$joueur], 201);
        } else {
            return response()->json(["status" => 0, "message" => "pb lors de la modification"], 400);
        }
    }

    function jeuActif(Request $request, $id)
    {
        $actif = $request->actif;
        $user = $request-user();
        if (!$user) return response()->json(["status" => 0, "message" => "Vous devez être connecté pour ajouter un jeu aux favoris"], 400);
        $joueur = Joueur::where('idJeu', $id)->where('idUser', $user->id)->first();
        if ($joueur == null) {
            $joueur = new Joueur;
            $joueur->idUser = $user->id;
            $joueur->idJeu = $id;
            $joueur->favori = 0;
            $joueur->possede = 0;
            $joueur->note = null;
            $joueur->actif = $actif;
        } else {
            $joueur->actif = $actif;
        }
        $ok = $joueur->save();
        if ($ok) {
            return response()->json(["status" => 1,"actif"=>$actif, "message" => "Le jeu a été ajouté aux jeux actifs","joueur"=>$joueur], 201);
        } else {
            return response()->json(["status" => 0, "message" => "pb lors de la modification"], 400);
        }
    }
}
