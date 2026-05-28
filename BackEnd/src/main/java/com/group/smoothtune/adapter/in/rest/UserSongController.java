package com.group.smoothtune.adapter.in.rest;

import com.group.smoothtune.adapter.in.rest.dtos.request.UserSongRequestDTO;
import com.group.smoothtune.adapter.in.rest.dtos.response.UserSongResponseDTO;
import com.group.smoothtune.adapter.in.rest.mapper.UserSongMapper;
import com.group.smoothtune.adapter.out.persistence.entity.UserSongEntity;
import com.group.smoothtune.application.usecase.UserSong.*;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/userSong")
public class UserSongController {
    private final AddUserSongUseCase addUserSongUseCase;
    private final DeleteUserSongUseCase deleteUserSongUseCase;
    private final IncrementTimesPlayedUseCase incrementTimesPlayedUseCase;
    private final GetUserSongsUseCase getUserSongsUseCase;
    private final GetMostPlayedUserSongsUseCase getMostPlayedUserSongsUseCase;

    public UserSongController(AddUserSongUseCase addUserSongUseCase, DeleteUserSongUseCase deleteUserSongUseCase, IncrementTimesPlayedUseCase incrementTimesPlayedUseCase, GetUserSongsUseCase getUserSongsUseCase, GetMostPlayedUserSongsUseCase getMostPlayedUserSongsUseCase) {
        this.addUserSongUseCase = addUserSongUseCase;
        this.deleteUserSongUseCase = deleteUserSongUseCase;
        this.incrementTimesPlayedUseCase = incrementTimesPlayedUseCase;
        this.getUserSongsUseCase = getUserSongsUseCase;
        this.getMostPlayedUserSongsUseCase = getMostPlayedUserSongsUseCase;
    }

    @PostMapping("/addUserSong")
    public ResponseEntity<UserSongResponseDTO> addUserSong(@RequestBody UserSongRequestDTO dto){
        System.out.println("Se recibieron los siguientes valores para guardar la cancion. SongId: "+dto.getSongId()+"UserId: "+dto.getUserId());
        return ResponseEntity.status(HttpStatus.CREATED).body(UserSongMapper.toResponse(addUserSongUseCase.execute(dto.getUserId(), dto.getSongId())));
    }

    @PostMapping("/deleteUserSong/{userSongId}")
    public ResponseEntity<String> deleteUserSong(@PathVariable Long userSongId){
        deleteUserSongUseCase.execute(userSongId);
        return ResponseEntity.status(HttpStatus.OK).body("Se elimino correctamente la cancion guardada con id: "+userSongId);
    }

    @PostMapping("/incrementTimesPlayed/{userSongId}")
    public ResponseEntity<UserSongResponseDTO> incrementTimesPlayed(@PathVariable Long userSongId){
        return ResponseEntity.status(HttpStatus.OK).body(UserSongMapper.toResponse(incrementTimesPlayedUseCase.execute(userSongId)));
    }

    @GetMapping("/getUserSongsByUserId/{userId}")
    public ResponseEntity<List<UserSongResponseDTO>> getUserSongsByUserId(@PathVariable Long userId){
        return ResponseEntity.ok().body(getUserSongsUseCase.execute(userId).
                stream().
                map(UserSongMapper::toResponse).
                toList()
        );
    }

    @GetMapping("/getMostPlayedUserSongs/{userId}")
    public ResponseEntity<List<UserSongResponseDTO>> getMostPlayed(@PathVariable Long userId){
        return ResponseEntity.ok().body(getMostPlayedUserSongsUseCase.execute(userId).
                stream().
                map(UserSongMapper::toResponse).
                toList()
        );
    }

}
