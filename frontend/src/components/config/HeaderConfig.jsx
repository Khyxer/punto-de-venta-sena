import { Plus, Search } from "lucide-react";

export const HeaderConfig = ({ placeholderInput, buttonText, onClickButton, valueInput, onChangeInput }) => {
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

      <button onClick={onClickButton} className="flex items-center gap-2 text-nowrap bg-primary-color text-light-color rounded-md px-4 py-2 h-full w-fit cursor-pointer duration-150">
        <Plus />
        {buttonText}
      </button>
    </header>
  );
};
