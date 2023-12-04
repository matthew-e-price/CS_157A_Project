package com.cs157_group_project.service;

import com.cs157_group_project.model.FrameScore;
import com.cs157_group_project.repository.FrameScoreRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.Optional;

@Service
public class FrameScoreService {

    @Autowired
    private FrameScoreRepository frameScoreRepository;

    public Optional<FrameScore> getFrameScoreByThrows(Integer throw1, Integer throw2, Integer throw3) {
        return frameScoreRepository.findByThrow1AndThrow2AndThrow3(throw1, throw2, throw3);
    }

    public FrameScore createFrameScore(FrameScore frameScore) {
        return frameScoreRepository.save(frameScore);
    }

}
