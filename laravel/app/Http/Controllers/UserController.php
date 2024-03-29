<?php

namespace App\Http\Controllers;

use App\Models\User;
use App\Models\FriendRequest;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Storage;
use Illuminate\Support\Facades\Response;

class UserController extends Controller
{
    public function userInfo($id)
    {
        $userId = Auth::id();
        if ($id && $userId != $id) {
            $user = User::with("succes")->with("friends1")->with("friends2")->with(["joueur" => function ($query) {
                $query->where('favori', 1)->orWhere('possede', 1)->orWhere('actif', 1)->with('jeu');
            }])->find($id);
        } else {

            $user = User::with("succes")->with("friends1")->with("friends2")->with("friendRequests")->with("friendRequestsSent")->with(["joueur" => function ($query) {
                $query->where('favori', 1)->orWhere('possede', 1)->orWhere('actif', 1)->with('jeu');
            }])->find($id);
        }
        $user->friends = $user->friends1->merge($user->friends2);
        unset($user->friends1);
        unset($user->friends2);
        return $user;
    }

    function profilePicture(Request $request, $id)
    {
        $request->validate([
            'photo' => 'nullable|image|mimes:jpeg,png,jpg,gif|max:2048',
        ]);

        // Vérifier si un fichier a été téléchargé
        if (!$request->hasFile('avatar')) {
            return Response::json(['status' => 0, 'message' => 'Aucun fichier téléchargé'], 400);
        }

        // récupération du nom de l'ancienne photo de profil et suppression sur le serveur
        $anciennepdp = public_path("imgprofile/" . $id);
        if (file_exists($anciennepdp)) {
            unlink($anciennepdp);
        }
        // Téléchargement de la nouvelle photo de profil
        $path = $request->file('photo')->storeAs('public/imgprofile', $id);


        // Modification en BD
        $userId = Auth::id();
        $user = User::find($userId);
        $user->picture = $request->photo;
        $user->save();

        if (!$path) {
            return Response::json(['status' => 0, 'message' => 'Erreur'], 400);
        }

        return Response::json(['status' => 1, 'message' => 'Succès'], 200);
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
            return response()->json(["status" => 1, "message" => "Vous n'êtes plus ami avec " . $request->pseudo], 201);
        } else {
            return response()->json(["status" => 0, "message" => "Erreur lors de la suppression de l'ami"], 400);
        }
    }
}
