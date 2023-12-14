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
public class Game {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Setter(AccessLevel.NONE)
    private Long id;

    private Integer lane;

    private LocalDate date;

    @JsonIgnoreProperties("game")
    @OneToMany(mappedBy = "game", cascade = CascadeType.ALL)
    private Set<PlayedGame> players = new HashSet<>();



    public void addPlayedGame(PlayedGame playedGame) {
        players.add(playedGame);
    }

    public void removePlayedGame(PlayedGame playedGame) {
        players.remove(playedGame);
    }
}
