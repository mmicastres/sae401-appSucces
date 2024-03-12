<?php

namespace App\Http\Controllers;

use App\Models\Jeu;
use Illuminate\Http\Request;
class JeuController extends Controller
{
    //
    function jeux(Request $request ){
        $jeux = Jeu::all();
        return response()->json(["message"=>"OK","jeux"=>$jeux]);
    }
    function jeuInfo(Request $request,$id ){
        $jeux = Jeu::with("succes")->find($id);
        return response()->json(["message"=>"OK","jeu"=>$jeux]);
    }

}
