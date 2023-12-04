package com.cs157_group_project.controller;

import com.cs157_group_project.model.Player;
import com.cs157_group_project.repository.PlayerRepository;
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
public class PlayerController {

    @Autowired
    private PlayerRepository playerRepository;
    @Autowired
    private PlayerService playerService;

    @GetMapping("/players")
    public ResponseEntity<List<Player>> getAllPlayers(@RequestParam(required = false) String name) {
        try {
            List<Player> players = new ArrayList<>();

            if (name != null) {
                players.addAll(playerRepository.findByNameContainingIgnoreCase(name));
            }
            else {
                players.addAll(playerRepository.findAll());
            }

            return ResponseEntity.ok(players);
        }
        catch (Exception e) {
            return ResponseEntity.internalServerError().build();
        }
    }

    @GetMapping("/players/{id}")
    public ResponseEntity<Player> getPlayerById(@PathVariable("id") long id) {
        Optional<Player> playerData = playerService.getPlayerById(id);
        return ResponseEntity.of(playerData);
    }

    @PostMapping("/players")
    public ResponseEntity<Player> createPlayer(@RequestBody Player player) {
        try {
            Player newPlayer = playerRepository.save(player);
            return new ResponseEntity<>(newPlayer, HttpStatus.CREATED);
        }
        catch (Exception e) {
            return ResponseEntity.internalServerError().build();
        }
    }

    @PutMapping("/players/{id}")
    public ResponseEntity<Player> updatePlayer(@PathVariable("id") long id, @RequestBody Player player) {
        Player newPlayer = playerService.updatePlayer(id, player);

        if (newPlayer != null) {
            return ResponseEntity.ok(playerRepository.save(newPlayer));
        }
        return ResponseEntity.notFound().build();
    }

    @DeleteMapping("/players/{id}")
    public ResponseEntity<HttpStatus> deletePlayer(@PathVariable("id") long id) {
        try {
            playerRepository.deleteById(id);
            return ResponseEntity.noContent().build();
        }
        catch (Exception e) {
            return ResponseEntity.internalServerError().build();
        }
    }

    @DeleteMapping("/players")
    public ResponseEntity<HttpStatus> deleteAllPlayers() {
        try {
            playerRepository.deleteAll();
            return ResponseEntity.noContent().build();
        }
        catch (Exception e) {
            return ResponseEntity.internalServerError().build();
        }
    }
}
