import axios from "axios";

class SalesService {
  constructor() {
    this.API_URL =
      import.meta.env.REACT_APP_API_URL || "http://localhost:8080/api";
  }

  async createSale(sale) {
    try {
      const response = await axios.post(`${this.API_URL}/sales`, sale);
      return response.data; // Devuelve la venta creada
    } catch (error) {
      console.error("Error al crear venta:", error);
      throw error;
    }
  }
}


export default new SalesService();
