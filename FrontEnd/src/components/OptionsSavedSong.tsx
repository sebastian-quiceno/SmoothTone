import { useState } from "react";
import { Info, Trash2, Plus, X, Music2 } from "lucide-react";

import { useUserSong } from "../hooks/useUserSong";
import { songService } from "../services/songService";
import { songMapper } from "../util/songMapper";
import { usePlayerStore } from "../hooks/usePlayerStore";

type OptionsSavedSongProps = {
  userSongId: number
  songId?: number
}

export const OptionsSavedSong = ({userSongId, songId}: OptionsSavedSongProps) => {
  const { deleteUserSong } = useUserSong();
  const [show, setShow] = useState<boolean>(false);
  const handleSaveSong = async (): Promise<void> => {
    const savedSong = await deleteUserSong(userSongId);
    console.log("Borrando cancion con userSongId: "+userSongId)
    if (!savedSong) {
      console.error("No se pudo borrar la canción");
      return;
    }
    setShow(false);
  };
  
  const handleAddToQueue = async (): Promise<void> => {
    try {
      if (!songId) {
        console.error('songId no disponible para encolar')
        return
      }

      const song = await songService.getSong(songId)
      const track = songMapper.toTrack(song)
      usePlayerStore.getState().enqueue(track)
      console.log('Canción encolada:', track.id)
      setShow(false)
    } catch (error) {
      console.error('Error al encolar la canción', error)
    }
  }
  return (
    <>
      <button
        type="button"
        onClick={() => setShow(true)}
        className="inline-flex items-center justify-center p-3 text-white transition duration-300 hover:scale-105"
        aria-label="Abrir opciones de canción guardada"
      >
        <Info className="h-5 w-5" />
      </button>
      {show && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 px-4 backdrop-blur-sm">
          <div className="w-full max-w-md overflow-hidden rounded-3xl border border-white/10 bg-[#393755] text-white shadow-[0_24px_80px_rgba(0,0,0,0.45)]">
            <div className="flex items-start justify-between border-b border-white/10 px-6 py-5">
              <div className="flex items-center gap-3">
                <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-white/10 text-white">
                  <Music2 className="h-6 w-6" />
                </div>
                <div>
                  <h2 className="text-xl font-semibold">Opciones de canción</h2>
                  <p className="text-sm text-white/60">
                    ¿Qué deseas hacer con esta canción guardada?
                  </p>
                </div>
              </div>

              <button
                type="button"
                onClick={() => setShow(false)}
                className="rounded-full p-2 text-white/70 transition hover:bg-white/10 hover:text-white"
                aria-label="Cerrar opciones"
              >
                <X className="h-5 w-5" />
              </button>
            </div>

            <div className="px-6 py-5">
              <p className="mb-5 text-sm leading-6 text-white/70">
                Puedes eliminar la canción de tus guardadas o agregarla a la cola de reproducción.
              </p>

              <div className="space-y-3">
                <button
                  type="button"
                  onClick={handleSaveSong}
                  className="flex w-full items-center justify-between rounded-2xl border border-red-400/20 bg-red-500/10 px-4 py-3 text-left text-white transition hover:-translate-y-0.5 hover:bg-red-500/20"
                >
                  <span className="flex items-center gap-3 font-medium">
                    <span className="flex h-10 w-10 items-center justify-center rounded-xl bg-red-500/20 text-red-200">
                      <Trash2 className="h-5 w-5" />
                    </span>
                    Eliminar canción guardada
                  </span>
                  <span className="text-xs uppercase tracking-[0.2em] text-red-200/80">
                    Remove
                  </span>
                </button>

                <button
                  type="button"
                  onClick={handleAddToQueue}
                  className="flex w-full items-center justify-between rounded-2xl border border-cyan-300/20 bg-cyan-400/10 px-4 py-3 text-left text-white transition hover:-translate-y-0.5 hover:bg-cyan-400/20"
                >
                  <span className="flex items-center gap-3 font-medium">
                    <span className="flex h-10 w-10 items-center justify-center rounded-xl bg-cyan-400/20 text-cyan-100">
                      <Plus className="h-5 w-5" />
                    </span>
                    Agregar a la cola
                  </span>
                  <span className="text-xs uppercase tracking-[0.2em] text-cyan-100/80">
                    Queue
                  </span>
                </button>
              </div>

              <button
                type="button"
                onClick={() => setShow(false)}
                className="mt-5 w-full rounded-2xl border border-white/10 bg-white/5 px-4 py-3 text-sm font-medium text-white/80 transition hover:bg-white/10 hover:text-white"
              >
                Cerrar
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
};
