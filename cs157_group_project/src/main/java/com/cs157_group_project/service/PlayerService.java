package com.cs157_group_project.service;

import com.cs157_group_project.model.Player;
import com.cs157_group_project.repository.PlayerRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.Optional;

@Service
public class PlayerService {

    @Autowired
    private PlayerRepository playerRepository;

    public Optional<Player> getPlayerById(long id) {
        return playerRepository.findById(id);
    }

    public Player updatePlayer(long id, Player player) {
        Optional<Player> playerData = playerRepository.findById(id);

        if (playerData.isPresent()) {
            Player newPlayer = playerData.get();
            newPlayer.setName(player.getName());
            newPlayer.setBirthday(player.getBirthday());
            newPlayer.setPlayedGames(player.getPlayedGames());
            return playerRepository.save(newPlayer);
        }
        return null;
    }
}
