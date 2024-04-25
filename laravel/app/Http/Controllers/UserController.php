<?php

namespace App\Http\Controllers;

use App\Http\Requests\Auth\LoginRequest;
use App\Models\User;
use App\Models\FriendRequest;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Storage;
use Illuminate\Support\Facades\Response;

class UserController extends Controller
{
    public function userInfo(Request $request,$id)
    {
        $userId = strval($request->user()->id);
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
        if ($userId) {
            $user->isFriend = $user->friends->contains($userId);
            //$user->isFriendRequest = $user->friendRequests->where("demandeur",$userId)->where("destinataire",$id)->first();
            //$user->isFriendRequestSent = $user->friendRequestsSent->where("demandeur",$id)->where("destinataire",$userId)->first();
            $user->isFriendRequestSent = $user->friendRequests->contains($userId);
            $user->isFriendRequest = $user->friendRequestsSent->contains($userId);
        }
        unset($user->friends1);
        unset($user->friends2);
        return $user;
    }

    function profilePicture(Request $request, $id)
    {
        $file = $request->file('avatar');
        if ($file) {
            $user = User::find($id);
            if ($user->picture != null) {
                $anciennepdp = $user->picture;
                unlink(storage_path('/app/public/imgprofile/' . $anciennepdp));
            }
            $imageName = $id . '.' . $file->extension();
            $imagePath = storage_path() . '/app/public/imgprofile';
            $file->move($imagePath, $imageName);
        }

        // Modification en BD
        $user = User::find($id);
        $user->picture = $imageName;
        $ok = $user->save();
        if ($ok) {
            return response()->json(["status" => 1, "message" => "La photo de profil a été modifiée"], 204);
        } else {
            return response()->json(["status" => 0, "message" => "Erreur"], 400);
        }
    }

    //😈
    public function friendRequest(Request $request, $id)
    {
        $user = $request->user();
        $friends1 = $user->friends1;
        $friends2 = $user->friends2;
        //$user->isFriendRequest = $user->friendRequests->where("demandeur",$userId)->where("destinataire",$id)->first();
        //$user->isFriendRequestSent = $user->friendRequestsSent->where("demandeur",$id)->where("destinataire",$userId)->first();
        $friendRequestsSents = FriendRequest::where("demandeur", $user->id)->where("destinataire", $id)->first();
        $friendRequest = FriendRequest::where("demandeur", $id)->where("destinataire", $user->id)->first();
        if ($friendRequestsSents) {
            $friendRequestsSents->delete();
            return response()->json(["message" => "Demande d'ami annulée"]);
        }
        if ($friendRequest) {

            $friendRequest->accepter = 1;
            $friendRequest->save();

            return response()->json(["message" => "Demande d'ami Accepter"]);
        }
        $friends = $friends1->merge($friends2);
        foreach ($friends as $friend) {
            if ($friend->id == $id) {
                $friend->delete();
                return response()->json(["message" => "Ami retiré"]);
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


    public function login(LoginRequest $request)
    {
// -- LoginRequest a verifié que les email et password étaient présents
// -- il faut maintenant vérifier que les identifiants sont corrects
        $credentials = request(['email', 'password']);
        if (!Auth::attempt($credentials)) {
            return response()->json([
                'status' => 0,
                'message' => 'Utilisateur inexistant ou identifiants incorreccts'
            ], 401);
        }
// tout est ok, on peut générer le token
        $user = $request->user();
        $tokenResult = $user->createToken('Personal Access Token');
        $token = $tokenResult->plainTextToken;
        return response()->json([
            'status' => 1,
            'accessToken' => $token,
            'token_type' => 'Bearer',
            'user_id' => $user->id
        ]);
    }


    public function register()
    {
        $data = request()->validate([
            'pseudo' => 'required',
            'email' => 'required|email',
            'password' => 'required'
        ]);
        $data['password'] = bcrypt($data['password']);
        $user = User::create($data);
        $token = $user->createToken('Personal Access Token')->plainTextToken;
        return response()->json([
            'status' => 1,
            'accessToken' => $token,
            'token_type' => 'Bearer',
            'user_id' => $user->id
        ]);
    }
}
