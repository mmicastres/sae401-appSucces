<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\Obtient;
use App\Models\Succes;
use App\Models\NoteDifficulte;
use App\Models\Commentaire;
use App\Models\Vote;
use Carbon\Carbon;
use Illuminate\Support\Facades\Auth;

class SuccesController extends Controller
{
    //
    public function succes(Request $request, $id)
    {

    }
    public function succesInfo(Request $request, $id){
        //$succes = Succes::with("jeu")->with("commentaires")->find($id);
        // Order commentaires by date
        $succes = Succes::with("jeu")->with(["commentaires"=>function($query){$query->with("user");}])->find($id);
        $succes->commentaires = $succes->commentaires->sortByDesc('idCommentaire');
        return response()->json(["Message"=>"OK","succes" => $succes]);
    }
    public function succesComplete(Request $request, $id)
    {
        $obtient = new Obtient;
        $obtient->idUser = Auth::user()->id;
        $obtient->idSucces = $id;
        $ok = $obtient->save();
        if ($ok) {
            return response()->json(["status" => 1, "message" => "Le succès a été enregistré"], 201);
        } else {
            return response()->json(["status" => 0, "message" => "Erreur lors de l'ajout du succès"], 400);
        }
    }

    public function succesUnComplete(Request $request, $id)
    {
        $idUser = Auth::user()->id;
        $obtient = Obtient::where('idUser', $idUser)->where('idSucces', $id)->first();
        if (!$obtient) return response()->json(["Message"=>"Element non trouver", "idUser"=>$idUser, "idSucces"=>$id],404);
        //return  response()->json(["Message"=>$obtient]);
        $ok = $obtient->delete();
        if ($ok) {
            return response()->json(["status" => 1, "message" => "Le succès n'est plus comptabilisé"], 201);
        } else {
            return response()->json(["status" => 0, "message" => "Erreur lors de la suppression du succès"], 400);
        }
    }
    public function succesNoter(Request $request, $id)
    {
        $pseudo = Auth::user()->pseudo;
        $noteDifficulte = NoteDifficulte::where('pseudo', $pseudo)->where('idSucces', $id)->get();
        if ($noteDifficulte == null) {
            $noteDifficulte = new NoteDifficulte;
            $noteDifficulte->pseudo = $pseudo;
            $noteDifficulte->idSucces = $id;
        }
        $noteDifficulte->note = $request->note;
        $ok = $noteDifficulte->save();
        if ($ok) {
            return response()->json(["status" => 1, "message" => "La note a été sauvegardée"], 201);
        } else {
            return response()->json(["status" => 0, "message" => "pb lors de la modification"], 400);
        }
    }

    public function addComment(Request $request, $id){
        $commentaire = new Commentaire;
        $commentaire->titre = $request->titre;
        $commentaire->content = $request->get('content');
        $commentaire->idSucces = $id;
        $commentaire->idUser = Auth::user()->id;
        $ok = $commentaire->save();
        // Get the id
        $commentaire = Commentaire::where('titre', $request->titre)->where('content', $request->get('content'))->where('idSucces', $id)->where('idUser', Auth::user()->id)->first();
        if ($ok) {
            return response()->json(["status" => 1, "message" => "Le commentaire a été ajouté","commentaire"=>$commentaire], 201);
        } else {
            return response()->json(["status" => 0, "message" => "pb lors de la modification"], 400);
        }
    }

    public function modComment(Request $request, $idcomment){
        $commentaire = Commentaire::find($idcomment);
        $commentaire->titre = $request->titre;
        $commentaire->content = $request->get('content');
        $ok = $commentaire->save();
        if ($ok) {
            return response()->json(["status" => 1, "message" => "Le commentaire a été modifié"], 201);
        } else {
            return response()->json(["status" => 0, "message" => "pb lors de la modification"], 400);
        }
    }

    public function deleteComment(Request $request,$id, $idcomment){
        $commentaire = Commentaire::find($idcomment);
        if (!isset($commentaire)) return response()->json(["status" => 0, "message" => "Le commentaire n'existe pas","idCommentaire"=>$idcomment], 400);
        if ($commentaire->idUser != Auth::user()->id) {
            return response()->json(["status" => 0, "message" => "Vous n'avez pas les droits pour supprimer ce commentaire"], 400);
        }
        $ok = $commentaire->delete();
        if ($ok) {
            return response()->json(["status" => 1, "message" => "Le commentaire a été supprimé"], 201);
        } else {
            return response()->json(["status" => 0, "message" => "pb lors de la modification"], 400);
        }
    }

    public function likeComment(Request $request, $idcomment){
        $vote = Vote::find($idcomment);
        if($vote == null){
            $vote = new Vote;
            $vote->pseudo = Auth::user()->pseudo;
            $vote->idCommentaire = $idcomment;
            $vote->up = 1;
        }else{
            $vote->up == 0 ? $vote->up == 1 : $vote->up == 0;
        }
        $ok = $vote->save();
        if ($ok) {
            return response()->json(["status" => 1, "message" => "Vote ajouté"], 201);
        } else {
            return response()->json(["status" => 0, "message" => "pb lors de la modification"], 400);
        }
    }
}
