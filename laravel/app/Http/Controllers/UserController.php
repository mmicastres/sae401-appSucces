<?php

namespace App\Http\Controllers;

use App\Models\User;
use App\Models\FriendRequest;
use Illuminate\Http\Request;

class UserController extends Controller
{
    public function userInfo($id)
    {
        $user = User::with("succes")->find($id);
        return $user;
    }

    public function friendRequest(Request $request, $id)
    {
        $friend = new FriendRequest;
        $friend->demandeur = $id;
        $friend->destinataire = $request->idDestinataire;
        $friend->accepter = 0;
        $ok = $friend->save();
        if ($ok) {
            return response()->json(["status" => 1, "message" => "La demande d'ami a bien été envoyée"], 201);
        } else {
            return response()->json(["status" => 0, "message" => "Erreur"], 400);
        }
    }

    public function friendAccept(Request $request, $id)
    {
        $friend = DB::where('demandeur', $request->id)->where('destinataire', $id)->get();
        $friend->accepter = 1;
        $ok = $friend->save();
        if ($ok) {
            return response()->json(["status" => 1, "message" => "La demande d'ami a bien été acceptée"], 201);
        } else {
            return response()->json(["status" => 0, "message" => "Erreur"], 400);
        }
    }

    public function friendDelete(Request $request, $id)
    {
        $valeur1 = $id;
        $valeur2 = $request->id;
        $friend = DB::where(function ($query) use ($valeur1, $valeur2) {
            $query->where('demandeur', $valeur1)
                ->where('destinataire', $valeur2);
        })->orWhere(function ($query) use ($valeur1, $valeur2) {
            $query->where('demandeur', $valeur2)
                ->where('destinataire', $valeur1);
        })->get();
        $ok = $friend->delete();
        if ($ok) {
            return response()->json(["status" => 1, "message" => "Vous n'êtes plus ami avec ".$request->pseudo], 201);
        } else {
            return response()->json(["status" => 0, "message" => "Erreur lors de la suppression de l'ami"], 400);
        }
    }
}
