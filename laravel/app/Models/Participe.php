<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Participe extends Model
{
    use HasFactory;
    public function user(){
        return $this->belongsTo(User::class);
    }
    public function conversation(){
        return $this->belongsTo(Conversation::class);
    }
    protected $table = 'Participe';
    // disable date
    public $timestamps = false;
}
