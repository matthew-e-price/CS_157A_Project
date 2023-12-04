package com.cs157_group_project.controller;

import com.cs157_group_project.model.FrameScore;
import com.cs157_group_project.service.FrameScoreService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/api")
public class FrameScoreController {

    @Autowired
    private FrameScoreService frameScoreService;

//    @GetMapping
//    public ResponseEntity<FrameScore> getFrameScoreByThrows(Integer throw1, Integer throw2, Integer throw3) {}

}
