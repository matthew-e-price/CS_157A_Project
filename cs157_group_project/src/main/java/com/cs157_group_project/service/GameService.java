package com.cs157_group_project.service;

import com.cs157_group_project.model.Game;
import com.cs157_group_project.repository.GameRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
public class GameService {

    @Autowired
    private GameRepository gameRepository;

    public List<Game> getAllGames() {
        return gameRepository.findAll();
    }

    public Optional<Game> getGameById(long id) {
        return gameRepository.findById(id);
    }

    public Game createGame(Game game) {
        return gameRepository.save(game);
    }

    public Game updateGame(long id, Game game) {
        Optional<Game> gameData = gameRepository.findById(id);

        if (gameData.isPresent()) {
            Game newGame = gameData.get();
            newGame.setLane(game.getLane());
            newGame.setDate(game.getDate());
            newGame.setPlayers(game.getPlayers());
            return gameRepository.save(newGame);
        }
        return null;
    }

    public void deleteGame(long id) {
        gameRepository.deleteById(id);
    }

    public void deleteAllGames() {
        gameRepository.deleteAll();
    }
}
