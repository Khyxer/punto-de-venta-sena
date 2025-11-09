// Validación de formato de documento
export const validNumberDocument = {
  "C.C": /^[0-9]{6,10}$/,
  "T.I": /^[0-9]{10,11}$/,
  "C.E": /^[0-9]{6,7}$/,
  "Pasaporte": /^[A-Z]{1,2}[0-9]{6,9}$/i,
  "Registro Civil": /^[0-9]{10,11}$/,
  "Residencia Temporal": /^[A-Z0-9]{8,15}$/i,
};
