import { useState } from "react";

import { userSongService } from "../services/userSongService";
import { type UserSong, type UserSongRequest } from "../types/userSong";

export const useUserSong = () => {
  const [userSongs, setUserSongs] = useState<UserSong[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const getUserSongs = async (id: number): Promise<UserSong[]> => {
    setLoading(true);
    setError(null);

    try {
      const songs = await userSongService.getUserSongs(id);
      setUserSongs(songs);
      return songs;
    } catch (err: unknown) {
      if (err instanceof Error) {
        setError(err.message);
      } else {
        setError("Error al obtener canciones guardadas");
      }
      return [];
    } finally {
      setLoading(false);
    }
  };
  const getMostPlayedUserSongs = async (id: number): Promise<UserSong[]> => {
    setLoading(true);
    setError(null);

    try {
      const songs = await userSongService.getMostPlayedUserSongs(id);
      setUserSongs(songs);
      return songs;
      
    } catch (err: unknown) {
      if (err instanceof Error) {
        setError(err.message);
      } else {
        setError("Error al obtener canciones mas escuchadas guardadas");
      }
      return [];
    } finally {
      setLoading(false);
    }
  };
  const addUserSong = async ({userId, songId}: UserSongRequest): Promise<UserSong | undefined> => {
    setLoading(true);
    setError(null);

    try {
      console.log("userId: ",userId," songId:",songId)
      const song = await userSongService.addUserSong({userId, songId});
      return song;
    } catch (err: unknown) {
      if (err instanceof Error) {
        setError(err.message);
      } else {
        setError("Error al guardar cancion");
      }
    } finally {
      setLoading(false);
    }
  };
  const deleteUserSong = async (id: number): Promise<string | undefined> => {
    setLoading(true);
    setError(null);

    try {
      const response = await userSongService.deleteUserSong(id);
      return response;
    } catch (err: unknown) {
      if (err instanceof Error) {
        setError(err.message);
      } else {
        setError("Error al borrar cancion guardada");
      }
    } finally {
      setLoading(false);
    }
  };
  const incrementTimesPlayed = async (id: number): Promise<void> => {
    setLoading(true);
    setError(null);

    try {
      await userSongService.incrementTimesPlayed(id);
    } catch (err: unknown) {
      if (err instanceof Error) {
        setError(err.message);
      } else {
        setError("Error al obtener intentar aumentar la visualizacion de la cancion guardada con id: "+id);
      }
    } finally {
      setLoading(false);
    }
  };

  return { userSongs, loading, error, getUserSongs, getMostPlayedUserSongs, addUserSong, deleteUserSong, incrementTimesPlayed };
};
