<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use App\Models\Conversation;
use App\Models\Participe;
use App\Models\Message;
use App\Models\Likes;
use DB;

class MessageController extends Controller
{
    public function listConv(Request $request)
    {
        // $pseudo = Auth::user()->pseudo;
        $conversations = Conversation::with('users')->get();
        return response()->json(["message" => "OK", "conversations" => $conversations]);
    }

    public function newConv(Request $request)
    {
        $statement = DB::select('Conversation'); // à refaire
        $id = $statement[0]->Auto_increment;
        $conv = new Conversation;
        $conv->idConversation = $id;
        $conv->titre = $request->titre;
        $ok = $conv::save();
        if ($ok) {
            foreach ($request->participants as $user) {
                $participe = new Participe;
                $participe->idConversation = $id;
                $participe->pseudo = $user->pseudo;
                $participe::save();
            }
            return response()->json(["status" => 1, "message" => "La conversation a été créé"], 201);
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
                $anciens = Participe::where('idConversation', $id)->get();
                $anciens->delete();
                foreach ($request->participants as $user) {
                    $participe = new Participe;
                    $participe->idConversation = $id;
                    $participe->pseudo = $user->pseudo;
                    $participe::save();
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
        $msg->content = $request->content;
        // $msg->dateTime = ;
        $msg->pseudo = Auth::user()->pseudo;
        $msg->idConversation = $request->idConversation;
        $ok = $msg->save();
        if ($ok) {
            return response()->json(["status" => 1, "message" => "Le message a été envoyé"], 201);
        } else {
            return response()->json(["status" => 0, "message" => "Erreur"], 400);
        }
    }

    public function deleteMsg(Request $request, $id, $idmessage)
    {
        $msg = Message::find($idmessage);
        $like = Likes::where('idMessage', $idmessage)->get();
        if ($like) {
            $like->delete();
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
        $like = Likes::where('idMessage', $idmessage)->where('pseudo', Auth::user()->pseudo)->get();
        if($like){
            $ok = $like->delete();
            if ($ok) {
                return response()->json(["status" => 1, "message" => "Votre like a été supprimé"], 201);
            } else {
                return response()->json(["status" => 0, "message" => "Erreur"], 400);
            }
        }else{
            $like->idMessage = $idmessage;
            $like->pseudo = Auth::user()->pseudo;
            $ok = $like->save;
            if ($ok) {
                return response()->json(["status" => 1, "message" => "Votre like a été ajouté"], 201);
            } else {
                return response()->json(["status" => 0, "message" => "Erreur"], 400);
            }
        }
    }
}
