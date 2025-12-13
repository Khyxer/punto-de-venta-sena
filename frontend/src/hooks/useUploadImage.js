import { resizeImage } from "../utils/utilResizeImage.js";

/**
 * Sube una imagen a ImgBB y retorna su URL
 * @param {File} image - Archivo de imagen a subir
 * @param {string} [album="pos"] - Nombre del álbum en ImgBB
 * @param {boolean} [optimize=true] - Si es true, redimensiona la imagen a máximo 100px
 * @param {number} [resize=300] - Tamaño máximo de la imagen en píxeles
 * @returns {Promise<string>} URL de la imagen subida
 * @throws {Error} Si falla la subida o la optimización
 */
export const uploadImg = async (
  image,
  album = "pos",
  optimize = true,
  resize = 300
) => {
  // Optimizar la imagen
  if (optimize) {
    image = await resizeImage(image, resize);
  }

  const formData = new FormData();
  formData.append("image", image);
  formData.append("album", album);

  try {
    const response = await fetch(
      `https://api.imgbb.com/1/upload?key=${import.meta.env.VITE_API_IMGBB}`,
      {
        method: "POST",
        body: formData,
      }
    );

    const data = await response.json();

    if (data.success) {
      return data.data.url; // Url de la imagen
    } else {
      throw new Error(data.error?.message || "Error al subir imagen");
    }
  } catch (error) {
    console.error("Error subiendo imagen:", error);
    throw error;
  }
};
