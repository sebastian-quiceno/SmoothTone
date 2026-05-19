import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useArtist } from "../hooks/useArtist";
import ButtonSubmit from "../components/ButtonSubmit";

import genre from "/genre.jpg";

const GenreForm = () => {
  const navigate = useNavigate();

  const [name, setName] = useState("");
  const [biography, setBiography] = useState("");
  const [formError, setFormError] = useState<string | null>(null);

  const { createArtist, loading, error: apiError } = useArtist();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    // 1. Resetear errores
    setFormError(null);

    // 2. Validación del lado cliente
    if (!name.trim()) {
      setFormError("El nombre es obligatorio");
      return;
    }

    if (name.length < 3) {
      setFormError("El nombre debe tener al menos 3 caracteres");
      return;
    }
    if (!biography.trim()) {
      setFormError("La Biografia es obligatoria");
      return;
    }

    await createArtist({ name, biography });

    // (opcional) limpiar si no hay error del backend
    if (!apiError) {
      setName("");
      setBiography("");

      navigate("/userhome");
    }
  };

  if (loading) return <p>Cargando...</p>;
  if (apiError) return <p>{apiError}</p>;

  return (
    <div
      className="min-h-screen flex items-center justify-center bg-gray-900"
      style={{
        backgroundImage: `url(${genre})`,
        backgroundSize: "cover",
        backgroundPosition: "center",
      }}
    >
      <div className="absolute inset-0 bg-black/70"></div>
      <div className="w-full max-w-md bg-[#192a29] rounded-2xl shadow-lg p-8 relative z-10 justify-center">
        <h2 className="text-3xl font-bold text-white text-center mb-6">
          ¡Agrega a tu Artista!
        </h2>

        {formError && (
          <p className="text-red-400 text-sm text-center mb-4">{formError}</p>
        )}

        <form onSubmit={handleSubmit} className="space-y-5">
          <div>
            <label className="block text-gray-300 mb-1">
              Nombre del Artista
            </label>
            <input
              type="text"
              className="w-full px-4 py-2 rounded-lg bg-[#364747] text-white focus:outline-none focus:ring-2 focus:ring-green-500"
              placeholder="ingrese el nombre del Artista..."
              value={name}
              onChange={(e) => setName(e.target.value)}
            />
          </div>

          <div>
            <label className="block text-gray-300 mb-1">Biografia</label>
            <textarea
              value={biography}
              onChange={(e) => setBiography(e.target.value)}
              placeholder="Ingresa acerca del artista..."
              rows={4}
              className="w-full px-4 py-2 rounded-lg bg-[#364747] text-white focus:outline-none focus:ring-2 focus:ring-green-500"
            />
          </div>


          <ButtonSubmit text="Crear Artista" color="orange"/>
        </form>

        <span
          className="text-[#58BDDE] cursor-pointer hover:underline flex justify-center mt-2"
          onClick={() => navigate("/userhome")}
        >
          Volver al inicio
        </span>
      </div>
    </div>
  );
};

export default GenreForm;
