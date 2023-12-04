package com.cs157_group_project.controller;

import com.cs157_group_project.model.Game;
import com.cs157_group_project.model.PlayedGame;
import com.cs157_group_project.model.Player;
import com.cs157_group_project.repository.PlayedGameRepository;
import com.cs157_group_project.service.GameService;
import com.cs157_group_project.service.PlayedGameService;
import com.cs157_group_project.service.PlayerService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.ArrayList;
import java.util.List;
import java.util.Optional;

@RestController
@RequestMapping("/api")
public class PlayedGameController {

    @Autowired
    private PlayedGameRepository playedGameRepository;

    @Autowired
    private PlayedGameService playedGameService;

    @Autowired
    private GameService gameService;

    @Autowired
    private PlayerService playerService;

    @GetMapping("/played_games")
    public ResponseEntity<List<PlayedGame>> getAllPlayedGames() {
        try {
            List<PlayedGame> playedGames = new ArrayList<>(playedGameService.getAllPlayedGames());
            return ResponseEntity.ok(playedGames);
        }
        catch (Exception e) {
            return ResponseEntity.internalServerError().build();
        }
    }

    @GetMapping("/played_games/players/{id}")
    public ResponseEntity<List<PlayedGame>> getPlayedGamesByPlayerId(@PathVariable("id") long id) {
        try {
            List<PlayedGame> playedGames = new ArrayList<>(playedGameService.getPlayedGameByPlayerId(id));
            return ResponseEntity.ok(playedGames);
        }
        catch (Exception e) {
            return ResponseEntity.internalServerError().build();
        }
    }

    @GetMapping("/played_games/games/{id}")
    public ResponseEntity<List<PlayedGame>> getPlayedGamesByGameId(@PathVariable("id") long id) {
        try {
            List<PlayedGame> playedGames = new ArrayList<>(playedGameService.getPlayedGameByGameId(id));
            return ResponseEntity.ok(playedGames);
        }
        catch (Exception e) {
            return ResponseEntity.internalServerError().build();
        }
    }

    @GetMapping({ "/players/{player_id}/games/{game_id}", "/games/{game_id}/players/{player_id}" })
    public ResponseEntity<PlayedGame> getPlayedGameByPlayerIdAndGameId(@PathVariable("player_id") long playerId,
                                                                       @PathVariable("game_id") long gameId) {
        Optional<PlayedGame> playedGame = playedGameService.getPlayedGameByPlayerIdAndGameId(playerId, gameId);
        return ResponseEntity.of(playedGame);
    }

    @GetMapping("/played_games/{id}")
    public ResponseEntity<PlayedGame> getPlayedGameById(@PathVariable("id") long id) {
        Optional<PlayedGame> playedGame = playedGameService.getPlayedGameById(id);
        return ResponseEntity.of(playedGame);
    }

    @PostMapping("/played_games")
    public ResponseEntity<PlayedGame> CreatePlayedGame(@RequestBody PlayedGame playedGame) {
        try {
            PlayedGame newPlayedGame = playedGameService.createPlayedGame(playedGame);
            if (newPlayedGame != null) {
                return new ResponseEntity<>(newPlayedGame, HttpStatus.CREATED);
            }
            return ResponseEntity.notFound().build();
        }
        catch (Exception e) {
            e.printStackTrace();
            return ResponseEntity.internalServerError().build();
        }
    }

    // TODO: Delete doesn't work. If you need to delete a playedGame, do it in the h2 console, it works there
    // localhost:8080/h2-console
    @DeleteMapping("/played_games/players/{id}")
    public ResponseEntity<HttpStatus> deletePlayedGamesByPlayerId(@PathVariable("id") long id) {
        try {
            playedGameService.deletePlayedGamesByPlayerId(id);
            return ResponseEntity.noContent().build();
        }
        catch (Exception e) {
            e.printStackTrace();
            return ResponseEntity.internalServerError().build();
        }
    }

    @DeleteMapping("/played_games/games/{id}")
    public ResponseEntity<HttpStatus> deletePlayedGamesByGameId(@PathVariable("id") long id) {
        try {
            playedGameService.deletePlayedGamesByGameId(id);
            return ResponseEntity.noContent().build();
        }
        catch (Exception e) {
            e.printStackTrace();
            return ResponseEntity.internalServerError().build();
        }
    }

    @DeleteMapping({ "/players/{player_id}/games/{game_id}", "/games/{game_id}/players/{player_id}" })
    public ResponseEntity<HttpStatus> deletePlayedGameByPlayerIdAndGameId(@PathVariable("player_id") long playerId,
                                                                          @PathVariable("game_id") long gameId) {
        try {
            playedGameService.deletePlayedGamesByPlayerIdAndGameId(playerId, gameId);
            return ResponseEntity.noContent().build();
        }
        catch (Exception e) {
            e.printStackTrace();
            return ResponseEntity.internalServerError().build();
        }
    }
}
