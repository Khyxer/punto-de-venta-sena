import { configMenu } from "../constants/configPageNavMenu";
import { Link } from "react-router-dom";
import { useState } from "react";

export const ConfigPage = () => {
  const [currentOption, setCurrentOption] = useState(configMenu[0]);
  return (
    <section className="h-full flex">
      <aside className=" border-primary-color border-r h-full p-4">
        {/* <header className="mb-2">
          <h1 className="font-medium text-dark-color">Configuración</h1>
        </header> */}
        <nav>
          {configMenu.map((item, index) => (
            <Link
              key={index}
              to={item.path}
              onClick={() => setCurrentOption(item.path)}
              className={`flex items-center gap-3 px-3 py-2 duration-100 rounded-lg
                        ${
                          currentOption === item.path
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
    </section>
  );
};
