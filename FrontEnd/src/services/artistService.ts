import axios from "axios";
import apiClient from "../apis/apiClient";
import {type Artist, type CreateArtistRequest} from '../types/artist'


function getApiErrorMessage(error: unknown, fallbackMessage: string) {
  if (axios.isAxiosError<{ message?: string }>(error)) {
    return error.response?.data?.message || fallbackMessage;
  }

  return fallbackMessage;
}

export const artistService = {
  getArtists: async (): Promise<Artist[]> => {
    try {
      const response = await apiClient.get<Artist[]>("/artist/getArtists");
      return response.data;
    } catch (error: unknown) {
      throw new Error(getApiErrorMessage(error, "Error al obtener artistas"));
    }
  },

  createArtist: async (request: CreateArtistRequest) => {
    try {
      const response = await apiClient.post<Artist>("/artist/create", request);
      return response.data;

    } catch (error: unknown) {
      throw new Error(getApiErrorMessage(error, "Error al crear el artista"))
    }
  },
};
