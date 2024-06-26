<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Obtient extends Model
{
    use HasFactory;
    public function user(){
        return $this->belongsTo(User::class, "idUser","id");
    }
    public function succes(){
        return $this->belongsTo(Succes::class);
    }
    protected $table = 'Obtient';
    const UPDATED_AT = null;

}
