import { useState } from "react";
import { Info } from "lucide-react";

import {SaveSongButton} from './SaveSongButton'

import { useUserSong } from "../hooks/useUserSong";

type OptionsSongProps = {
  userId: number;
  songId: number;
};

export const OptionsSong = ({ userId, songId }: OptionsSongProps) => {
  const { addUserSong } = useUserSong();
  const [show, setShow] = useState<boolean>(false);
  console.log("Al guardar la cancion se recibieron los siguientes ids: userId: ",userId," songId:",songId)
  return (
    <>
      <Info
        className="w-20 transition-transform duration-300 hover:scale-105 cursor-pointer"
        onClick={() => setShow(true)}
      />
      {show && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40">
          <div className="w-96 rounded-2xl bg-white p-6 shadow-2xl">
            <h2 className="mb-4 text-xl font-bold">Ventana emergente</h2>

            <p className="mb-6 text-gray-600">
              ¿Que desea hacer con la cancion?
            </p>

            <SaveSongButton onClick={() => addUserSong({userId, songId})}/>

            <button
              onClick={() => setShow(false)}
              className="rounded bg-red-500 px-4 py-2 text-white hover:bg-red-600"
            >
              Cerrar
            </button>
          </div>
        </div>
      )}
    </>
  );
};
