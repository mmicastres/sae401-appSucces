<?php

namespace App\Http\Controllers;

use App\Models\Obtient;
use App\Models\Succes;
use Illuminate\Http\Request;

class SuccesController extends Controller
{
    public function SuccesInfo(Request $request, $id){
        $succes = Succes::find($id);
        return response()->json(["message" => "OK", "succes" => $succes]);
    }

    public function succesComplete(Request $request, $id){
        $obtient = new Obtient;
        $obtient->pseudo = Auth::user()->pseudo;
        $obtient->idSucces = $id;
        // $obtient->dateTime = ;
        $ok = $obtient->save();
        if ($ok) {
            return response()->json(["status" => 1, "message" => "Le succès a été enregistré"], 201);
        } else {
            return response()->json(["status" => 0, "message" => "Erreur lors de l'ajout du succès"], 400);
        }
    }

    public function succesUncomplete(Request $request, $id){
        $pseudo = Auth::user()->pseudo;
        $succes = Obtient::where('pseudo', $pseudo)->where('idSucces', $id)->get();
        $ok = $succes->delete();
        if ($ok) {
            return response()->json(["status" => 1, "message" => "Le succès n'est plus comptabilisé"], 201);
        } else {
            return response()->json(["status" => 0, "message" => "Erreur lors de la suppression du succès"], 400);
        }
    }
}
