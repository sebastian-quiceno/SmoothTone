import { useState, useEffect } from "react";

import { songService } from "../services/songService";

import portraitNotFound from "/portraitNotFound.jpg";

type SongCardProps = {
  id: number;
  title: string;
  artist: string;
  onClick?: () => void;
  img?: string;
};

const SongCard = ({ id, title, artist, onClick, img }: SongCardProps) => {
  const [imageUrl, setImageUrl] = useState<string | null>(null);

  useEffect(() => {
    if (img) {
      return;
    }

    songService.getImageUrl(id).then(setImageUrl);
  }, [id, img]);

  return (
    <div className="flex flex-col text-white max-w-[200px]" onClick={onClick}>
      <img
        className="w-[200px] h-[200px] rounded-xl hover:shadow-sm"
        src={
          img
            ? img
            : imageUrl !== null && imageUrl !== ""
            ? imageUrl
            : portraitNotFound
        }
        alt="Portada de la canción"
      />
      <span className="text-xl font-bold">{title}</span>
      <span className="text-white/70 text-xl">{artist}</span>
    </div>
  );
};

export default SongCard;
