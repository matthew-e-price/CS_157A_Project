package com.cs157_group_project.model;

import com.fasterxml.jackson.annotation.JsonIgnoreProperties;
import jakarta.persistence.*;
import jakarta.persistence.criteria.CriteriaBuilder;
import lombok.*;

@Entity
@Table(uniqueConstraints = @UniqueConstraint(columnNames = { "played_game_id", "frame_no" }))
@NoArgsConstructor
@AllArgsConstructor
@Getter
@Setter
@ToString
public class Frame {

    @Id
    @GeneratedValue
    @Setter(AccessLevel.NONE)
    private Long id;

    @Column(name = "frame_no")
    private Integer frameNo;

    private Integer throw1;

    private Integer throw2;

    private Integer throw3;

    @ToString.Exclude
    @JsonIgnoreProperties("frames")
    @ManyToOne(cascade = CascadeType.ALL)
    @JoinColumn(name = "played_game_id")
    private PlayedGame playedGame;

    @ToString.Include(name = "played_game_id")
    private String getPlayedGameId() {
        return "" + playedGame.getId();
    }
}
