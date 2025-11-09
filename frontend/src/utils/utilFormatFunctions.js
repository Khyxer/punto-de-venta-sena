// formato de texto
export const formatText = (text) => {
  if (!text) return "";
  return text.charAt(0).toUpperCase() + text.slice(1).toLowerCase();
};

// formato de fecha
export const formatDate = (date) => {
  if (!date) return "";
  return new Date(date).toLocaleDateString();
};
