<?php

namespace App\Http\Controllers;

use App\Models\User;
use Illuminate\Http\Request;

class UserController extends Controller
{
    public function userInfo($id)
    {
        $user = User::with("succes")->find($id);
        return $user;
    }
}
