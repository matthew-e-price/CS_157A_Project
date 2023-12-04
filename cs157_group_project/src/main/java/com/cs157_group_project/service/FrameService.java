package com.cs157_group_project.service;

import com.cs157_group_project.model.Frame;
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

    public List<Frame> getAllFrames(long playedGameId) {
        return frameRepository.findByPlayedGameId(playedGameId);
    }

    public List<Frame> getAllFrames(long playerId, long gameId) {
        return frameRepository.findByPlayedGamePlayerIdAndPlayedGameGameId(playerId, gameId);
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

        return frameRepository.save(frame);
    }
}
