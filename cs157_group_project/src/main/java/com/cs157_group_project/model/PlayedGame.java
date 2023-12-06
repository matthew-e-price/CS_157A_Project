package com.cs157_group_project.model;

import com.fasterxml.jackson.annotation.JsonIgnoreProperties;
import jakarta.persistence.*;
import lombok.*;

import java.util.Set;

@Entity
@Table(uniqueConstraints = @UniqueConstraint(columnNames = {"player_id", "game_id"}))
@NoArgsConstructor
@AllArgsConstructor
@Getter
@Setter
@ToString
@EqualsAndHashCode
public class PlayedGame {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Setter(AccessLevel.NONE)
    private Long id;

    private Integer score;

    @ToString.Exclude
    @JsonIgnoreProperties("playedGames")
    @ManyToOne(cascade = CascadeType.ALL)
    @JoinColumn
    private Player player;

    @ToString.Exclude
    @JsonIgnoreProperties("players")
    @ManyToOne(cascade = CascadeType.ALL)
    @JoinColumn
    private Game game;

    @JsonIgnoreProperties("playedGame")
    @OneToMany(mappedBy = "playedGame", cascade = CascadeType.ALL)
    private Set<Frame> frames;

    @ToString.Include(name = "player_id")
    private String getPlayerId() {
        return "" + player.getId();
    }

    @ToString.Include(name = "game_id")
    private String getGameId() {
        return "" + game.getId();
    }

    public void addFrame(Frame frame) {
        frames.add(frame);
    }
}
