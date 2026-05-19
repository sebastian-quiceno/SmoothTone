import { useState } from "react";
import { type Song } from "../types/song";

import { usePlayerStore } from "../hooks/usePlayerStore";

import { SongCardExtended } from "../components/SongCardExtended";
import SongCard from "../components/SongCard";

import { songMapper } from "../util/songMapper";
type ShowSongsProps = {
  isLoading: boolean;
  songs: Song[];
  userSongsIds?: UserSongId[];
  saved: boolean
};

type UserSongId = {
  userSongId: number;
  songId: number;
};

export const ShowSongsExtended = ({
  isLoading,
  songs,
  userSongsIds,
  saved
}: ShowSongsProps) => {
  const { play, queue } = usePlayerStore();

  return (
    <div className="flex flex-col gap-5 mt-5">
      {isLoading && <p className="text-sm text-gray-400 mt-1">Cargando...</p>}

      {songs.map((song) => (
        <SongCardExtended
          key={song.id}
          id={song.id}
          title={song.tittle}
          artist={song.artist.name}
          genre={song.genre.name}
          uploader={song.uploader}
          dateUpload={song.uploadedAt}
          duration={song.duration}
          size={song.size}
          onClick={() => {
            if (userSongsIds) {
              const userSong = userSongsIds.find(
                (userSong) => userSong.songId === song.id,
              );
              play(songMapper.toTrack(song), undefined, userSong.id);
            } else {
              play(songMapper.toTrack(song));
            }
          }}
          saved = {saved}
          userSongId={userSongsIds?.find((userSong) => userSong.songId === song.id)?.userSongId}
        />
      ))}
    </div>
  );
};

export const ShowSongs = ({
  isLoading,
  songs,
  userSongsIds,
}: ShowSongsProps) => {
  const { play, queue } = usePlayerStore();

  return (
    <div className="flex flex-col gap-5 mt-5">
      {isLoading && <p className="text-sm text-gray-400 mt-1">Cargando...</p>}

      {songs.map((song) => (
        <SongCard
          key={song.id}
          id={song.id}
          title={song.tittle}
          artist={song.artist.name}
          onClick={() => {
            const userSong = userSongsIds.find(
              (userSong) => userSong.songId === song.id,
            );
            play(songMapper.toTrack(song), undefined, userSong.id);
          }}
        />
      ))}
    </div>
  );
};
