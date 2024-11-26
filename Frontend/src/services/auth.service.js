import axios from "axios";

class AuthService {
  constructor() {
    this.API_URL =
      import.meta.env.REACT_APP_API_URL || "http://localhost:8080/api";
  }

  async login(usuario) {
    try {
      const response = await axios.post(`${this.API_URL}/auth/login`, usuario);
      return response.data;
    } catch (error) {
      console.error("Error al iniciar sesión:", error);
      throw error;
    }
  }
}


export default new AuthService();