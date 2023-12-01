package com.cs157_group_project.repository;

import com.cs157_group_project.model.Game;
import org.springframework.data.jpa.repository.JpaRepository;

public interface GameRepository extends JpaRepository<Game, Long> {
}
