<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Joueur extends Model
{
    use HasFactory;

    public function user(){
        return $this->belongsTo(User::class);
    }

    public function jeu(){
        return $this->belongsTo(Jeu::class, 'idJeu', 'idJeu');
    }
    protected $table = 'Joueur';
    // primary key is the idJeu and idUser columns
    protected $primaryKey = "idJeu";


}
