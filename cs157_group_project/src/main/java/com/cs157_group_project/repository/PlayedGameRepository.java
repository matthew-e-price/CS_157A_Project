package com.cs157_group_project.repository;

import com.cs157_group_project.model.PlayedGame;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;
import java.util.Optional;

public interface PlayedGameRepository extends JpaRepository<PlayedGame, Long> {
    List<PlayedGame> findTop10ByScore(int score);
    List<PlayedGame> findByPlayerId(long id);
    List<PlayedGame> findByGameId(long id);
    Optional<PlayedGame> findByPlayerIdAndGameId(long playerId, long gameId);
    void deleteByGameId(long id);
    void deleteByPlayerId(long id);
    void deleteByPlayerIdAndGameId(long playerId, long gameId);
}
