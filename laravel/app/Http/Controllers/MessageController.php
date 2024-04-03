<?php

namespace App\Http\Controllers;

use http\Env\Response;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use App\Models\Conversation;
use App\Models\Participe;
use App\Models\Message;
use App\Models\Likes;
use DB;
use Carbon\Carbon;

class MessageController extends Controller
{
    public function listConv(Request $request)
    {
        $user = $request->user();
        if (!$user) return response()->json(["Message"=>"No !"],403);
        // get user friends
        $friends1 = $user->friends1;
        $friends2 = $user->friends2;
        $friends = $friends1->merge($friends2);
        $conversations = $user->conversations;
        return response()->json(["message" => "OK", "conversations" => $conversations,"friends"=>$friends]);
    }

    public function newConv(Request $request)
    {
        $userId = $request-user()->id;
        if (!$userId) return response()->json(["Message"=>"No !"],403);
        $conv = new Conversation;
        $conv->titre = $request->titre;
        $ok = $conv->save();
        $id = $conv->idConversation;
        if ($ok) {
            $participe = new Participe;
            $participe->idConv = $id;
            $participe->userId = $userId;
            $ok = $participe->save();
            if (!$ok) return response()->json(["status"=>0,"message"=>"Erreur lors de l'ajout d'un membre"],304);

            foreach ($request->participants as $userId) {
                $participe = new Participe;
                $participe->idConv = $id;
                $participe->userId = $userId;
                $ok = $participe->save();
                if (!$ok) return response()->json(["status"=>0,"message"=>"Erreur lors de l'ajout d'un membre"],304);
            }
            return response()->json(["status" => 1,"id"=>$id, "message" => "La conversation a été créé"], 201);
        } else {
            return response()->json(["status" => 0, "message" => "Erreur"], 400);
        }
    }

    public function convContenu(Request $request, $id)
    {
        $conversation = Conversation::with('messages')->find($id);
        return response()->json(["message" => "OK", "conversation" => $conversation]);
    }

    public function modifConv(Request $request, $id)
    {
        $conv = Conversation::find($id);
        $conv->titre = $request->titre;
        $ok = $conv->save();
        if ($ok) {
            if (!empty($request->participants)) {
                $anciens = Participe::where('idConv', $id)->delete();
                foreach ($request->participants as $userId) {
                    $participe = new Participe;
                    $participe->idConv = $id;
                    $participe->userId = $userId;
                    $ok = $participe->save();
                    if (!$ok) return response()->json(["status"=>0,"message"=>"Erreur lors de l'ajout d'un membre"],304);
                }
            }
            return response()->json(["status" => 1, "message" => "La conversation a été modifié"], 201);
        } else {
            return response()->json(["status" => 0, "message" => "Erreur"], 400);
        }
    }

    public function deleteConv(Request $request, $id)
    {
        $anciens = Participe::where('idConversation', '=', $id)->get();
        $anciens->delete();
        $messages = Message::where('idConversation', '=', $id)->get();
        foreach ($messages as $msg) {
            $like = Likes::where('idMessage', $msg->idMessage)->get();
            if ($like) {
                $like->delete();
            }
        }
        $messages->delete();
        $conv = Conversation::find($id);
        $ok = $conv->delete();
        if ($ok) {
            return response()->json(["status" => 1, "message" => "La conversation a été supprimée"], 201);
        } else {
            return response()->json(["status" => 0, "message" => "Erreur"], 400);
        }
    }

    public function addMsg(Request $request, $id)
    {
        $msg = new Message;
        $msg->content = $request->get("content");
        $msg->userId = $request-user()->id;
        $msg->idConversation = $id;
        $ok = $msg->save();
        if ($ok) {
            return response()->json(["status" => 1, "message" => "Le message a été envoyé","newMessage"=>$msg], 201);
        } else {
            return response()->json(["status" => 0, "message" => "Erreur"], 400);
        }
    }

    public function deleteMsg(Request $request, $id, $idmessage)
    {
        $msg = Message::with("likes")->find($idmessage);
        $usr = $request-user()->id;
        if ($msg->userId != $usr) return response()->json(["status" => 0, "message" => "Erreur"], 400);

        $likes = $msg->likes;
        if ($likes) {
            foreach ($likes as $like) {
                $like->delete();
            }
        }
        $ok = $msg->delete();
        if ($ok) {
            return response()->json(["status" => 1, "message" => "Le message a été supprimé"], 201);
        } else {
            return response()->json(["status" => 0, "message" => "Erreur"], 400);
        }
    }

    public function likeMsg(Request $request, $id, $idmessage)
    {
        $msg = Message::find($idmessage);
        $like = Likes::where('idMessage', $idmessage)->where('pseudo', $request-user()->pseudo)->get();
        if($like){
            $ok = $like->delete();
            if ($ok) {
                return response()->json(["status" => 1, "message" => "Votre like a été supprimé"], 201);
            } else {
                return response()->json(["status" => 0, "message" => "Erreur"], 400);
            }
        }else{
            $like->idMessage = $idmessage;
            $like->pseudo = $request-user()->pseudo;
            $ok = $like->save;
            if ($ok) {
                return response()->json(["status" => 1, "message" => "Votre like a été ajouté"], 201);
            } else {
                return response()->json(["status" => 0, "message" => "Erreur"], 400);
            }
        }
    }
}
