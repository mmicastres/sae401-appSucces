<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Succes extends Model
{
    use HasFactory;



    protected $attributes=[
        "idSucces",
        "nom",
        "description"
    ];
}
