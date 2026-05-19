import { CirclePlay } from "lucide-react";

import { useEffect } from "react";

import { useUserSong } from "../hooks/useUserSong";

import { ShowSongsExtended } from "../components/ShowSongs";

type SavedSongsSectionProps = {
  id: number;
};

export const SavedSongsSection = ({ id }: SavedSongsSectionProps) => {
  const { userSongs, loading, error, getUserSongs } = useUserSong();

  useEffect(() => {
    getUserSongs(id);
  }, []);

  return (
    <div className="text-white p-8">
      <div className="flex flex-row justify-between pr-4">
        <span className="text-4xl ">Tus canciones Guardadas</span>
        <div className="w-12 h-12 bg-[#40a5bc] rounded-full flex items-center justify-center hover:scale-105 transition-all duration-200">
          <CirclePlay className="w-full h-full" />
        </div>
      </div>
      {error ? <p className="text-red-300">{error}</p> : null}
      {loading ? <p>Cargando canciones guardadas...</p> : null}
      <div className="grid grid-cols-4 text-white/70 gap-16 mt-4">
        <span className="">Nombre</span>
        <span className="">Genero</span>
        <span className="">Fecha</span>
        <span className="">Info</span>
      </div>
      <hr className="mx-5 my-2 border-[#191527] border-2" />
      <ShowSongsExtended
        saved={true}
        isLoading={loading}
        userSongsIds={userSongs.map((item) => ({
          userSongId: item.id,
          songId: item.song.id,
        }))}
        songs={userSongs.map((item) => item.song)}
      />
    </div>
  );
};
