import { FileText, Plus, Search } from "lucide-react";
import { BlobProvider } from "@react-pdf/renderer";

export const HeaderConfig = ({
  placeholderInput,
  buttonText,
  onClickButton,
  valueInput,
  onChangeInput,
  documentToRender,
}) => {
  return (
    <header className="flex items-center w-full justify-between">
      <div className="border rounded-md  border-gray-500 flex items-center pl-2 w-full focus-within:ring-2 focus-within:ring-primary-color focus-within:ring-offset-2 duration-150 max-w-lg">
        <Search />
        <input
          type="text"
          placeholder={placeholderInput}
          className="focus:outline-none p-2 w-full select-none"
          value={valueInput}
          onChange={onChangeInput}
        />
      </div>

      <div className="flex items-center gap-4">
        {/** Boton para ver un reporte en formato pdf
         * Solo se genera si hay un documento PDF disponible
         */}
        {documentToRender && (
          <BlobProvider document={documentToRender} key={Date.now()}>
            {({ url, loading }) => (
              <a
                href={url || "#"}
                target="_blank"
                rel="noopener noreferrer"
                className={`
                    flex items-center gap-2 text-nowrap border border-primary-color hover:bg-primary-color/10 text-primary-color rounded-md px-4 py-2 h-full w-fit cursor-pointer duration-150 hover:scale-105
                    ${loading ? "opacity-50 cursor-not-allowed" : ""}
                  `}
                onClick={(e) => loading && e.preventDefault()}
              >
                <FileText size={20} />
                {loading ? "Generando..." : "Ver PDF"}
              </a>
            )}
          </BlobProvider>
        )}

        {/** Boton para crear un nuevo registro */}
        <button
          onClick={onClickButton}
          className="flex items-center gap-2 text-nowrap bg-primary-color text-light-color rounded-md px-4 py-2 h-full w-fit cursor-pointer duration-150 group hover:scale-105"
        >
          <Plus className="group-hover:rotate-90 duration-150" />
          {buttonText}
        </button>
      </div>
    </header>
  );
};
