package com.cs157_group_project.repository;

import com.cs157_group_project.model.Player;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;

public interface PlayerRepository extends JpaRepository<Player, Long> {
    List<Player> findByNameContainingIgnoreCase(String name);
}
