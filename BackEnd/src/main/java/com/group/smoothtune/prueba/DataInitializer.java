package com.group.smoothtune.prueba;

import com.group.smoothtune.adapter.out.persistence.entity.UserEntity;
import com.group.smoothtune.adapter.out.persistence.repository.jpa.UserJpaRepository;
import org.springframework.boot.CommandLineRunner;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;

@Configuration
public class DataInitializer {
    @Bean
    CommandLineRunner initUsers(UserJpaRepository userRepo) {
        return args -> {
            BCryptPasswordEncoder encoder = new BCryptPasswordEncoder();

            if (userRepo.count() <= 1) { // solo si no hay usuarios aparte del basico
                UserEntity user = UserEntity.builder()
                        .email("prueba@test.com")
                        .username("Prueba")
                        .password(encoder.encode("prueba123"))
                        .enabled(true)
                        .build();

                userRepo.save(user);
                System.out.println("Usuario inicial creado, su ID es: "+user.getId());
            }
        };
    }
}
