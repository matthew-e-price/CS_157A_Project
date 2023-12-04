package com.cs157_group_project.controller;

import com.cs157_group_project.model.Frame;
import com.cs157_group_project.service.FrameService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.ArrayList;
import java.util.List;
import java.util.Optional;

@RestController
@RequestMapping("/api")
public class FrameController {

    @Autowired
    FrameService frameService;

    @GetMapping("/played_games/{id}/frames")
    public ResponseEntity<List<Frame>> getAllFrames(@PathVariable("id") long playedGameId) {
        try {
            List<Frame> frames = new ArrayList<>(frameService.getAllFrames(playedGameId));
            return ResponseEntity.ok(frames);
        }
        catch (Exception e) {
            e.printStackTrace();
            return ResponseEntity.internalServerError().build();
        }
    }

    @GetMapping({ "/players/{player_id}/games/{game_id}/frames", "/games/{game_id}/players/{player_id}/frames" })
    public ResponseEntity<List<Frame>> getAllFrames(@PathVariable("player_id") long playerId,
                                                    @PathVariable("game_id") long gameId) {
        try {
            List<Frame> frames = new ArrayList<>(frameService.getAllFrames(playerId, gameId));
            return ResponseEntity.ok(frames);
        }
        catch (Exception e) {
            e.printStackTrace();
            return ResponseEntity.internalServerError().build();
        }
    }

    @GetMapping("/played_games/{id}/frames/{no}")
    public ResponseEntity<Frame> getFrameByFrameNo(@PathVariable("id") long playedGameId,
                                                   @PathVariable("no") int frameNo) {
        Optional<Frame> frame = frameService.getFrameByFrameNo(playedGameId, frameNo);
        return ResponseEntity.of(frame);
    }

    @GetMapping({ "/players/{player_id}/games/{game_id}/frames/{no}",
                "/games/{game_id}/players/{player_id}/frames/{no}" })
    public ResponseEntity<Frame> getFrameByFrameNo(@PathVariable("player_id") long playerId,
                                                   @PathVariable("game_id") long gameId,
                                                   @PathVariable("no") int frameNo) {
        Optional<Frame> frame = frameService.getFrameByFrameNo(playerId, gameId, frameNo);
        return ResponseEntity.of(frame);
    }

    @PostMapping("/played_games/{id}/frames")
    public ResponseEntity<Frame> createFrame(@PathVariable("id") long playedGameId, @RequestBody Frame frame) {
        try {
            Frame newFrame = frameService.createFrame(playedGameId, frame);
            if (newFrame != null) {
                return new ResponseEntity<>(frame, HttpStatus.CREATED);
            }
            return ResponseEntity.notFound().build();
        }
        catch (Exception e) {
            e.printStackTrace();
            return ResponseEntity.internalServerError().build();
        }
    }
}
