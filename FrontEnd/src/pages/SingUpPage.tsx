import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { signUp } from "../services/authService";
import { useAuth } from "../hooks/useAuth";
import ButtonSubmit from "../components/ButtonSubmit";

const SignUp = () => {
  const navigate = useNavigate();
  const { login } = useAuth();

  const [email, setEmail] = useState("");
  const [username, setUser] = useState("");
  const [password, setPassword] = useState("");
  const [password2, setPassword2] = useState("");
  const [error, setError] = useState("");
  const [passwordError, setPasswordError] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!email || !password) {
      setError("Por favor completa todos los campos");
      return;
    }

    if (password !== password2) {
      setError("Las contraseñas no coinciden");
      setPasswordError(true);
      return;
    }

    setPasswordError(false); // si todo está bien

    // llamada a tu backend (Spring Boot)
    try {
      const response = await signUp({ email, username, password });

      // Guardar en AuthContext + localStorage
      login(response);

      navigate("/userhome");
    } catch {
      setError("No se pudo crear la cuenta");
    }

  };

  return (
    <div
      className="min-h-screen flex items-center justify-center bg-gray-900"
      style={{ backgroundImage: "url('/bandaTocando.png')" }}
    >
      <div className="absolute inset-0 bg-black/70"></div>
      <div className="w-full max-w-md bg-[#1A192A] rounded-2xl shadow-lg p-8 relative z-10 justify-center">
        <h2 className="text-3xl font-bold text-white text-center mb-6">
          Registrarse
        </h2>

        {error && (
          <p className="text-red-400 text-sm text-center mb-4">{error}</p>
        )}

        <form onSubmit={handleSubmit} className="space-y-5">
          <div>
            <label className="block text-gray-300 mb-1">Correo</label>
            <input
              type="email"
              className="w-full px-4 py-2 rounded-lg bg-gray-700 text-white focus:outline-none focus:ring-2 focus:ring-green-500"
              placeholder="correo@ejemplo.com"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
          </div>

          <div>
            <label className="block text-gray-300 mb-1">
              Nombre de usuario
            </label>
            <input
              type="text"
              className="w-full px-4 py-2 rounded-lg bg-gray-700 text-white focus:outline-none focus:ring-2 focus:ring-green-500"
              placeholder="ingrese su nombre de usuario"
              value={username}
              onChange={(e) => setUser(e.target.value)}
            />
          </div>

          <div>
            <label className="block text-gray-300 mb-1">
              Introduzca su contraseña
            </label>
            <input
              type="password"
              className="w-full px-4 py-2 rounded-lg bg-gray-700 text-white focus:outline-none focus:ring-2 focus:ring-green-500"
              placeholder="********"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
          </div>

          <div>
            <label className="block text-gray-300 mb-1">
              Vuelva a introducir la contraseña
            </label>
            <input
              type="password"
              className={`w-full px-4 py-2 rounded-lg bg-gray-700 text-white focus:outline-none focus:ring-2 
								${passwordError ? "border border-red-500 focus:ring-red-500" : "focus:ring-green-500"}`}
              placeholder="********"
              value={password2}
              onChange={(e) => {
                setPassword2(e.target.value);
                setPasswordError(false); // se limpia al escribir
              }}
            />
          </div>

          <ButtonSubmit text="Crear" color="purple"/>
          
        </form>

        <p className="text-gray-400 text-sm text-center mt-6">
          ¿Ya tienes cuenta?{" "}
          <span
            className="text-[#58BDDE] cursor-pointer hover:underline"
            onClick={() => navigate("/signin")}
          >
            Iniciar Sesión
          </span>
        </p>
      </div>
    </div>
  );
};

export default SignUp;