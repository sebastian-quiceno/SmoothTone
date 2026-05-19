package com.group.smoothtune.adapter.in.rest.dtos.response;

public record AuthResponseDTO(
        String token,
        Long userId,
        String userName,
        int uploadedSongs
) {}
