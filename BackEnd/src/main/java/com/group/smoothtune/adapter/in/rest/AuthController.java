package com.group.smoothtune.adapter.in.rest;

import com.group.smoothtune.adapter.in.rest.dtos.response.AuthResponseDTO;
import com.group.smoothtune.adapter.in.rest.dtos.request.SignInRequestDTO;
import com.group.smoothtune.adapter.in.rest.dtos.request.SignUpRequestDTO;
import com.group.smoothtune.application.usecase.User.FindUserByEmailUseCase;
import com.group.smoothtune.application.usecase.auth.SignInUseCase;
import com.group.smoothtune.application.usecase.auth.SignUpUseCase;
import com.group.smoothtune.domain.exception.UserNotFoundException;
import com.group.smoothtune.domain.model.User;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api/auth")
public class AuthController {

    private final SignInUseCase signInUseCase;
    private final SignUpUseCase signUpUseCase;
    private final FindUserByEmailUseCase findUserByEmailUseCase;

    public AuthController(SignInUseCase signInUseCase, SignUpUseCase signUpUseCase, FindUserByEmailUseCase findUserByEmailUseCase) {
        this.signInUseCase = signInUseCase;
        this.signUpUseCase = signUpUseCase;
        this.findUserByEmailUseCase = findUserByEmailUseCase;
    }

    @PostMapping({"/signin", "/signIn"})
    public ResponseEntity<AuthResponseDTO> signIn(@RequestBody SignInRequestDTO request) {
        String token = signInUseCase.execute(request);
        User user = findUserByEmailUseCase.execute(request.email()).orElseThrow(()->new UserNotFoundException("No se encontro el usuario con email: "+request.email()));
        AuthResponseDTO response = new AuthResponseDTO(
                token,
                user.getId(),
                user.getUsername(),
                user.getUploadedSongs().size()
        );
        return ResponseEntity.ok(response);
    }

    @PostMapping({"/signup", "/signUp"})
    public ResponseEntity<AuthResponseDTO> signUp(@RequestBody SignUpRequestDTO request) {
        AuthResponseDTO response = signUpUseCase.execute(request);
        return ResponseEntity.ok(response);
    }
}
