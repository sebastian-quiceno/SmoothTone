import {type Song} from '../types/song'

export type UserSong = {
    id: number;
    userName: string;
    song: Song;
    timesPlayed: number;
    savedAt: Date
}

export type UserSongRequest = {
	userId: number
	songId: number
}