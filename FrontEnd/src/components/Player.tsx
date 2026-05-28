import { useState } from "react";
import { usePlayerStore } from "../hooks/usePlayerStore";
import { SkipBack, SkipForward, Play, Pause, List, X, Trash2 } from "lucide-react";

export function Player() {
  const {
    currentTrack,
    isPlaying,
    currentTime,
    duration,
    pause,
    resume,
    seek,
    next,
    previous,
  } = usePlayerStore();
  const { queue, removeFromQueue } = usePlayerStore();
  const [showQueue, setShowQueue] = useState(false);
  const hasQueue = queue.length > 0;
  const canGoBack = currentTime > 0 || Boolean(currentTrack);
  const canGoNext = hasQueue && queue.length > 1;

  return (
    <>
      <div className="border-t border-white/10 bg-[#1b1b36] px-4 py-4 text-white shadow-[0_-8px_30px_rgba(0,0,0,0.25)]">
        <div className="mx-auto flex w-full max-w-6xl flex-col gap-4 lg:flex-row lg:items-center lg:justify-between">
          <div className="min-w-0 flex-1">
            <p className="truncate text-2xl font-semibold">
              {currentTrack?.title ?? "No hay canción"}
            </p>
            <p className="truncate text-sm text-white/55">
              {currentTrack?.artist ?? "No hay artista"}
            </p>
          </div>

          <div className="flex flex-1 flex-col items-center gap-3">
            <div className="flex items-center gap-2 py-2 ">
              <button
                type="button"
                onClick={previous}
                disabled={!canGoBack}
                className="flex h-11 w-11 items-center justify-center rounded-full bg-white/10 transition hover:bg-white/20 disabled:cursor-not-allowed disabled:opacity-40"
                aria-label="Canción anterior"
              >
                <SkipBack className="h-5 w-5" />
              </button>

              <button
                type="button"
                onClick={isPlaying ? pause : resume}
                className="flex h-14 w-14 items-center justify-center rounded-full bg-white text-[#1b1b36] transition hover:scale-105 hover:bg-white/90"
                aria-label={isPlaying ? "Pausar reproducción" : "Reproducir canción"}
              >
                {isPlaying ? <Pause className="h-6 w-6" /> : <Play className="h-6 w-6" />}
              </button>

              <button
                type="button"
                onClick={next}
                disabled={!canGoNext}
                className="flex h-11 w-11 items-center justify-center rounded-full bg-white/10 transition hover:bg-white/20 disabled:cursor-not-allowed disabled:opacity-40"
                aria-label="Siguiente canción"
              >
                <SkipForward className="h-5 w-5" />
              </button>
            </div>

            <div className="flex w-full items-center gap-3">
              <span className="min-w-[42px] text-right text-xs text-white/60">
                {Math.floor(currentTime)}
              </span>
              <input
                type="range"
                min={0}
                max={duration || 0}
                value={currentTime}
                onChange={(e) => seek(Number(e.target.value))}
                className="h-2 w-full cursor-pointer appearance-none rounded-full bg-white/15 accent-white"
                aria-label="Control de progreso de la canción"
              />
              <span className="min-w-[42px] text-xs text-white/60">
                {Math.floor(duration)}
              </span>
            </div>
          </div>

          <div className="flex items-center justify-end gap-3">
            <button
              type="button"
              className="flex items-center gap-2 rounded-full border border-white/10 bg-white/5 px-4 py-2 text-sm transition hover:bg-white/10"
              onClick={() => setShowQueue(true)}
              aria-label="Abrir cola de reproducción"
            >
              <List className="h-4 w-4" />
              Cola
              <span className="rounded-full bg-white/10 px-2 py-0.5 text-xs">
                {queue.length}
              </span>
            </button>
          </div>
        </div>
      </div>
      {showQueue && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 px-4 backdrop-blur-sm"
          onClick={() => setShowQueue(false)}
        >
          <div
            className="w-full max-w-md overflow-hidden rounded-3xl border border-white/10 bg-[#393755] text-white shadow-[0_24px_80px_rgba(0,0,0,0.45)]"
            onClick={(event) => event.stopPropagation()}
          >
            <div className="flex items-start justify-between border-b border-white/10 px-6 py-5">
              <div>
                <h2 className="text-xl font-semibold">Cola de reproducción</h2>
                <p className="text-sm text-white/60">
                  {queue.length} canción{queue.length === 1 ? "" : "es"} en cola
                </p>
              </div>

              <button
                type="button"
                onClick={() => setShowQueue(false)}
                className="rounded-full p-2 text-white/70 transition hover:bg-white/10 hover:text-white"
                aria-label="Cerrar cola"
              >
                <X className="h-5 w-5" />
              </button>
            </div>

            <div className="max-h-[60vh] overflow-auto px-4 py-4">
            {queue.length === 0 ? (
              <div className="rounded-2xl border border-white/10 bg-white/5 px-4 py-6 text-center text-white/70">
                La cola está vacía.
              </div>
            ) : (
              <div className="space-y-2">
                {queue.map((t) => (
                  <div
                    key={t.id}
                    className="flex items-center justify-between gap-3 rounded-2xl border border-white/10 bg-white/5 px-4 py-3"
                  >
                    <div className="min-w-0">
                      <span className="block truncate font-medium">{t.title}</span>
                      {t.artist && (
                        <span className="block truncate text-xs text-white/55">
                          {t.artist}
                        </span>
                      )}
                    </div>

                    <div className="flex gap-2">
                      <button
                        type="button"
                        onClick={() => removeFromQueue(t.id)}
                        className="inline-flex items-center gap-2 rounded-full bg-red-500/15 px-3 py-2 text-sm text-red-100 transition hover:bg-red-500/25"
                        aria-label={`Eliminar ${t.title} de la cola`}
                      >
                        <Trash2 className="h-4 w-4" />
                        Eliminar
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            )}
            </div>

            <div className="flex justify-end border-t border-white/10 px-6 py-4">
              <button
                type="button"
                onClick={() => setShowQueue(false)}
                className="rounded-full bg-white/10 px-4 py-2 text-sm font-medium text-white transition hover:bg-white/15"
              >
                Cerrar
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
