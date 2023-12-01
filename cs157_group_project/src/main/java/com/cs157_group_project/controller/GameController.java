package com.cs157_group_project.controller;

import com.cs157_group_project.model.Game;
import com.cs157_group_project.repository.GameRepository;
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

    @GetMapping("/games")
    public ResponseEntity<List<Game>> getAllGames() {
        try {
            List<Game> games = new ArrayList<>(gameRepository.findAll());

            if (games.isEmpty()) {
                return new ResponseEntity<>(games, HttpStatus.NO_CONTENT);
            }

            return new ResponseEntity<>(games, HttpStatus.OK);
        }
        catch (Exception e) {
            return new ResponseEntity<>(null, HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }

    @GetMapping("/games/{id}")
    public ResponseEntity<Game> getGameById(@PathVariable("id") long id) {
        Optional<Game> gameData = gameRepository.findById(id);

        if (gameData.isPresent()) {
            return new ResponseEntity<>(gameData.get(), HttpStatus.OK);
        }
        return new ResponseEntity<>(HttpStatus.NOT_FOUND);
    }

    @PostMapping("/games")
    public ResponseEntity<Game> createGame(@RequestBody Game game) {
        try {
            Game newGame = gameRepository.save(game);
            return new ResponseEntity<>(newGame, HttpStatus.CREATED);
        }
        catch (Exception e) {
            return new ResponseEntity<>(null, HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }

    @PutMapping("/games/{id}")
    public ResponseEntity<Game> updateGame(@PathVariable("id") long id, @RequestBody Game game) {
        Optional<Game> gameData = gameRepository.findById(id);

        if (gameData.isPresent()) {
            Game newGame = gameData.get();
            newGame.setLane(game.getLane());
            newGame.setDate(game.getDate());
            return new ResponseEntity<>(gameRepository.save(newGame), HttpStatus.OK);
        }
        return new ResponseEntity<>(HttpStatus.NOT_FOUND);
    }

    @DeleteMapping("/games/{id}")
    public ResponseEntity<HttpStatus> deleteGame(@PathVariable("id") long id) {
        try {
            gameRepository.deleteById(id);
            return new ResponseEntity<>(HttpStatus.NO_CONTENT);
        } catch (Exception e) {
            return new ResponseEntity<>(HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }

    @DeleteMapping("/games")
    public ResponseEntity<HttpStatus> deleteAllGames() {
        try {
            gameRepository.deleteAll();
            return new ResponseEntity<>(HttpStatus.NO_CONTENT);
        } catch (Exception e) {
            return new ResponseEntity<>(HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }
}
