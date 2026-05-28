package com.group.smoothtune.adapter.out.persistence.mapper;

import com.group.smoothtune.adapter.out.persistence.entity.SongEntity;
import com.group.smoothtune.adapter.out.persistence.entity.UserEntity;
import com.group.smoothtune.domain.model.Song;
import com.group.smoothtune.domain.model.User;
import com.group.smoothtune.domain.model.UserSong;
import com.group.smoothtune.adapter.out.persistence.entity.PlaylistUserSongEntity;
import com.group.smoothtune.adapter.out.persistence.entity.UserSongEntity;

import java.util.List;

public class UserSongPersistenceMapper {

    public static UserSong toDomain(UserSongEntity entity) {
        UserSong userSong = new UserSong(
                entity.getId(),
                entity.getTimesPlayed(),
                entity.getSavedAt(),
                UserPersistenceMapper.toDomain(entity.getUser()),
                SongPersistenceMapper.toDomain(entity.getSong()),
                entity.getPlaylistSongs().stream().map(PlaylistUserSongEntity::getId).toList()
        );

        return userSong;
    }

    public static UserSongEntity toEntity(UserSong userSong) {
        UserSongEntity entity = new UserSongEntity();

        entity.setId(userSong.getId());
        entity.setTimesPlayed(userSong.getTimesPlayed());
        entity.setSavedAt(userSong.getSavedAt());

        UserEntity user = new UserEntity();
        user.setId(userSong.getUser().getId());

        SongEntity song = new SongEntity();
        song.setId(userSong.getSong().getId());

        entity.setUser(user);
        entity.setSong(song);

        return entity;
    }
}
