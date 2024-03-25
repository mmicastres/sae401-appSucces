<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Message extends Model
{
    use HasFactory;

    public function user(){
        return $this->belongsTo(User::class);
    }
    public function conversation(){
        return $this->belongsTo(Conversation::class);
    }
    public function likes(){
        return $this->hasMany(Likes::class,"idMessage","idMessage");
    }
    protected $table = 'Message';
    protected $primaryKey = "idMessage";
}
