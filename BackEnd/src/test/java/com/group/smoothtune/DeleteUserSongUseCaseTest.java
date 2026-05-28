package com.group.smoothtune;

import com.group.smoothtune.application.usecase.UserSong.DeleteUserSongUseCase;
import com.group.smoothtune.domain.exception.UserSongNotFoundException;
import com.group.smoothtune.domain.model.UserSong;
import com.group.smoothtune.domain.port.UserSongRepository;

import org.junit.jupiter.api.Test;
import org.junit.jupiter.api.extension.ExtendWith;
import org.mockito.InjectMocks;
import org.mockito.Mock;
import org.mockito.junit.jupiter.MockitoExtension;

import java.util.Optional;

import static org.junit.jupiter.api.Assertions.*;
import static org.mockito.Mockito.*;

@ExtendWith(MockitoExtension.class)
class DeleteUserSongUseCaseTest {

    @Mock
    private UserSongRepository userSongRepository;

    @InjectMocks
    private DeleteUserSongUseCase useCase;

    @Test
    void shouldDeleteUserSongSuccessfully() {
        // Arrange
        Long userSongId = 1L;

        when(userSongRepository.findById(userSongId))
                .thenReturn(Optional.of(mock(UserSong.class)));

        // Act
        useCase.execute(userSongId);

        // Assert
        verify(userSongRepository).deleteById(userSongId);
    }

    @Test
    void shouldThrowExceptionWhenUserSongNotFound() {
        // Arrange
        Long userSongId = 1L;

        when(userSongRepository.findById(userSongId))
                .thenReturn(Optional.empty());

        // Act & Assert
        assertThrows(UserSongNotFoundException.class, () -> {
            useCase.execute(userSongId);
        });

        verify(userSongRepository, never()).deleteById(any());
    }
}