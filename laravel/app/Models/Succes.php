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
        return $this->hasMany(Commentaire::class,"idSucces");
    }

    public function detenteurs(){
        return $this->hasMany(Obtient::class,"idSucces");
    }


    //protected $attributes = [
    //    "iconLocked" => "defaultIconLocked",
    //    "iconUnlocked" => "defaultIconUnlocked"
    //];

    protected $fillable = [
        "nom",
        "description",
        "iconLocked",
        "iconUnlocked",
        "idJeu"
    ];
    public $timestamps = false;

    // prevent laravel from using 0,1,2,3
    protected $keyType = "string";




    protected $table ="Succes";
    protected $primaryKey = "idSucces";
}
