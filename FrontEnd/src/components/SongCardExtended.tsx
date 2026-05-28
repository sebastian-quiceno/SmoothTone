import { useState, useEffect, useMemo } from "react";

import {OptionsSavedSong} from './OptionsSavedSong'
import {OptionsSong} from './OptionsSong'

import { songService } from "../services/songService";

import {useAuth} from '../hooks/useAuth'

import portraitNotFound from "/portraitNotFound.jpg";

type SongCardProps = {
  userSongId?: number
  id: number;
  title: string;
  artist: string;
  uploader: string;
  genre: string;
  duration: number;
  size: number;
  dateUpload: Date;
  onClick: () => void;
  saved: boolean
};

export const SongCardExtended = ({
  userSongId,
  id,
  title,
  artist,
  uploader,
  genre,
  duration,
  size,
  dateUpload,
  onClick,
  saved
}: SongCardProps) => {
  const [loading, setLoading] = useState<boolean>(true);
  const [imageUrl, setImageUrl] = useState<string | null>(null);
  const {userId} = useAuth()

  useEffect(() => {
    songService
      .getImageUrl(id)
      .then(setImageUrl)
      .finally(() => setLoading(false));
  }, []);

  const formattedDate = useMemo(() => {
    const d = new Date(dateUpload);
    const day = String(d.getDate()).padStart(2, "0");
    const month = String(d.getMonth() + 1).padStart(2, "0");
    const year = d.getFullYear();
    return `${day}/${month}/${year}`;
  }, [dateUpload]);

  return (
    <div className="grid grid-cols-4 items-center text-white gap-16">
      <div className="flex flex-row gap-2 cursor-pointer" onClick={onClick}>
        <img
          className="w-[65px] h-[65px] rounded-xl hover:shadow-sm"
          src={
            !loading && imageUrl !== null && imageUrl !== ""
              ? imageUrl
              : portraitNotFound
          }
          alt="Portada de la canción"
        />
        <div className="flex flex-col">
          <span className="text-2xl">{title}</span>
          <span className="text-white/70 text-xl">{artist}</span>
        </div>
      </div>
      <span className="text-white/70 text-2xl">{genre}</span>
      <span className="text-white/70 text-xl">{formattedDate}</span>
      
      {saved&& <OptionsSavedSong  userSongId={userSongId} songId={id}/>}
      {!saved&& <OptionsSong songId={id}/>}
      
    </div>
  );
};
