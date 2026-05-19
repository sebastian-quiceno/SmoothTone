import axios from "axios";

// Configuración base
const apiClient = axios.create({
  baseURL: "http://localhost:8080/api",

  headers: {
    "Content-Type": "application/json",
  },
});

// Interceptor REQUEST
apiClient.interceptors.request.use(
  (config) => {

    // Obtener auth del localStorage
    const storedAuth =
      localStorage.getItem("auth");

    if (storedAuth) {

      const auth = JSON.parse(storedAuth);

      const token = auth.token;

      if (token) {
        config.headers.Authorization =
          `Bearer ${token}`;
      }
    }

    return config;
  },

  (error) => {
    return Promise.reject(error);
  }
);

// Interceptor RESPONSE
apiClient.interceptors.response.use(
  (response) => response,

  (error) => {

    // Token inválido o expirado
    if (error.response?.status === 401) {

      // Limpiar sesión
      localStorage.removeItem("auth");

      // Redireccionar login
      window.location.href = "/signin";
    }

    return Promise.reject(error);
  }
);

export default apiClient;