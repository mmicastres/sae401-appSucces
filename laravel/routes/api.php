<?php

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;

/*
|--------------------------------------------------------------------------
| API Routes
|--------------------------------------------------------------------------
|
| Here is where you can register API routes for your application. These
| routes are loaded by the RouteServiceProvider and all of them will
| be assigned to the "api" middleware group. Make something great!
|
*/

Route::middleware('auth:sanctum')->get('/user', function (Request $request) {
    return $request->user();
});

// Route de base

Route::get('/', [Controller::class, 'homepage']);

// Section connexion et utilisateurs

Route::get('/login', [UserController::class, 'formLogin']);

Route::post('/login', [UserController::class, 'login']);

Route::get('/register', [UserController::class, 'formRegister']);

Route::post('/register', [UserController::class, 'register']);

Route::get('/user/{id}', [UserController::class, 'userInfo']);

Route::get('/user/{id}/request', [UserController::class, 'friendRequest']);

Route::get('/user/{id}/unfriend', [UserController::class, 'friendDelete']);

Route::get('/account/modifier', [UserController::class, 'formModif']);

Route::put('/account/modifier', [UserController::class, 'modif']);

Route::delete('/account/delete', [UserController::class, 'deleteAccount']);

// Section jeux

Route::get('/jeux', [GameController::class, 'jeux']);

Route::get('/jeux/{id}', [GameController::class, 'jeuInfo']);

Route::get('/jeux/{id}/favori', [GameController::class, 'jeuFavori']);

Route::post('/jeux/{id}/note', [GameController::class, 'jeuNoter']);

Route::post('/jeux/{id}/possede', [GameController::class, 'jeuPossede']);

Route::post('/jeux/{id}/actif', [GameController::class, 'jeuActif']);

// Section succès

Route::get('/succes', [SuccesController::class, 'succes']);

Route::get('/succes/{id}', [SuccesController::class, 'succesInfo']);

Route::post('/succes/{id}', [SuccesController::class, 'succesAdd']);

Route::delete('/succes/{id}', [SuccesController::class, 'succesDelete']);

Route::post('/succes/{id}/note', [SuccesController::class, 'succesNoter']);

// Section commentaires

//Route::post('/succes/{id}/comment', [CommentController])
