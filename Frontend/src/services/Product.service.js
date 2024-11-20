import axios from "axios";

class ProductService {
  constructor() {
    debugger;
    this.API_URL = import.meta.env.REACT_APP_API_URL || "http://localhost:8080/api";
  }

  /**
   * Obtiene todos los productos
   * @returns {Promise} Promesa con la lista de productos
   */
  async getAllProducts() {
    try {
      const response = await axios.get(`${this.API_URL}/products`);
      return response.data; // Devuelve los datos de la respuesta
    } catch (error) {
      console.error("Error al obtener productos:", error);
      throw error;
    }
  }

  /**
   * Obtiene un producto por su ID
   * @param {number} id - ID del producto
   * @returns {Promise} Promesa con los datos del producto
   */
  async getProductById(id) {
    try {
      const response = await axios.get(`${this.API_URL}/products/${id}`);
      return response.data; // Devuelve el producto encontrado
    } catch (error) {
      console.error(`Error al obtener el producto con ID ${id}:`, error);
      throw error;
    }
  }

  /**
   * Crea un nuevo producto
   * @param {Object} product - Objeto con los datos del producto
   * @returns {Promise} Promesa con el producto creado
   */
  async createProduct(product) {
    try {
      const response = await axios.post(`${this.API_URL}/products`, product);
      return response.data; // Devuelve el producto creado
    } catch (error) {
      console.error("Error al crear producto:", error);
      throw error;
    }
  }

  /**
   * Actualiza un producto por su ID
   * @param {number} id - ID del producto
   * @param {Object} product - Objeto con los datos actualizados del producto
   * @returns {Promise} Promesa con el producto actualizado
   */
  async updateProduct(id, product) {
    try {
      const response = await axios.put(
        `${this.API_URL}/products/${id}`,
        product
      );
      return response.data; // Devuelve el producto actualizado
    } catch (error) {
      console.error(`Error al actualizar el producto con ID ${id}:`, error);
      throw error;
    }
  }

  /**
   * Elimina un producto por su ID
   * @param {number} id - ID del producto
   * @returns {Promise} Promesa indicando si se eliminó correctamente
   */
  async deleteProduct(id) {
    try {
      const response = await axios.delete(`${this.API_URL}/products/${id}`);
      return response.status === 200; // Devuelve true si se eliminó correctamente
    } catch (error) {
      console.error(`Error al eliminar el producto con ID ${id}:`, error);
      throw error;
    }
  }
}

// Exporta una instancia única del servicio
export default new ProductService();
