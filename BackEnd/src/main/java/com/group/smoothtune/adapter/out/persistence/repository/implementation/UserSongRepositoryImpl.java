package com.group.smoothtune.adapter.out.persistence.repository.implementation;

import com.group.smoothtune.domain.model.UserSong;
import com.group.smoothtune.domain.port.UserSongRepository;
import com.group.smoothtune.adapter.out.persistence.entity.UserSongEntity;
import com.group.smoothtune.adapter.out.persistence.mapper.UserSongPersistenceMapper;
import com.group.smoothtune.adapter.out.persistence.repository.jpa.UserSongJpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.Optional;

@Repository
public class UserSongRepositoryImpl implements UserSongRepository {
    private final UserSongJpaRepository userSongJpaRepository;

    public UserSongRepositoryImpl(UserSongJpaRepository userSongJpaRepository) {
        this.userSongJpaRepository = userSongJpaRepository;
    }

    @Override
    public UserSong save(UserSong userSong) {
        UserSongEntity entity = UserSongPersistenceMapper.toEntity(userSong);
        userSongJpaRepository.save(entity);
        return userSong;
    }

    @Override
    public Optional<UserSong> findById(Long id) {
        return userSongJpaRepository.findById(id)
                .map(UserSongPersistenceMapper::toDomain);
    }

    @Override
    public List<UserSong> findAll() {
        return userSongJpaRepository.findAll()
                .stream()
                .map(UserSongPersistenceMapper::toDomain)
                .toList();
    }

    @Override
    public void deleteById(Long id) {
        userSongJpaRepository.deleteById(id);
    }

    @Override
    public List<UserSong> findAllByUserId(Long id) {
        return userSongJpaRepository.findAllByUserIdOrderBySavedAt(id).
                stream().
                map(UserSongPersistenceMapper::toDomain).
                toList();
    }

    @Override
    public boolean existsByUserIdAndSongId(Long userId, Long songId){

        return userSongJpaRepository.existsByUserIdAndSongId(userId, songId);
    }

    @Override
    public List<UserSong> getTenMostPlayed(Long userId){
        return userSongJpaRepository.findTop10ByUserIdOrderByTimesPlayedDesc(userId).
                stream().
                map(UserSongPersistenceMapper::toDomain).
                toList();
    }

}
