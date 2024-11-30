import axios from "axios";

const API_URL = "http://localhost:8080/api/auth";

/**
 * Obtener el perfil del usuario por ID
 * @param {number} id
 * @returns {Promise<Object>}
 */
export const obtenerPerfil = async (id) => {
  try {
    const response = await axios.get(`${API_URL}/profile/${id}`, {
      headers: {
        Authorization: `Bearer ${localStorage.getItem("token")}`, 
      },
    });
    return response.data;
  } catch (error) {
    console.error("Error al obtener el perfil:", error);
    throw error;
  }
};

