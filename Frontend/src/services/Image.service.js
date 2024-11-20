class ImageService {
  constructor() {
    this.API_URL =
      import.meta.env.REACT_APP_API_URL || "http://localhost:8080/api";
  }

  async getImage(name) {
    try {
      const url = `${this.API_URL}/uploads/${name}`;
      console.log(`Fetching image from: ${url}`);

      const response = await fetch(url);
      if (!response.ok) {
        throw new Error(`Error al obtener la imagen: ${response.status} ${response.statusText}`);
      }

      const blob = await response.blob();
      const base64 = await this.blobToBase64(blob);
      return base64;
    } catch (error) {
      console.error("Error al obtener imágenes:", error.message);
      throw error;
    }
  }

  blobToBase64(blob) {
    return new Promise((resolve, reject) => {
      const reader = new FileReader();
      reader.onloadend = () => resolve(reader.result.split(",")[1]);
      reader.onerror = reject;
      reader.readAsDataURL(blob);
    });
  }
}

export default new ImageService();
