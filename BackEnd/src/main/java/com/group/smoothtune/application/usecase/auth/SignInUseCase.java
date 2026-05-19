package com.group.smoothtune.application.usecase.auth;

import com.group.smoothtune.adapter.in.rest.dtos.request.SignInRequestDTO;
import com.group.smoothtune.domain.port.AuthenticatePort;
import com.group.smoothtune.domain.port.TokenPort;

public class SignInUseCase {

    private final AuthenticatePort authenticatePort;
    private final TokenPort tokenPort;

    public SignInUseCase(AuthenticatePort authenticatePort, TokenPort tokenPort) {
        this.authenticatePort = authenticatePort;
        this.tokenPort = tokenPort;
    }

    public String execute(SignInRequestDTO dto) {

        authenticatePort.authenticate(dto.email(), dto.password());

        return tokenPort.generateToken(dto.email());
    }
}