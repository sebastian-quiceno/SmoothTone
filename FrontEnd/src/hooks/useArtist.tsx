import { useState } from "react";
import { artistService } from "../services/artistService";
import { type Artist, type CreateArtistRequest } from "../types/artist";

export function useArtist() {
  const [artists, setArtists] = useState<Artist[]>([]);
  const [loading, setLoading] = useState(false);

  const [error, setError] = useState<string | null>(null);

  const getArtists = async () => {
    setLoading(true);
    setError(null);
    try {
      const data = await artistService.getArtists();
      setArtists(data);
    } catch (err: unknown) {
      if (err instanceof Error) {
        setError(err.message);
      } else {
        setError("Error desconocido");
      }
    } finally {
      setLoading(false);
    }
  };

  const createArtist = async (request: CreateArtistRequest) => {
    setLoading(true);
    setError(null);

    try {
      await artistService.createArtist(request);
    } catch (err: unknown) {
      if (err instanceof Error) {
        setError(err.message);
      } else {
        setError("Error al crear el Artista");
      }
    } finally {
      setLoading(false);
    }
  };

  return { genres: artists, loading, error, getArtists, createArtist };
}

