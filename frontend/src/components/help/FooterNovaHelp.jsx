import { Mail, Phone, Send, Github } from "lucide-react";

const ENLACES_RAPIDOS = [
  { href: "/ayuda", texto: "Centro de Ayuda" },
  { href: "/tutoriales", texto: "Tutoriales" },
];

const ENLACES_SOPORTE = [
  { href: "/contacto", texto: "Contactar Soporte" },
  { href: "/reportar", texto: "Reportar un Problema" },
];

const REDES_SOCIALES = [
  { Icon: Github, href: "https://github.com/Khyxer/punto-de-venta-sena" },
];

const ENLACES_LEGALES = [
  { href: "/privacidad", texto: "Política de Privacidad" },
  { href: "/terminos", texto: "Términos de Servicio" },
];

const FooterSection = ({ titulo, enlaces }) => (
  <div className="md:col-span-1">
    <h3
      className="font-semibold text-gray-800 mb-4 text-base"
      style={{
        margin: "0 0 1rem 0",
        color: "var(--color-primary-color)",
        borderBottom: "none",
        paddingBottom: "0",
      }}
    >
      {titulo}
    </h3>
    <ul
      className="space-y-2"
      style={{ listStyle: "none", margin: "0", padding: "0" }}
    >
      {enlaces.map((enlace) => (
        <li key={enlace.href} style={{ margin: "0" }}>
          <a
            href={enlace.href}
            className="text-sm text-gray-600 hover:text-primary-color transition-colors no-underline"
          >
            {enlace.texto}
          </a>
        </li>
      ))}
    </ul>
  </div>
);

export const FooterNovaHelp = () => {
  return (
    <footer className="mt-15 border-t border-primary-color bg-gradient-to-b from-white to-gray-50">
      <div className="px-8 py-8">
        {/* Sección principal */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8 mb-8">
          {/* Columna del logo y descripción */}
          <div className="md:col-span-1">
            <img
              src="/LogoMain.png"
              alt="Logo Nova"
              className="h-20 mb-4 select-none"
              style={{
                border: "none",
                boxShadow: "none",
                borderRadius: "0",
                margin: "0 0 1rem 0",
                objectFit: "contain",
              }}
            />
            <p className="text-xs text-gray-600 leading-relaxed">
              Soluciones innovadoras para impulsar tu negocio hacia el futuro.
            </p>
          </div>

          {/* Enlaces rápidos */}
          <FooterSection titulo="Enlaces Rápidos" enlaces={ENLACES_RAPIDOS} />

          {/* Soporte */}
          <FooterSection titulo="Soporte" enlaces={ENLACES_SOPORTE} />

          {/* Columna de contacto */}
          <div className="md:col-span-1">
            <h3
              className="font-semibold text-gray-800 mb-4 text-base"
              style={{
                margin: "0 0 1rem 0",
                color: "var(--color-primary-color)",
                borderBottom: "none",
                paddingBottom: "0",
              }}
            >
              Contacto
            </h3>
            <div className="space-y-3">
              <p
                className="text-sm text-gray-600 flex items-center gap-2"
                style={{ margin: "0" }}
              >
                <Mail className="w-4 h-4" />
                soporte@nova.com
              </p>
              <p
                className="text-sm text-gray-600 flex items-center gap-2"
                style={{ margin: "0" }}
              >
                <Phone className="w-4 h-4" />
                +57 (1) 234-5678
              </p>
              <div className="flex gap-3 mt-4">
                {REDES_SOCIALES.map(({ Icon, href }, index) => (
                  <a
                    key={index}
                    href={href}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-gray-400 hover:text-primary-color transition-colors"
                  >
                    <Icon className="w-5 h-5" />
                  </a>
                ))}
              </div>
            </div>
          </div>
        </div>

        {/* Divider */}
        <div className="border-t border-gray-200 pt-6">
          <div className="flex flex-col md:flex-row justify-between items-center gap-4">
            <p
              className="text-sm text-gray-500 text-center md:text-left"
              style={{ margin: "0" }}
            >
              © 2025 Nova. Todos los derechos reservados.
            </p>
            <div className="flex gap-6">
              {ENLACES_LEGALES.map((enlace) => (
                <a
                  key={enlace.href}
                  href={enlace.href}
                  className="text-sm text-gray-500 hover:text-primary-color transition-colors no-underline"
                >
                  {enlace.texto}
                </a>
              ))}
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};
