package com.cs157_group_project.repository;

import com.cs157_group_project.model.Player;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;

import java.util.List;
import java.util.Optional;

public interface PlayerRepository extends JpaRepository<Player, Long> {
    List<Player> findByNameContainingIgnoreCase(String name);

    @Query(value = "SELECT * FROM Player WHERE email = ?1", nativeQuery = true)
    Optional<Player> findByEmail(String email);


}
