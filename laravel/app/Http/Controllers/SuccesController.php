<?php

namespace App\Http\Controllers;

use App\Models\Succes;
use Illuminate\Http\Request;

class SuccesController extends Controller
{
    //
    public function succes(Request $request){

    }
    public function succesInfo(Request $request, $id){
        $succes = Succes::with("jeu")->find($id);
        return response()->json(["Message"=>"OK","succes" => $succes]);
    }
    public function succesComplete(Request $request, $id){

    }
    public function succesUnComplete(Request $request, $id){

    }
    public function succesNoter(Request $request, $id){

    }
}
