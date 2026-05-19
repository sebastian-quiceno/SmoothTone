import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { ImageUpload } from "../components/ImageUpload";
import { SongUpload } from "../components/SongUpload";
import { SearchBar } from "../components/SearchBar";
import ButtonSubmit from "../components/ButtonSubmit";
import SongCard from "../components/SongCard";

import { type Genre } from "../types/genre";
import { type Artist } from "../types/artist";

import { useGenreFilter } from "../hooks/useGenreFilter";
import { useArtistFilter } from "../hooks/useArtistFilter";
import { useSongs } from "../hooks/useSongs";
import { useAuth } from "../hooks/useAuth";

import songUpload from "/SongUpload.jpg";
import portraitNotFound from "/portraitNotFound.jpg";

const SongForm = () => {
  //CAMBIAR

  const navigate = useNavigate();
  const { userId } = useAuth();

  const [formError, setFormError] = useState<string | null>(null);

  const [title, setTitle] = useState<string>("");
  //CORREGIR
  const [genre, setGenre] = useState<Genre | null>(null);
  const [queryGenre, setQueryGenre] = useState<string>("");

  const [artist, setArtist] = useState<Artist | null>(null);
  const [queryArtist, setQueryArtist] = useState<string>("");

  const [song, setSong] = useState<File | null>(null);
  const [image, setImage] = useState<File | null>(null);

  const { genresFilters, loading: loadingGenres } = useGenreFilter(queryGenre);
  const { artistsFilters, loading: loadingArtists } =
    useArtistFilter(queryArtist);
  const { loading: loadingApi, error: apiError, uploadSong } = useSongs();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    // 1. Resetear errores
    setFormError(null);

    // 2. Validación del lado cliente
    if (!title.trim()) {
      setFormError("El nombre de la canción es obligatorio");
      return;
    }

    if (title.length < 3) {
      setFormError("El nombre debe tener al menos 3 caracteres");
      return;
    }
    if (!artist) {
      setFormError("Es obligatorio escoger el artista");
      return;
    }
    if (!genre) {
      setFormError("Es obligatorio escoger el genero de la cancion");
      return;
    }
    if (!song) {
      setFormError("Agregue la cancion porfavor");
      return;
    }
    if (!image) {
      setFormError("Es obligatorio la caratula");
      return;
    }
    if (userId === null) {
      setFormError("No se pudo identificar el usuario autenticado");
      return;
    }

    await uploadSong({
      song,
      image,
      title,
      artistId: artist.id,
      userId,
      genreId: genre.id,
    });

    // (opcional) limpiar si no hay error del backend
    if (!apiError) {
      setSong(null);
      setImage(null);
      setTitle("");
      setArtist(null);
      setGenre(null);

      navigate("/userhome");
    }
  };

  if (loadingApi) return <p>Cargando...</p>;
  if (loadingGenres) return <p>Cargando Generos...</p>;
  if (loadingArtists) return <p>Cargando Artistas...</p>;

  return (
    <div
      className="min-h-screen flex items-center justify-center gap-20"
      style={{
        backgroundImage: `url(${songUpload})`,
        backgroundSize: "cover",
        backgroundPosition: "center",
      }}
    >
      <div className="fixed inset-0 bg-[#0F002C85]" />
      <form
        onSubmit={handleSubmit}
        className="w-full max-w-md bg-[#1A192A] rounded-2xl flex flex-col gap-5 my-10 shadow-lg p-8 relative z-10 justify-center items-center"
      >
        <h2 className="text-3xl font-bold text-white text-center mb-2">
          ¡Agrega tu canción!
        </h2>
        {formError && (
          <p className="text-red-400 text-sm text-center mb-4">{formError}</p>
        )}
        <div>
          <label className="block text-gray-300 mb-1">
            Nombre de la cancion
          </label>
          <input
            type="text"
            className={`w-[350px] px-4 py-2 rounded-lg  ${title ? "bg-green-300/70 " : "bg-white/10"} text-white focus:outline-none focus:ring-2 focus:ring-white/20 transition-all duration-300`}
            placeholder="ingrese el nombre de la canción"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
          />
        </div>
        <div>
          <label className="text-gray-300 mb-1">Artista de la cancion</label>
          <SearchBar<Artist>
            value={queryArtist}
            onChange={setQueryArtist}
            results={artistsFilters}
            loading={loadingArtists}
            placeholder="Buscar Artista..."
            keyExtractor={(p) => p.id}
            renderItem={(p) => p.name}
            onSelect={(item) => {
              console.log("Artista seleccionado:", item);
              setArtist(item);
            }}
          />
        </div>
        <div>
          <label className="text-gray-300 mb-1">Genero de la cancion</label>
          <SearchBar<Genre>
            value={queryGenre}
            onChange={setQueryGenre}
            results={genresFilters}
            loading={loadingGenres}
            placeholder="Buscar Genero..."
            keyExtractor={(p) => p.id}
            renderItem={(p) => p.name}
            onSelect={(item) => {
              console.log("Genero seleccionado:", item);
              setGenre(item);
            }}
          />
        </div>
        <div>
          <label className="block text-gray-300 mb-1">Canción</label>
          <SongUpload onFileSelect={setSong} />
        </div>
        <div>
          <label className="block text-gray-300 mb-1">Caratula</label>
          <ImageUpload onImageSelect={setImage} />
        </div>

        <ButtonSubmit text="Crear Genero" color="purple" />
        <span
          className="text-[#58BDDE] cursor-pointer hover:underline flex justify-center mt-2"
          onClick={() => navigate("/userhome")}
        >
          Volver al inicio
        </span>
      </form>
      <div className="w-full max-w-80 bg-[#1A192A] rounded-2xl flex flex-col gap-5 shadow-lg p-8 relative z-10 justify-center items-center">
        <h2 className="text-3xl font-bold text-white text-center mb-2">
          Vista previa
        </h2>
        <SongCard
          id={0}
          artist={artist ? artist.name : "Agregue el nombre del artista "}
          title={title ? title : "Agregue el nombre de la canción"}
          img={image ? URL.createObjectURL(image) : portraitNotFound}
        />
      </div>
    </div>
  );
};

export default SongForm;
