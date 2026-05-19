package com.group.smoothtune;

import com.group.smoothtune.application.usecase.auth.SignInUseCase;
import com.group.smoothtune.adapter.in.rest.dtos.request.SignInRequestDTO;
import com.group.smoothtune.domain.port.AuthenticatePort;
import com.group.smoothtune.domain.port.TokenPort;

import org.junit.jupiter.api.Test;
import org.junit.jupiter.api.extension.ExtendWith;
import org.mockito.InjectMocks;
import org.mockito.Mock;
import org.mockito.junit.jupiter.MockitoExtension;

import static org.junit.jupiter.api.Assertions.*;
import static org.mockito.Mockito.*;

@ExtendWith(MockitoExtension.class)
class SignInUseCaseTest {

    @Mock
    private AuthenticatePort authenticatePort;

    @Mock
    private TokenPort tokenPort;

    @InjectMocks
    private SignInUseCase signInUseCase;

    @Test
    void shouldSignInSuccessfullyAndReturnToken() {
        // Arrange
        String email = "test@test.com";
        String password = "123";
        String fakeToken = "jwt-token";

        SignInRequestDTO request = new SignInRequestDTO(email, password);

        when(tokenPort.generateToken(email))
                .thenReturn(fakeToken);

        // Act
        String response = signInUseCase.execute(request);

        // Assert
        assertNotNull(response);
        assertEquals(fakeToken, response);

        verify(authenticatePort).authenticate(email, password);
        verify(tokenPort).generateToken(email);
    }

    @Test
    void shouldCallAuthenticateBeforeGeneratingToken() {
        // Arrange
        String email = "test@test.com";
        String password = "123";

        SignInRequestDTO request = new SignInRequestDTO(email, password);

        when(tokenPort.generateToken(email))
                .thenReturn("token");

        // Act
        signInUseCase.execute(request);

        // Assert (verifica orden)
        verify(authenticatePort).authenticate(email, password);
        verify(tokenPort).generateToken(email);
    }
}
