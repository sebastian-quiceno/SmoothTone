package com.group.smoothtune.application.usecase.UserSong;

import com.group.smoothtune.domain.exception.UserNotFoundException;
import com.group.smoothtune.domain.exception.UserSongNotFoundException;
import com.group.smoothtune.domain.model.UserSong;
import com.group.smoothtune.domain.port.UserSongRepository;

public class DeleteUserSongUseCase {

    private final UserSongRepository userSongRepository;

    public DeleteUserSongUseCase(UserSongRepository userSongRepository) {
        this.userSongRepository = userSongRepository;
    }

    public void execute(Long userSongId) {

        userSongRepository.findById(userSongId).orElseThrow(()-> new UserSongNotFoundException("No se encontro la cancion guardada con el ID: "+userSongId));

        userSongRepository.deleteById(userSongId);
    }
}
