package com.cs157_group_project.model;

import jakarta.persistence.*;
import lombok.*;

@Entity
@Table(uniqueConstraints = @UniqueConstraint(columnNames = "throw1, throw2, throw3"))
@NoArgsConstructor
@AllArgsConstructor
@Getter
@Setter
@ToString
public class FrameScore {

    @Id
    @GeneratedValue
    @Setter(AccessLevel.NONE)
    private Long id;

    private Integer throw1;

    private Integer throw2;

    private Integer throw3;

    private Integer total;
}
