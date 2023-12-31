package com.cs157_group_project.service;

import com.cs157_group_project.model.Frame;
import com.cs157_group_project.model.FrameScore;
import com.cs157_group_project.model.PlayedGame;
import com.cs157_group_project.repository.FrameRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
public class FrameService {

    @Autowired
    private FrameRepository frameRepository;

    @Autowired
    private PlayedGameService playedGameService;

    @Autowired
    private FrameScoreService frameScoreService;

    public List<Frame> getAllFrames(long playedGameId) {
        return frameRepository.findByPlayedGameIdOrderByFrameNo(playedGameId);
    }

    public List<Frame> getAllFrames(long playerId, long gameId) {
        return frameRepository.findByPlayedGamePlayerIdAndPlayedGameGameIdOrderByFrameNo(playerId, gameId);
    }

    public Optional<Frame> getFrameByFrameNo(long playedGameId, int frameNo) {
        return frameRepository.findByPlayedGameIdAndFrameNo(playedGameId, frameNo);
    }

    public Optional<Frame> getFrameByFrameNo(long playerId, long gameId, int frameNo) {
        return frameRepository.findByPlayedGamePlayerIdAndPlayedGameGameIdAndFrameNo(playerId, gameId, frameNo);
    }

    public Frame createFrame(long playedGameId, Frame frame) {
        Optional<PlayedGame> optionalPlayedGame = playedGameService.getPlayedGameById(playedGameId);
        PlayedGame playedGame;
        if (optionalPlayedGame.isPresent()) {
            playedGame = optionalPlayedGame.get();
            playedGame.addFrame(frame);
            frame.setPlayedGame(playedGame);
        }
        else {
            return null;
        }

        FrameScore score = new FrameScore();
        score.setThrow1(frame.getThrow1());
        score.setThrow2(frame.getThrow2());
        score.setThrow3(frame.getThrow3());
        if (frame.getThrow3() != null){
            score.setTotal(frame.getThrow1() + frame.getThrow2() + frame.getThrow3());
        }else{
            score.setTotal(frame.getThrow1() + frame.getThrow2());
        }

        frameScoreService.createFrameScore(score);

        return frameRepository.save(frame);
    }
}
