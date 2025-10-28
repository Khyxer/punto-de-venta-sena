// BORRAR ESTO SI NO LO TERMINO USANDO

import { HeaderConfig } from "./HeaderConfig";

export const ContactSupplierSection = () => {
  return (
    <section className="w-full mx-auto max-w-5xl">
      <HeaderConfig
        placeholderInput="Buscar contacto"
        buttonText="Nuevo Contacto"
      />
    </section>
  );
};
