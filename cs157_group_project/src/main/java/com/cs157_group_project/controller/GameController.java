package com.cs157_group_project.controller;

import com.cs157_group_project.model.Game;
import com.cs157_group_project.repository.GameRepository;
import com.cs157_group_project.service.GameService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.ArrayList;
import java.util.List;
import java.util.Optional;

@RestController
@RequestMapping("/api")
public class GameController {

    @Autowired
    private GameRepository gameRepository;

    @Autowired
    private GameService gameService;

    @GetMapping("/games")
    public ResponseEntity<List<Game>> getAllGames() {
        try {
            List<Game> games = new ArrayList<>(gameService.getAllGames());
            return ResponseEntity.ok(games);
        }
        catch (Exception e) {
            return ResponseEntity.internalServerError().build();
        }
    }

    @GetMapping("/games/{id}")
    public ResponseEntity<Game> getGameById(@PathVariable("id") long id) {
        Optional<Game> gameData = gameService.getGameById(id);
        return ResponseEntity.of(gameData);
    }

    @PostMapping("/games")
    public ResponseEntity<Game> createGame(@RequestBody Game game) {
        try {
            Game newGame = gameService.createGame(game);
            return new ResponseEntity<>(newGame, HttpStatus.CREATED);
        }
        catch (Exception e) {
            return ResponseEntity.internalServerError().build();
        }
    }

    @PutMapping("/games/{id}")
    public ResponseEntity<Game> updateGame(@PathVariable("id") long id, @RequestBody Game game) {
        Game newGame = gameService.updateGame(id, game);

        if (newGame != null) {
            return ResponseEntity.ok(newGame);
        }
        return ResponseEntity.notFound().build();
    }

    @DeleteMapping("/games/{id}")
    public ResponseEntity<HttpStatus> deleteGame(@PathVariable("id") long id) {
        try {
            gameService.deleteGame(id);
            return ResponseEntity.noContent().build();
        } catch (Exception e) {
            return ResponseEntity.internalServerError().build();
        }
    }

    @DeleteMapping("/games")
    public ResponseEntity<HttpStatus> deleteAllGames() {
        try {
            gameService.deleteAllGames();
            return ResponseEntity.noContent().build();
        } catch (Exception e) {
            return ResponseEntity.internalServerError().build();
        }
    }
}
