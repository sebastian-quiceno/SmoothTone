import axios from "axios";
import apiClient from "../apis/apiClient";
import {type UserSong, type UserSongRequest} from '../types/userSong'

function getApiErrorMessage(error: unknown, fallbackMessage: string) {
	if (axios.isAxiosError<{ message?: string }>(error)) {
		return error.response?.data?.message || fallbackMessage;
	}

	return fallbackMessage;
}

export const userSongService = {

	getUserSongs: async (id: number): Promise<UserSong[]> => {
		try {
			const response = await apiClient.get<UserSong[]>(`/userSong/getUserSongsByUserId/${id}`);
		
			return response.data;

		} catch (error) {
			throw new Error(getApiErrorMessage(error, "Error al obtener las canciones guardadas del usuario con id: " + id))
		}
	},

	getMostPlayedUserSongs: async (id: number): Promise<UserSong[]> => {
		try {
			const response = await apiClient.get<UserSong[]>(`/userSong/getMostPlayedUserSongs/${id}`);
			
			return response.data;

		} catch (error) {
			throw new Error(getApiErrorMessage(error, "Error al obtener las canciones mas escuchadas guardadas del usuario con id: " + id))
		}
	},

	incrementTimesPlayed: async (id: number): Promise<string> => {
		try {
			const response = await apiClient.post<string>(`/userSong/incrementTimesPlayed/${id}`);
			return response.data;

		} catch (error) {
			throw new Error(getApiErrorMessage(error, "Error al intentar incrementar la visualizacion de la cancion guardada con id: " + id))
		}
	},
	addUserSong: async (request: UserSongRequest): Promise<UserSong> => {
		try {
			const response = await apiClient.post<UserSong>("/userSong/addUserSong", request);
			return response.data;

		} catch (error) {
			throw new Error(getApiErrorMessage(error, "Error al intentar Guardar la cancion"))
		}
	},
	deleteUserSong: async (id: number): Promise<string> => {
		try {
			const response = await apiClient.post<string>(`/userSong/deleteUserSong/${id}`);
			return response.data;

		} catch (error) {
			throw new Error(getApiErrorMessage(error, "Error al intentar eliminar la cancion guardada con id: " + id))
		}
	},

}
