package com.cs157_group_project.repository;

import com.cs157_group_project.model.FrameScore;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;
import java.util.Optional;

public interface FrameScoreRepository extends JpaRepository<FrameScore, Long> {
    Optional<FrameScore> findByThrow1AndThrow2IsNullAndThrow3IsNull(Integer throw1);
    Optional<FrameScore> findByThrow1AndThrow2AndThrow3IsNull(Integer throw1, Integer throw2);
    Optional<FrameScore> findByThrow1AndThrow2AndThrow3(Integer throw1, Integer throw2, Integer throw3);
}
