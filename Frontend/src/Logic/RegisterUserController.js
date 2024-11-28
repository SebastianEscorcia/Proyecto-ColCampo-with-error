import axios from 'axios';

const API_URL = 'http://localhost:8080/api';

export const registrarUsuario = async (data) => {
  try {
    const response = await axios.post(`${API_URL}/person/register`, data, {
      headers: {
        "Content-Type": "application/json",
      },
    });

    // Retornar directamente los datos
    return response.data;
  } catch (error) {
    if (error.response) {
      // Errores que vienen del backend
      console.error("Error en el registro:", error.response.data);
      throw new Error(error.response.data.message || "Error en el registro");
    } else {
      // Otros errores (problemas de conexión, etc.)
      console.error("Error al registrar el usuario:", error.message);
      throw new Error("No se pudo conectar con el servidor");
    }
  }
};
