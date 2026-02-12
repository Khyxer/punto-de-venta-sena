/**
 * Redimensiona una imagen manteniendo su relación de aspecto
 * @param {File} file - Archivo de imagen a redimensionar
 * @param {number} maxSize - Tamaño máximo en píxeles para el lado más largo
 * @returns {Promise<File>} Archivo de imagen redimensionado
 */

export const resizeImage = (file, maxSize) => {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();

    reader.onload = (e) => {
      const img = new Image();

      img.onload = () => {
        // Calcular nuevas dimensiones manteniendo aspecto
        let newWidth, newHeight;

        if (img.width > img.height) {
          newWidth = Math.min(maxSize, img.width);
          newHeight = Math.round((img.height / img.width) * newWidth);
        } else {
          newHeight = Math.min(maxSize, img.height);
          newWidth = Math.round((img.width / img.height) * newHeight);
        }

        // Solo redimensionar si la imagen es más grande que maxSize
        if (img.width <= maxSize && img.height <= maxSize) {
          resolve(file); // Retornar imagen original
          return;
        }

        // Crear canvas y redimensionar
        const canvas = document.createElement("canvas");
        canvas.width = newWidth;
        canvas.height = newHeight;

        const ctx = canvas.getContext("2d");
        ctx.drawImage(img, 0, 0, newWidth, newHeight);

        // Convertir canvas a Blob/File
        canvas.toBlob(
          (blob) => {
            if (blob) {
              // Crear un nuevo File con el mismo nombre
              const resizedFile = new File([blob], file.name, {
                type: "image/jpeg",
                lastModified: Date.now(),
              });
              resolve(resizedFile);
            } else {
              reject(new Error("Error al crear blob"));
            }
          },
          "image/jpeg",
          0.9
        ); // Calidad 90%
      };

      img.onerror = () => reject(new Error("Error al cargar imagen"));
      img.src = e.target.result;
    };

    reader.onerror = () => reject(new Error("Error al leer archivo"));
    reader.readAsDataURL(file);
  });
};
