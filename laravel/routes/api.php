<?php

use App\Http\Controllers\UserController;
use App\Http\Requests\Auth\LoginRequest;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Route;
use App\Http\Controllers\JeuController;
use App\Http\Controllers\SuccesController;
use App\Http\Controllers\MessageController;
use App\Http\Controllers\ProfileController;
use BeyondCode\LaravelWebSockets\Facades\WebSocketsRouter;

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

Route::middleware('auth:sanctum')->get('/me', function (Request $request) {
    return $request->user();
});


Route::post('/login',[UserController::class, 'login']);

Route::post("/logout",function (Request $request){
    Auth::logout();
    return response()->json(["status" => 1, "message" => "Vous avez été déconnecté"], 204);
});

Route::post("/register", [UserController::class, 'register']);

// Route de base

Route::get('/', [Controller::class, 'homepage']);

// Section connexion et utilisateurs

Route::get('/user/{id}', [UserController::class, 'userInfo']); // retourne aussi les succes

Route::middleware('auth:sanctum')->post('/user/{id}/friend', [UserController::class, 'friendRequest']);

Route::middleware('auth:sanctum')->post('user/{id}/profilepicture', [UserController::class, 'profilePicture']);

Route::middleware('auth:sanctum')->get('/account/modifier', [ProfileController::class, 'edit']);

Route::middleware('auth:sanctum')->put('/account/modifier', [ProfileController::class, 'update']);

Route::middleware('auth:sanctum')->delete('/account/delete', [ProfileController::class, 'destroy']);

// Section jeux

Route::prefix("/jeux")->group(function () {

    Route::get('/', [JeuController::class, 'jeux']);

    Route::get('/{id}', [JeuController::class, 'jeuInfo']);

    Route::middleware('auth:sanctum')->post('/{id}/favori', [JeuController::class, 'jeuFavori']);

    Route::middleware('auth:sanctum')->post('/{id}/note', [JeuController::class, 'jeuNoter']);

    Route::middleware('auth:sanctum')->post('/{id}/possede', [JeuController::class, 'jeuPossede']);

    Route::middleware('auth:sanctum')->post('/{id}/actif', [JeuController::class, 'jeuActif']);
});

// Section succès

Route::prefix("/succes")->group(function () {

    Route::get('/{id}', [SuccesController::class, 'succesInfo']);

    Route::middleware('auth:sanctum')->post('/{id}', [SuccesController::class, 'succesComplete']);

    Route::middleware('auth:sanctum')->delete('/{id}', [SuccesController::class, 'succesUncomplete']);

    Route::middleware('auth:sanctum')->post('/{id}/note', [SuccesController::class, 'succesNoter']);

    Route::middleware('auth:sanctum')->prefix("/{id}/comment")->group(function (){

        Route::post('/', [SuccesController::class,"addComment"]);

        Route::put('/{idcomment}', [SuccesController::class,"modComment"]);

        Route::delete('/{idcomment}', [SuccesController::class,"deleteComment"]);

        Route::put('{idcomment}/like', [SuccesController::class,"likeComment"]);
    });
});

// Section conversation

Route::middleware('auth:sanctum')->prefix("/conv")->group(function () {

    Route::get('/', [MessageController::class, 'listConv']);

    Route::post('/', [MessageController::class, 'newConv']);

    Route::get('/{id}', [MessageController::class, 'convContenu']);

    Route::put('/{id}', [MessageController::class, 'modifConv']);

    Route::delete('/{id}', [MessageController::class, 'deleteConv']);

    Route::post('/{id}', [MessageController::class, 'addMsg']);

    Route::delete('/{id}/{idmessage}', [MessageController::class, 'deleteMsg']);

    Route::post('/{id}/{idmessage}', [MessageController::class, 'likeMsg']);
});

