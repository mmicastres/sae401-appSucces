<?php

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;
use App\Http\Controllers\JeuController;
use App\Http\Controllers\SuccesController;
use App\Http\Controllers\MessageController;

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

//Route::get('/login', [UserController::class, 'formLogin']);
//
//Route::post('/login', [UserController::class, 'login']);
//
//Route::get('/register', [UserController::class, 'formRegister']);
//
//Route::post('/register', [UserController::class, 'register']);

Route::get('/user/{id}', [UserController::class, 'userInfo']); // retourne aussi les succes

Route::post('/user/{id}/friend', [UserController::class, 'friendRequest']);

Route::post('/user/{id}/unfriend', [UserController::class, 'friendDelete']);

Route::put('/account/modifier', [UserController::class, 'modif']);

Route::delete('/account/delete', [UserController::class, 'deleteAccount']);

// Section jeux

Route::prefix("/jeux")->group(function () {

    Route::get('/', [JeuController::class, 'jeux']);

    Route::get('/{id}', [JeuController::class, 'jeuInfo']);

    Route::post('/{id}/favori', [JeuController::class, 'jeuFavori']);

    Route::post('/{id}/note', [JeuController::class, 'jeuNoter']);

    Route::post('/{id}/possede', [JeuController::class, 'jeuPossede']);

    Route::post('/{id}/actif', [JeuController::class, 'jeuActif']);
});

// Section succès

Route::prefix("/succes")->group(function () {

    Route::get('/{id}', [SuccesController::class, 'succesInfo']);

    Route::post('/{id}', [SuccesController::class, 'succesComplete']);

    Route::delete('/{id}', [SuccesController::class, 'succesUncomplete']);

    Route::post('/{id}/note', [SuccesController::class, 'succesNoter']);

    Route::prefix("/succes/{idsucces}/comment")->group(function (){

        Route::post('/', [SuccesController::class],"addComment");

        Route::put('/{idcomment}', [SuccesController::class],"modComment");

        Route::delete('/{idcomment}', [SuccesController::class],"deleteComment");

        Route::put('{idcomment}/like', [SuccesController::class],"likeComment");
    });
});

// Section conversation

Route::prefix("/conv")->group(function () {
    
    Route::get('/', [MessageController::class, 'listConv']);

    Route::post('/', [MessageController::class, 'newConv']);

    Route::get('/{id}', [MessageController::class, 'convContenu']);

    Route::put('/{id]', [MessageController::class, 'modifConv']);

    Route::delete('/{id}', [MessageController::class, 'deleteConv']);

    Route::post('/{id}', [MessageController::class, 'addMsg']);

    Route::delete('/{id}/{idmessage)', [MessageController::class, 'deleteMsg']);

    Route::post('/{id}/{idmessage)', [MessageController::class, 'likeMsg']);
});