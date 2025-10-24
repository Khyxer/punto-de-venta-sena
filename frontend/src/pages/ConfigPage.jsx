import { configMenu } from "../constants/constConfigPageNavMenu";
import { Link } from "react-router-dom";
import { useState } from "react";
import React from "react";

export const ConfigPage = () => {
  const [currentOption, setCurrentOption] = useState(0);
  return (
    <section className="h-full flex">
      {/* menu de navegación */}
      <aside className=" border-primary-color border-r h-full p-4 select-none">
        <nav>
          {configMenu.map((item, index) => (
            <Link
              key={index}
              to={item.path}
              onClick={() => setCurrentOption(index)}
              className={`flex items-center gap-3 px-3 py-2 duration-100 rounded-lg
                        ${
                          currentOption === index
                            ? " bg-primary-color text-light-color"
                            : " hover:bg-gray-200 text-gray-600 hover:text-black"
                        }
                    `}
            >
              <item.icon className="w-5" />
              <p className="text-sm">{item.name}</p>
            </Link>
          ))}
        </nav>
      </aside>

      {/* contenido */}
      <main className="p-4 flex-1">
        {React.createElement(configMenu[currentOption].component)}
      </main>
    </section>
  );
};
