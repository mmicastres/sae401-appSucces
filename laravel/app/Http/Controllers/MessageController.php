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
            return response()->json(["status" => 1, "message" => "Le jeu a été ajouté aux favoris"], 201);
        } else {
            return response()->json(["status" => 0, "message" => "Erreur"], 400);
        }
    }

    public function convContenu(Request $request, $id){
        $conversation = Conversation::with('messages')->find($id);
        return response()->json(["message" => "OK", "conversation" => $conversation]);
    }
}
