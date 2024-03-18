<?php

namespace App\Http\Controllers;

use App\Models\Jeu;
use App\Models\Joueur;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;

class JeuController extends Controller
{

    function jeux(Request $request) // testée et fonctionnelle
    {
        $jeux = Jeu::get();
        return response()->json(["message" => "OK", "jeux" => $jeux]);
    }

    function jeuInfo(Request $request, $id) // testée et fonctionnelle
    {
        $jeu = Jeu::with("succes")->find($id);
        $user = Auth::user();
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
        $user = Auth::user();
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
        $user = Auth::user();
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
        $user = Auth::user();
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
        $user = Auth::user();
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
