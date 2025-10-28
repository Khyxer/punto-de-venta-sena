import { Loader2 } from "lucide-react";

export const BasicLoader = () => {
  return (
    <div className="h-screen flex items-center justify-center w-full flex-col gap-2">
      <Loader2 className="animate-spin text-primary-color" />
      <p className="text-primary-color select-none">Cargando...</p>
    </div>
  );
};
