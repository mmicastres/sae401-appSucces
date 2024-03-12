<?php

namespace App\Http\Controllers;

use App\Models\Jeu;
use App\Models\Joueur;
use App\Models\Succes;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;

class JeuController extends Controller
{
    //
    function jeux(Request $request) // testée et fonctionnelle
    {
        $jeux = Jeu::get();
        return response()->json(["message" => "OK", "jeux" => $jeux]);
    }

    function jeuInfo(Request $request, $id) // testée et fonctionnelle
    {
        $jeux = Jeu::with("succes")->find($id);
        return response()->json(["message" => "OK", "jeu" => $jeux]);
    }

    function jeuSucces(Request $request, $id) // testée et fonctionnelle
    {
        $succes = Succes::where('idJeu', '=', $id)->get();
        return response()->json(["message" => "OK", "succes" => $succes]);
    }

    function jeuFavori(Request $request, $id)
    {
        $pseudo = Auth::user()->pseudo;
        $joueur = Joueur::where('pseudo', $pseudo)->where('idJeu', $id)->get();
        if ($joueur == null) {
            $joueur = new Joueur;
            $joueur->pseudo = $pseudo;
            $joueur->idJeu = $id;
            $joueur->favori = 1;
            $joueur->possede = 0;
            $joueur->note = null;
            $joueur->actif = 0;
        } else {
            $joueur->favori == 0 ? $joueur->favori == 1 : $joueur->favori == 0;
        }
        $ok = $joueur->save();
        if ($ok) {
            return response()->json(["status" => 1, "message" => "Le jeu a été ajouté aux favoris"], 201);
        } else {
            return response()->json(["status" => 0, "message" => "Erreur"], 400);
        }
    }

    function jeuNoter(Request $request, $id)
    {
        $pseudo = Auth::user()->pseudo;
        $joueur = Joueur::where('pseudo', $pseudo)->where('idJeu', $id)->get();
        if ($joueur === null) {
            $joueur = new Joueur;
            $joueur->pseudo = $pseudo;
            $joueur->idJeu = $id;
            $joueur->favori = 0;
            $joueur->possede = 0;
            $joueur->actif = 0;
        }
        $joueur->note = $request->note;
        $ok = $joueur->save();
        if ($ok) {
            return response()->json(["status" => 1, "message" => "La note a été sauvegardée"], 201);
        } else {
            return response()->json(["status" => 0, "message" => "pb lors de la modification"], 400);
        }
    }

    function jeuPossede(Request $request, $id)
    {
        $pseudo = Auth::user()->pseudo;
        $joueur = Joueur::where('pseudo', $pseudo)->where('idJeu', $id)->get();
        if ($joueur === null) {
            $joueur = new Joueur;
            $joueur->pseudo = $pseudo;
            $joueur->idJeu = $id;
            $joueur->favori = 0;
            $joueur->possede = 1;
            $joueur->note = null;
            $joueur->actif = 0;
        } else {
            $joueur->possede == 0 ? $joueur->possede == 1 : $joueur->possede == 0;
        }
        $ok = $joueur->save();
        if ($ok) {
            return response()->json(["status" => 1, "message" => "Le jeu a été ajouté à la bibliothèque"], 201);
        } else {
            return response()->json(["status" => 0, "message" => "pb lors de la modification"], 400);
        }
    }

    function jeuActif(Request $request, $id)
    {
        $pseudo = Auth::user()->pseudo;
        $joueur = Joueur::where('pseudo', $pseudo)->where('idJeu', $id)->get();
        if ($joueur === null) {
            $joueur = new Joueur;
            $joueur->pseudo = $pseudo;
            $joueur->idJeu = $id;
            $joueur->favori = 0;
            $joueur->possede = 0;
            $joueur->note = null;
            $joueur->actif = 1;
        } else {
            $joueur->actif == 0 ? $joueur->actif == 1 : $joueur->actif == 0;
        }
        $ok = $joueur->save();
        if ($ok) {
            return response()->json(["status" => 1, "message" => "Le jeu a été ajouté aux jeux actifs"], 201);
        } else {
            return response()->json(["status" => 0, "message" => "pb lors de la modification"], 400);
        }
    }
}
