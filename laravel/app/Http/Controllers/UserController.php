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
        }else{

        $user = User::with("succes")->
        with("friends1")->
        with("friends2")->
        with("friendRequests")->
        with("friendRequestsSent")->
        with(["joueur" => function($query) {
            $query->where('favori', 1)->
            orWhere('possede', 1)->
            orWhere('actif',1)->
            with('jeu');
        }])->find($id);
        }
        $user->friends = $user->friends1->merge($user->friends2);
        if ($userId){
            $user->isFriend = $user->friends->contains($userId);
            //$user->isFriendRequest = $user->friendRequests->where("demandeur",$userId)->where("destinataire",$id)->first();
            //$user->isFriendRequestSent = $user->friendRequestsSent->where("demandeur",$id)->where("destinataire",$userId)->first();
            $user->isFriendRequest = $user->friendRequests->contains($userId);
            $user->isFriendRequestSent = $user->friendRequestsSent->contains($userId);


        }
        unset($user->friends1);unset($user->friends2);
        return $user;
    }

    function profilePicture(Request $request, $id)
    {
        dump($request->avatar);
        dump($request);
        $request->validate([
            'avatar' => 'nullable|image|mimes:jpeg,png,jpg,gif|max:2048',
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
        $path = $request->file('avatar')->storeAs('public/imgprofile', $id);


        // Modification en BD
        $userId = Auth::id();
        $user = User::find($userId);
        $user->picture = $request->avatar;
        $user->save();

        if (!$path) {
            return Response::json(['status' => 0, 'message' => 'Erreur'], 400);
        }

        return Response::json(['status' => 1, 'message' => 'Succès'], 200);
    }

    public function friendRequest(Request $request, $id)
    {   $user = Auth::user();
        $friends1 = $user->friends1;
        $friends2 = $user->friends2;
        //$user->isFriendRequest = $user->friendRequests->where("demandeur",$userId)->where("destinataire",$id)->first();
        //$user->isFriendRequestSent = $user->friendRequestsSent->where("demandeur",$id)->where("destinataire",$userId)->first();
        $friendRequestsSents = FriendRequest::where("demandeur",$user->id)->where("destinataire",$id)->first();
        $friendRequest = FriendRequest::where("demandeur",$id)->where("destinataire",$user->id)->first();
        if ($friendRequestsSents){
            $friendRequestsSents->delete();
            return response()->json(["message"=>"Demande d'ami annulée"]) ;

        }
        if ($friendRequest) {

            $friendRequest->accepter= 1;
            $friendRequest->save();

            return response()->json(["message" => "Demande d'ami Accepter"]);
        }
        $friends = $friends1->merge($friends2);
        foreach ($friends as $friend){
            if ($friend->id == $id){
                $friend->delete();
                return response()->json(["message"=>"Ami retiré"]) ;
            }
        }

        $friend = new FriendRequest;
        $friend->demandeur = $user->id;
        $friend->destinataire = $id;
        $friend->accepter = 0;
        $ok = $friend->save();
        if ($ok) {
            return response()->json(["status" => 1, "message" => "La demande d'ami a bien été envoyée"], 201);
        } else {
            return response()->json(["status" => 0, "message" => "Erreur"], 400);
        }
    }

}
