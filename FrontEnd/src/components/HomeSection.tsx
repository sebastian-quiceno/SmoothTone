import { useEffect } from "react";
import SearchBar from "../components/SearchBar";
import UserButton from "../components/UserButton";
import { useUserSong } from "../hooks/useUserSong";

import { ShowSongs } from "../components/ShowSongs";
import Greetings from "../components/Greetings";
import UploadedSongs from "../components/UploadedSongs";

type HomeSectionProps = {
  userId: number;
  username: string;
  uploadedSongs: number;
};

export const HomeSection = ({
  userId,
  username,
  uploadedSongs,
}: HomeSectionProps) => {
  const { userSongs, loading, error, getMostPlayedUserSongs } = useUserSong();

  useEffect(() => {
    getMostPlayedUserSongs(userId);
  }, []);

  return (
    <section className="w-full h-full">
      <div className="flex flex-row justify-between px-10">
        <Greetings image="" username={username} />
        <UploadedSongs uploadedSongs={uploadedSongs} />
      </div>
      <hr className="mx-5 my-2 border-[#191527] border-2" />

      <div className="text-white font-bold px-10 gap-10">
        <span className="text-4xl">¿Que vas a escuchar hoy?</span>
        <div className="grid grid-cols-5 gap-4 mt-5">
          <ShowSongs
            isLoading={loading}
            userSongsIds={userSongs.map((item) => ({
              userSongId: item.id,
              songId: item.song.id,
            }))}
            songs={userSongs.map((item) => item.song)}
          />
        </div>
      </div>
    </section>
  );
};
