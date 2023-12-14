package com.cs157_group_project.repository;

import com.cs157_group_project.model.Frame;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;
import java.util.Optional;

public interface FrameRepository extends JpaRepository<Frame, Long> {
    Optional<Frame> findByPlayedGameIdAndFrameNo(long id, int frameNo);
    Optional<Frame> findByPlayedGamePlayerIdAndPlayedGameGameIdAndFrameNo(long playerId, long gameId, int frameNo);
    List<Frame> findByPlayedGameIdOrderByFrameNo(long id);
    List<Frame> findByPlayedGamePlayerIdAndPlayedGameGameIdOrderByFrameNo(long playerId, long gameId);
}
