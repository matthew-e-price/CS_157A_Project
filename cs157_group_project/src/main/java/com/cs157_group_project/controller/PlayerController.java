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

    @GetMapping("/allPlayers")
    public ResponseEntity<List<Player>> getAllPlayers(@RequestParam(required = false) String name) {
        try {
            List<Player> players = new ArrayList<>();

            if (name != null) {
                players.addAll(playerRepository.findByNameContainingIgnoreCase(name));
            }
            else {
                players.addAll(playerRepository.findAll());
            }

            if (players.isEmpty()) {
                return new ResponseEntity<>(players, HttpStatus.NO_CONTENT);
            }

            return new ResponseEntity<>(players, HttpStatus.OK);
        }
        catch (Exception e) {
            return new ResponseEntity<>(null, HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }

    @GetMapping("/getPlayerById/{id}")
    public ResponseEntity<Player> getPlayerById(@PathVariable("id") long id) {
        Optional<Player> playerData = playerService.getPlayerById(id);
        return ResponseEntity.of(playerData);
    }

    @GetMapping("/getPlayerByEmail/{email}")
    public ResponseEntity<Player> getPlayerByEmail(@PathVariable("email") String email) {
        Optional<Player> playerData = playerService.getPlayerByEmail(email);
        return ResponseEntity.of(playerData);
    }

    @PostMapping("/addPlayer")
    public ResponseEntity<Player> createPlayer(@RequestBody Player player) {
        try {
            Player newPlayer = playerRepository.save(player);
            return new ResponseEntity<>(newPlayer, HttpStatus.CREATED);
        }
        catch (Exception e) {
            return new ResponseEntity<>(null, HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }

    @PutMapping("/players/{id}")
    public ResponseEntity<Player> updatePlayer(@PathVariable("id") long id, @RequestBody Player player) {
        Optional<Player> playerData = playerRepository.findById(id);

        if (playerData.isPresent()) {
            Player newPlayer = playerData.get();
            newPlayer.setName(player.getName());
            newPlayer.setBirthday(player.getBirthday());
            return new ResponseEntity<>(playerRepository.save(newPlayer), HttpStatus.OK);
        }
        return new ResponseEntity<>(HttpStatus.NOT_FOUND);
    }

    @DeleteMapping("/players/{id}")
    public ResponseEntity<HttpStatus> deletePlayer(@PathVariable("id") long id) {
        try {
            playerRepository.deleteById(id);
            return new ResponseEntity<>(HttpStatus.NO_CONTENT);
        } catch (Exception e) {
            return new ResponseEntity<>(HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }

    @DeleteMapping("/players")
    public ResponseEntity<HttpStatus> deleteAllPlayers() {
        try {
            playerRepository.deleteAll();
            return new ResponseEntity<>(HttpStatus.NO_CONTENT);
        } catch (Exception e) {
            return new ResponseEntity<>(HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }
}
