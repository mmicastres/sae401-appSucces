<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Vote extends Model
{
    use HasFactory;
    public function commentaire(){
        return $this->belongsTo(Commentaire::class);
    }

    public function user(){
        return $this->belongsTo(User::class);
    }
    protected $table = 'Vote';
    protected $primaryKey = 'idCommentaire';
    public $timestamps = false;
}
