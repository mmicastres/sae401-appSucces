<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Jeu extends Model
{
    use HasFactory;

    public function succes(){
        return $this->hasMany(Succes::class,"idJeu");
    }
    protected $table = "Jeu";
    protected $primaryKey = "idJeu";
    public $timestamps = false;

}
