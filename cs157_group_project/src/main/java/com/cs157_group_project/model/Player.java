package com.cs157_group_project.model;

import com.fasterxml.jackson.annotation.JsonIgnoreProperties;
import jakarta.persistence.*;
import lombok.*;

import java.time.LocalDate;
import java.util.HashSet;
import java.util.Set;

@Entity
@NoArgsConstructor
@AllArgsConstructor
@Getter
@Setter
@ToString
public class Player {

    @Id
    @GeneratedValue
    @Setter(AccessLevel.NONE)
    private Long id;

    private String name;

    private LocalDate birthday;

    @JsonIgnoreProperties("player")
    @OneToMany(mappedBy = "player", cascade = CascadeType.ALL)
    private Set<PlayedGame> playedGames = new HashSet<>();

    public void addPlayedGame(PlayedGame playedGame) {
        playedGames.add(playedGame);
    }

    public void removePlayedGame(PlayedGame playedGame) {
        playedGames.remove(playedGame);
    }

    public void clearPlayedGame() {
        playedGames.clear();
    }
}