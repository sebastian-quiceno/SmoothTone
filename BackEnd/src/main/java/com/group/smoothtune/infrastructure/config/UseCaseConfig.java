package com.group.smoothtune.infrastructure.config;

import com.group.smoothtune.application.usecase.Artist.CreateArtistUseCase;
import com.group.smoothtune.application.usecase.Artist.GetArtistsUseCase;
import com.group.smoothtune.application.usecase.Genre.CreateGenreUseCase;
import com.group.smoothtune.application.usecase.Genre.GetGenresUseCase;
import com.group.smoothtune.application.usecase.Song.GetSongByIdUseCase;
import com.group.smoothtune.application.usecase.Song.GetSongsByUploaderId;
import com.group.smoothtune.application.usecase.Song.GetSongsUseCase;
import com.group.smoothtune.application.usecase.Song.UploadSongUseCase;
import com.group.smoothtune.application.usecase.User.*;
import com.group.smoothtune.application.usecase.UserSong.*;
import com.group.smoothtune.application.usecase.auth.SignInUseCase;
import com.group.smoothtune.application.usecase.auth.SignUpUseCase;
import com.group.smoothtune.domain.port.*;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;

@Configuration
public class UseCaseConfig {

    //========= USER =========
    @Bean
    public CreateUserUseCase createUserUseCase(UserRepository userRepository) {
        return new CreateUserUseCase(userRepository);
    }

    @Bean
    public GetUserByIdUseCase getUserByIdUseCase(UserRepository userRepository){
        return new GetUserByIdUseCase(userRepository);
    }

    @Bean
    public FindUserByEmailUseCase findUserByEmailUseCase(UserRepository userRepository) {
        return new FindUserByEmailUseCase(userRepository);
    }

    @Bean
    public FindUserByUsernameUseCase findUserByUsernameUseCase(UserRepository userRepository) {
        return new FindUserByUsernameUseCase(userRepository);
    }

    //========= LOGIN =========
    @Bean
    public SignInUseCase signInUseCase(
            AuthenticatePort authenticatePort,
            TokenPort tokenPort
    ) {
        return new SignInUseCase(authenticatePort, tokenPort);
    }

    @Bean
    public SignUpUseCase signUpUseCase(
            UserRepository userRepository,
            FindUserByEmailUseCase findUserByEmailUseCase,
            FindUserByUsernameUseCase findUserByUsernameUseCase,
            CreateUserUseCase createUserUseCase,
            PasswordEncoderPort passwordEncoderPort,
            TokenPort tokenPort,
            AuthenticatePort authenticatePort
    ) {
        return new SignUpUseCase(
                userRepository,
                findUserByEmailUseCase,
                findUserByUsernameUseCase,
                createUserUseCase,
                passwordEncoderPort,
                tokenPort,
                authenticatePort
        );
    }

    //========= SONG =========
    @Bean
    public UploadSongUseCase uploadSongUseCase(
            FileStoragePort fileStoragePort,
            SongRepository songRepository,
            UserRepository userRepository,
            GenreRepository genreRepository,
            ArtistRepository artistRepository
    ) {
        return new UploadSongUseCase(
                fileStoragePort,
                songRepository,
                userRepository,
                artistRepository,
                genreRepository
        );
    }

    @Bean
    public GetSongByIdUseCase getSongByIdUseCase(SongRepository songRepository){
        return new GetSongByIdUseCase(songRepository);
    }

    @Bean
    public GetSongsUseCase getSongsUseCase(SongRepository songRepository){
        return new GetSongsUseCase(songRepository);
    }

    @Bean
    public GetSongsByUploaderId getSongsByUploaderId(SongRepository songRepository){
        return new GetSongsByUploaderId(songRepository);
    }

    //========= UserSong =========
    @Bean
    public AddUserSongUseCase addUserSongUseCase(UserSongRepository userSongRepository, UserRepository userRepository, SongRepository songRepository){
        return new AddUserSongUseCase(userSongRepository, userRepository, songRepository);
    }

    @Bean
    public DeleteUserSongUseCase deleteUserSongUseCase(UserSongRepository userSongRepository){
        return new DeleteUserSongUseCase(userSongRepository);
    }

    @Bean
    public IncrementTimesPlayedUseCase incrementTimesPlayedUseCase(UserSongRepository userSongRepository){
        return new IncrementTimesPlayedUseCase(userSongRepository);
    }

    @Bean
    public GetUserSongsUseCase getUserSongsUseCase(UserSongRepository userSongRepository){
        return new GetUserSongsUseCase(userSongRepository);
    }

    @Bean
    public GetMostPlayedUserSongsUseCase getMostPlayedUserSongsUseCase(UserSongRepository userSongRepository){
        return new GetMostPlayedUserSongsUseCase(userSongRepository);
    }

    //========= Genre =========
    @Bean
    public CreateGenreUseCase createGenreUseCase(
            GenreRepository genreRepository
    ){
        return new CreateGenreUseCase(genreRepository);
    }

    @Bean
    public GetGenresUseCase getGenresUseCase(GenreRepository genreRepository){
        return new GetGenresUseCase(genreRepository);
    }

    //========= Artist =========
    @Bean
    public CreateArtistUseCase createArtistUseCase(ArtistRepository artistRepository){
        return new CreateArtistUseCase(artistRepository);
    }

    @Bean
    public GetArtistsUseCase getArtistUseCase(ArtistRepository artistRepository){
        return new GetArtistsUseCase(artistRepository);
    }


}
