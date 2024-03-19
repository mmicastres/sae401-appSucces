<?php

namespace App\Console\Commands;

use App\Models\Jeu;
use Illuminate\Console\Command;

class getGameList extends Command
{
    /**
     * The name and signature of the console command.
     *
     * @var string
     */
    protected $signature = 'app:get-game-list';

    /**
     * The console command description.
     *
     * @var string
     */
    protected $description = 'Command description';

    /**
     * Execute the console command.
     */
    public function handle()
    {
        echo "Searching for games\n";
        $max = null;
        $jeu = Jeu::max('idJeu');
        if ($jeu != null) {
            $jeu = Jeu::find($jeu);
            $max = $jeu->steamId;
        }
        $ln = 0;
        $le = 0;
        echo "Max id: " . $max . "\n";
        // get the STEAM_ACCESSTOKEN from the .env file
        $accessToken = env('STEAMDB_ACCESSTOKEN');
        $url = "https://api.steampowered.com/IStoreService/GetAppList/v1/?access_token=" . $accessToken . "&include_games=true&include_dlc=false&include_software=false&include_videos=false&include_hardware=false";
        if ($max != null) {
            echo "running with maxapp id to : ".$max."\n";
            $url .= "&last_appid=" . $max;
        }
        $response = file_get_contents($url);
        $data = json_decode($response, true);
        var_dump($data["response"]);
        while (isset($data["response"]["apps"]) && count($data['response']['apps']) > 0) {

            foreach ($data['response']['apps'] as $game) {
                if ($game['appid'] > $max) {
                    $jeu = new Jeu();
                    $jeu->steamId = $game['appid'];
                    $jeu->nom = $game['name'];
                    $ok = $jeu->save();
                    if ($ok) $ln++;
                    else $le++;
                    if (!$ok) echo "Failed to add game " . $game['appid'] . " : " . $game['name'] . "\n";
                }
            }
            $jeu = Jeu::max('idJeu');
            if ($jeu != null) {
                $jeu = Jeu::find($jeu);
                $max = $jeu->steamId;
            }
            $url = "https://api.steampowered.com/IStoreService/GetAppList/v1/?access_token=" . $accessToken . "&include_games=true&include_dlc=false&include_software=false&include_videos=false&include_hardware=false";
            if ($max != null) {
                echo "running with maxapp id to : ".$max."\n";
                $url .= "&last_appid=" . $max;
            }
            $response = file_get_contents($url);
            $data = json_decode($response, true);


        }
        echo "Added " . $ln . " games\n";
        if ($ln == 0) {

            echo "No games to add\n";
            var_dump($data);
        }
        if ($le > 0) echo "Failed to add " . $le . " games\n";


    }
}
