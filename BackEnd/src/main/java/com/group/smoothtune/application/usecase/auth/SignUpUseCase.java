package com.group.smoothtune.application.usecase.auth;

import com.group.smoothtune.adapter.in.rest.dtos.response.AuthResponseDTO;
import com.group.smoothtune.adapter.in.rest.dtos.request.SignUpRequestDTO;
import com.group.smoothtune.application.usecase.User.CreateUserUseCase;
import com.group.smoothtune.application.usecase.User.FindUserByEmailUseCase;
import com.group.smoothtune.application.usecase.User.FindUserByUsernameUseCase;
import com.group.smoothtune.domain.exception.EmailAlreadyExistException;
import com.group.smoothtune.domain.exception.UsernameAlreadyExistException;
import com.group.smoothtune.domain.model.User;
import com.group.smoothtune.domain.port.AuthenticatePort;
import com.group.smoothtune.domain.port.PasswordEncoderPort;
import com.group.smoothtune.domain.port.TokenPort;
import com.group.smoothtune.domain.port.UserRepository;


//REVISAR
public class SignUpUseCase {

    private final UserRepository userRepository;
    private final FindUserByEmailUseCase findUserByEmailUseCase;
    private final FindUserByUsernameUseCase findUserByUsernameUseCase;
    private final CreateUserUseCase createUserUseCase;
    private final PasswordEncoderPort passwordEncoderPort;
    private final TokenPort tokenPort;
    private final AuthenticatePort authenticatePort;

    public SignUpUseCase(UserRepository userRepository, FindUserByEmailUseCase findUserByEmailUseCase, FindUserByUsernameUseCase findUserByUsernameUseCase, CreateUserUseCase createUserUseCase, PasswordEncoderPort passwordEncoderPort, TokenPort tokenPort, AuthenticatePort authenticatePort) {
        this.userRepository = userRepository;
        this.findUserByEmailUseCase = findUserByEmailUseCase;
        this.findUserByUsernameUseCase = findUserByUsernameUseCase;
        this.createUserUseCase = createUserUseCase;
        this.passwordEncoderPort = passwordEncoderPort;
        this.tokenPort = tokenPort;
        this.authenticatePort = authenticatePort;
    }

    public AuthResponseDTO execute(SignUpRequestDTO dto) {

        findUserByEmailUseCase.execute(dto.getEmail())
                .ifPresent(user -> {
                    throw new EmailAlreadyExistException("El Email ya registrado");
                });

        findUserByUsernameUseCase.execute(dto.getUsername())
                .ifPresent(user -> {
                    throw new UsernameAlreadyExistException("El Username ya esta en uso");
                });

        String encodedPassword = passwordEncoderPort.encode(dto.getPassword());

        User newUser = createUserUseCase.execute(
                dto.getEmail(),
                encodedPassword,
                dto.getUsername()
        );

        userRepository.save(newUser);

        authenticatePort.authenticate(
                newUser.getEmail(),
                dto.getPassword()
        );

        // 2. Generar token
        String token = tokenPort.generateToken(dto.getEmail());

        return new AuthResponseDTO(token, newUser.getId(), newUser.getUsername(), newUser.getUploadedSongs().size());
    }
}
