import { useState, useEffect, useRef } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { AsideHelp } from "../components/help/AsideHelp";
import { HelpSection } from "../components/help/HelpSection";
import { helpSections } from "../constants/constAsideHelpNavMenu";
import { BestLoader } from "../components/loaders/BestLoader";
import { FooterNovaHelp } from "../components/help/FooterNovaHelp";

export const HelpPage = () => {
  const { section } = useParams();
  const navigate = useNavigate();
  const mainRef = useRef(null);
  const [content, setContent] = useState("");
  const [loading, setLoading] = useState(true);
  const [navSection, setNavSection] = useState({
    prev: { id: null, name: null, path: null },
    next: { id: null, name: null, path: null },
  });

  useEffect(() => {
    function getNavSection() {
      const sectionIndex = helpSections.findIndex(
        (sections) => sections.id === section,
      );

      // solo 1 (esto nunca se usara ya que habran varios pero durante desarollo evita que se rompa)
      if (helpSections.length === 1) {
        setNavSection({
          prev: { id: null, name: null, path: null },
          next: { id: null, name: null, path: null },
        });
        return;
      }

      if (sectionIndex === 0) {
        setNavSection({
          prev: { id: null, name: null, path: null },
          next: {
            id: helpSections[sectionIndex + 1].id,
            name: helpSections[sectionIndex + 1].name,
            path: helpSections[sectionIndex + 1].id,
          },
        });
      } else if (sectionIndex === helpSections.length - 1) {
        setNavSection({
          prev: {
            id: helpSections[sectionIndex - 1].id,
            name: helpSections[sectionIndex - 1].name,
            path: helpSections[sectionIndex - 1].id,
          },
          next: { id: null, name: null, path: null },
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
    }
    getNavSection();
  }, [section]);

  useEffect(() => {
    if (!section) {
      navigate(`/ayuda/${helpSections[0].id}`, { replace: true });
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
      .catch(() => {
        setContent("# Error\n\nNo se encontró la sección de ayuda solicitada.");
        setLoading(false);
      });
  }, [section]);

  useEffect(() => {
    if (!loading && mainRef.current) {
      requestAnimationFrame(() => {
        if (mainRef.current) {
          mainRef.current.scrollTop = 0;
        }
      });
    }
  }, [loading]);

  if (loading) {
    return (
      <main className="flex h-screen items-center justify-center">
        <BestLoader />
      </main>
    );
  }

  return (
    <main ref={mainRef} className="flex h-full overflow-y-auto custom-scroll">
      <AsideHelp content={content} />

      <section className="max-w-5xl">
        <HelpSection content={content} navSection={navSection} />
        <FooterNovaHelp />
      </section>
    </main>
  );
};
