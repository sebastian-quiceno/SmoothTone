import { useEffect, useState } from "react";
import { CirclePlay } from "lucide-react";

import { useSongs } from "../hooks/useSongs";

import {ChangePage} from '../components/ChangePage'
import { ShowSongsExtended } from "../components/ShowSongs";

type AllSongsSectionProps = {
  pageNumber?: number;
};

export const AllSongsSection = ({ pageNumber }: AllSongsSectionProps) => {
  const { page, maxPage, loading, error, getSongs } = useSongs();
  const [actualPage, setActualPage] = useState<number>(pageNumber ?? 0);

  useEffect(() => {
    void getSongs(actualPage);
  }, [actualPage]);

  return (
    <div className="text-white p-8">
      <div className="flex flex-row justify-between pr-4">
        <span className="text-4xl ">Encuentra Canciones</span>
        <div className="w-12 h-12 bg-[#40a5bc] rounded-full flex items-center justify-center hover:scale-105 transition-all duration-200">
          <CirclePlay className="w-full h-full" />
        </div>
      </div>
      {error ? <p className="text-red-300">{error}</p> : null}
      {loading ? <p>Cargando canciones...</p> : null}
      <div className="grid grid-cols-4 text-white/70 gap-16 mt-4">
        <span className="">Nombre</span>
        <span className="">Genero</span>
        <span className="">Fecha</span>
        <span className="">Info</span>
      </div>
      <hr className="mx-5 my-2 border-[#191527] border-2" />
      <ShowSongsExtended saved={false} isLoading={loading} songs={page?.content ?? []} />
      <ChangePage
        pageNumber={actualPage}
        maxPage={maxPage ?? 1}
        onClickNext={() => setActualPage((p) => (p ?? 1) + 1)}
        onClickPrevious={() => setActualPage((p) => Math.max((p ?? 1) - 1, 1))}
      />
    </div>
  );
};
