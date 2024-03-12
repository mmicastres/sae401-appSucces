<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Joueur extends Model
{
    use HasFactory;


    public function user(){
        return $this->belongsTo(Utilisateur::class);
    }

    public function jeu(){
        return $this->belongsTo(Jeu::class);
    }
}
