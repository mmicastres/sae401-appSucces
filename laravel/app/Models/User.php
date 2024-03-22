<?php

namespace App\Models;

// use Illuminate\Contracts\Auth\MustVerifyEmail;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Foundation\Auth\User as Authenticatable;
use Illuminate\Notifications\Notifiable;
use Laravel\Sanctum\HasApiTokens;

class User extends Authenticatable
{
    use HasApiTokens, HasFactory, Notifiable;

    public function succes(){
        return $this->belongsToMany(Succes::class, 'Obtient','idUser','idSucces');
    }
    public function friends1() {
        return $this->belongsToMany(User::class, 'FriendTable', 'destinataire', 'demandeur')->where("accepter",1);
    }
    public function friends2() {
        return $this->belongsToMany(User::class, 'FriendTable', 'demandeur', 'destinataire')->where("accepter",1);
    }

    public function friendRequests() {
        // get the Users that have sent a friend request to the current User
        return $this->belongsToMany(User::class, 'FriendTable', 'destinataire', 'demandeur')->where("accepter",0);

    }
    public function friendRequestsSent() {
        // get the Users that the current User has sent a friend request to
        return $this->belongsToMany(User::class, 'FriendTable', 'demandeur', 'destinataire')->where("accepter",0);
    }

    public function conversations()
    {
        return $this->belongsToMany(Conversation::class, 'Participe', 'userId', 'idConv');
    }

    /**
     * The attributes that are mass assignable.
     *
     * @var array<int, string>
     */
    protected $fillable = [
        'pseudo',
        'nom',
        'prenom',
        'email',
        'password',
    ];

    /**
     * The attributes that should be hidden for serialization.
     *
     * @var array<int, string>
     */
    protected $hidden = [
        'password',
        'remember_token',
        'email_verified_at'
    ];


    /**
     * The attributes that should be cast.
     *
     * @var array<string, string>
     */
    protected $casts = [
        'email_verified_at' => 'datetime',
        'password' => 'hashed',
    ];
}
