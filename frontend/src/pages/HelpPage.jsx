import { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { AsideHelp } from "../components/help/AsideHelp";
import { HelpSection } from "../components/help/HelpSection";
import { helpSections } from "../constants/constAsideHelpNavMenu";

export const HelpPage = () => {
  const { section } = useParams();
  const navigate = useNavigate();
  const [content, setContent] = useState("");
  const [loading, setLoading] = useState(true);

  // Si no hay sección, redirigir a la primera
  useEffect(() => {
    if (!section) {
      navigate(`/help/${helpSections[0].id}`, { replace: true });
    }
  }, [section, navigate]);

  useEffect(() => {
    if (!section) return;

    setLoading(true);

    fetch(`/help/${section}.md`)
      .then((res) => {
        if (!res.ok) throw new Error("No encontrado");
        return res.text();
      })
      .then((text) => {
        setContent(text);
        setLoading(false);
      })
      .catch((err) => {
        setContent("# Error\n\nNo se encontró la sección de ayuda solicitada.");
        setLoading(false);
      });
  }, [section]);

  if (loading) {
    return (
      <main className="flex">
        <div className="w-72 border-r"></div>
        <div className="flex-1 flex items-center justify-center">
          <p className="text-gray-500">Cargando...</p>
        </div>
      </main>
    );
  }

  return (
    <main className="flex h-full overflow-y-auto">
      <AsideHelp content={content} />
      <div className="flex-1 max-w-5xl">
        <HelpSection content={content} />
      </div>
    </main>
  );
};
