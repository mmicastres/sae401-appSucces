<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Succes extends Model
{
    use HasFactory;

    public function jeu(){
        return $this->belongsTo(Jeu::class,"idJeu", "idJeu");
    }
    public function commentaires()
    {
        return $this->hasMany(Commentaire::class);
    }

    public function detenteurs(){
        return $this->hasMany(Obtient::class,);
    }


    protected $attributes=[
        "idSucces",
        "nom",
        "description",
        "idJeu"
    ];

    protected $table ="Succes";
    protected $primaryKey = "idSucces";
}
