import { useState } from "react";
import { useNavigate } from "react-router-dom";
import {
  Music,
  House,
  CassetteTape,
  ListMusic,
  MicVocal,
  CloudUpload,
} from "lucide-react";

import { useAuth } from "../hooks/useAuth";

import UserButton from "../components/UserButton";
import NewSong from "../components/UploadSongButton";
import SectionButton from "../components/SectionButton";
import { HomeSection } from "../components/HomeSection";
import { SavedSongsSection } from "../components/SavedSongsSection";
import { UploadedSongsSection } from "../components/UploadedSongsSection";
import { AllSongsSection } from "../components/AllSongsSection";
import { Player } from "../components/Player";

import logo from "/logo.png";

//userId: string
const UserHome = () => {
  const navigate = useNavigate();
  const components = {
    home: "<Home />",
    savedSongs: "<Saved />",
    uploadedSongs: "<Uploaded />",
    allSongs: "<Songs/>",
    playlist: "<Playlistx />",
    artist: "<Artist />",
  };

  const [sectionSelected, setSectionSelected] = useState(components.home);
  const { userId, userName, uploadedSongs } = useAuth();

  return (
    <div className="bg-[#2C2A4C] flex flex-row min-h-screen">
      <aside className="bg-gradient-to-b from-[#140E28] to-[#302551] w-72 p-4 flex flex-col items-center">
        <div className="flex flex-col items-center gap-4">
          <div className="flex flex-row items-center gap-2">
            <img
              src={logo}
              alt="Vista previa del reproductor de música"
              className="w-[50px]"
            />
            <h1 className="text-3xl font-bold bg-gradient-to-r from-cyan-400 to-purple-600 bg-clip-text text-transparent">
              Smooth Tune
            </h1>
          </div>
          <NewSong onClick={() => navigate("/upload-song")} />
        </div>
        <div className="p-4 gap-7 flex flex-col">
          <SectionButton
            Icon={House}
            direccion="asd"
            isSelect={sectionSelected === components.home ? true : false}
            onclick={() => setSectionSelected(components.home)}
            text="Inicio"
          />
          <SectionButton
            Icon={Music}
            direccion="asd"
            isSelect={sectionSelected === components.savedSongs ? true : false}
            onclick={() => setSectionSelected(components.savedSongs)}
            text="Canciones guardadas"
          />
          <SectionButton
            Icon={CloudUpload}
            direccion="asd"
            isSelect={
              sectionSelected === components.uploadedSongs ? true : false
            }
            onclick={() => setSectionSelected(components.uploadedSongs)}
            text="Canciones subidas"
          />
          <SectionButton
            Icon={CassetteTape}
            direccion="asd"
            isSelect={sectionSelected === components.allSongs ? true : false}
            onclick={() => setSectionSelected(components.allSongs)}
            text="Buscar canciones"
          />
          <SectionButton
            Icon={ListMusic}
            direccion="asd"
            isSelect={sectionSelected === components.playlist ? true : false}
            onclick={() => setSectionSelected(components.playlist)}
            text="Playlists"
          />
          <SectionButton
            Icon={MicVocal}
            direccion="asd"
            isSelect={sectionSelected === components.artist ? true : false}
            onclick={() => setSectionSelected(components.artist)}
            text="Artistas"
          />
        </div>
      </aside>

      <div className="flex-1 min-h-screen flex flex-col">
        
        <header className="flex flex-row justify-end p-5 w-full">
          <UserButton image="" username={userName} />
        </header>
        {sectionSelected === components.home && (
          <HomeSection
            userId={userId}
            username={userName}
            uploadedSongs={uploadedSongs}
          />
        )}
        {sectionSelected === components.savedSongs && (
          <SavedSongsSection id={userId} />
        )}
        {sectionSelected === components.uploadedSongs && (
          <UploadedSongsSection id={userId} />
        )}
        {sectionSelected === components.allSongs && <AllSongsSection />}
        {sectionSelected === components.playlist && (
          <HomeSection userId={userId} />
        )}
        {sectionSelected === components.artist && (
          <HomeSection userId={userId} />
        )}
        <div className="mt-auto">
          <Player />
        </div>
      </div>
    </div>
  );
};

export default UserHome;
