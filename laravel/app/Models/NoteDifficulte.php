<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class NoteDifficulte extends Model
{
    use HasFactory;
    public function succes(){
        return $this->belongsTo(Succes::class);
    }

    public function user(){
        return $this->belongsTo(User::class);
    }
    protected $table = 'NoteDifficulté';
}
