package com.cs157_group_project.service;

import com.cs157_group_project.model.Game;
import com.cs157_group_project.model.PlayedGame;
import com.cs157_group_project.model.Player;
import com.cs157_group_project.repository.PlayedGameRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
public class PlayedGameService {

    @Autowired
    private PlayedGameRepository playedGameRepository;

    @Autowired
    private GameService gameService;

    @Autowired
    private PlayerService playerService;

    public List<PlayedGame> getAllPlayedGames() {
        return playedGameRepository.findAll();
    }

    public List<PlayedGame> getPlayedGamesByPlayerId(long id) {
        return playedGameRepository.findByPlayerId(id);
    }

    public List<PlayedGame> getPlayedGamesByGameId(long id) {
        return playedGameRepository.findByGameId(id);
    }

    public List<PlayedGame> getPlayedGameByTopScore() {
        return playedGameRepository.findAllByOrderByScoreDesc();
    }

    public Optional<PlayedGame> getPlayedGameById(long id) {
        return playedGameRepository.findById(id);
    }

    public Optional<PlayedGame> getPlayedGameByPlayerIdAndGameId(long playerId, long gameId) {
        return playedGameRepository.findByPlayerIdAndGameId(playerId, gameId);
    }

    public PlayedGame createPlayedGame(PlayedGame playedGame) {
        Optional<Player> optionalPlayer = playerService.getPlayerById(playedGame.getPlayer().getId());
        Player player;
        if (optionalPlayer.isPresent()) {
            player = optionalPlayer.get();
            player.addPlayedGame(playedGame);
            playedGame.setPlayer(player);
        }
        else {
            return null;
        }

        Optional<Game> optionalGame = gameService.getGameById(playedGame.getGame().getId());
        Game game;
        if (optionalGame.isPresent()) {
            game = optionalGame.get();
            game.addPlayedGame(playedGame);
            playedGame.setGame(game);
        }
        else {
            return null;
        }

        return playedGameRepository.save(playedGame);
    }

    // TODO: Delete doesn't work. If you need to delete a playedGame, do it in the h2 console, it works there
    // localhost:8080/h2-console
    public void deletePlayedGamesByPlayerId(long id) {
        Optional<Player> optionalPlayer = playerService.getPlayerById(id);
        Player player;
        if (optionalPlayer.isPresent()) {
            player = optionalPlayer.get();
            player.clearPlayedGame();
        }
        playedGameRepository.deleteByPlayerId(id);
    }

    public void deletePlayedGamesByGameId(long id) {
        playedGameRepository.deleteByGameId(id);
    }

    public void deletePlayedGamesByPlayerIdAndGameId(long player_id, long game_id) {
        playedGameRepository.deleteByPlayerIdAndGameId(player_id, game_id);
    }
}
