<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Thiagoprz\CompositeKey\HasCompositeKey;

class Joueur extends Model
{
    use HasFactory;
    use HasCompositeKey;

    public function user(){
        return $this->belongsTo(User::class);
    }

    public function jeu(){
        return $this->belongsTo(Jeu::class);
    }
    protected $table = 'Joueur';
    // primary key is the idJeu and idUser columns
    protected $primaryKey = "idJeu";


}
