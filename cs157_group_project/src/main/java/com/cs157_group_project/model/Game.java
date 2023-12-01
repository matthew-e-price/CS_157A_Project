package com.cs157_group_project.model;

import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.Id;
import lombok.*;

import java.time.LocalDate;

@Entity
@NoArgsConstructor
@AllArgsConstructor
@Getter
@Setter
@ToString
public class Game {

    @Id
    @GeneratedValue
    @Setter(AccessLevel.NONE)
    private Long id;

    private Integer lane;

    private LocalDate date;

}
