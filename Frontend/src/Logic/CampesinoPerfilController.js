import axios from "axios";
export const registrarCampesino = async (datos) => {
  try {
    const response = await axios.post(
      "http://localhost:8080/campesinos/registro",
      datos
    );
    return response.data;
  } catch (error) {
    console.log("Error:", error);
    throw error;
  }
};

