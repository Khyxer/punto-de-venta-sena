import { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { AsideHelp } from "../components/help/AsideHelp";
import { HelpSection } from "../components/help/HelpSection";
import { helpSections } from "../constants/constAsideHelpNavMenu";
import { BestLoader } from "../components/loaders/BestLoader";
import { FooterNovaHelp } from "../components/help/FooterNovaHelp";
import { ChevronRight } from "lucide-react";

export const HelpPage = () => {
  const { section } = useParams();
  const navigate = useNavigate();
  const [content, setContent] = useState("");
  const [loading, setLoading] = useState(true);
  const [navSection, setNavSection] = useState({
    prev: {
      id: null,
      name: null,
      path: null,
    },
    next: {
      id: null,
      name: null,
      path: null,
    },
  });

  useEffect(() => {
    function getNavSection() {
      const sectionIndex = helpSections.findIndex(
        (sections) => sections.id === section,
      );

      if (sectionIndex === 0) {
        setNavSection({
          prev: {
            id: null,
            name: null,
            path: null,
          },
          next: {
            id: helpSections[sectionIndex + 1].id,
            name: helpSections[sectionIndex + 1].name,
            path: helpSections[sectionIndex + 1].id,
          },
        });
      } else if (sectionIndex === helpSections.length) {
        setNavSection({
          prev: {
            id: helpSections[sectionIndex - 1].id,
            name: helpSections[sectionIndex - 1].name,
            path: helpSections[sectionIndex - 1].id,
          },
          next: {
            id: null,
            name: null,
            path: null,
          },
        });
      } else {
        setNavSection({
          prev: {
            id: helpSections[sectionIndex - 1].id,
            name: helpSections[sectionIndex - 1].name,
            path: helpSections[sectionIndex - 1].id,
          },
          next: {
            id: helpSections[sectionIndex + 1].id,
            name: helpSections[sectionIndex + 1].name,
            path: helpSections[sectionIndex + 1].id,
          },
        });
      }

      // console.log(section);
      // console.log(helpSections);
      // console.log(sectionIndex);
    }
    getNavSection();
  }, [section]);

  // console.log(section);
  // console.log(helpSections);

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
      <main className="flex h-screen items-center justify-center">
        <BestLoader />
      </main>
    );
  }

  return (
    <main className="flex h-full overflow-y-auto custom-scroll">
      <AsideHelp content={content} />

      <section className="max-w-5xl">
        <HelpSection content={content} navSection={navSection} />

        <FooterNovaHelp />
      </section>
    </main>
  );
};
