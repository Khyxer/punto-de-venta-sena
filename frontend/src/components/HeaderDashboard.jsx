import { LogOut } from "lucide-react";
import { useAuthContext } from "../contexts/auth/useAuthContext";
import { formatText } from "../utils/formatText";

export const HeaderDashboard = () => {
  const { currentUser } = useAuthContext();

  return (
    <header className="h-16 border-primary-color border-b p-2 px-5">
      <div className="h-full flex items-center gap-3 w-fit ml-auto">
        {/* Foto de perfil */}
        <img
          // esto solo es de prueba
          src="https://static.vecteezy.com/system/resources/previews/063/477/498/non_2x/illustration-of-generic-male-avatar-in-gray-tones-for-anonymous-profile-placeholder-with-neutral-expression-designed-for-use-in-online-platforms-and-social-media-vector.jpg"
          alt="Perfil"
          className="aspect-square h-full object-cover rounded-full ring-2 ring-primary-color select-none"
          draggable={false}
        />

        {/* Información del usuario */}
        <div className="mr-3">
          <h2 className="font-medium leading-4 text-lg">
            {formatText(currentUser.name) + " " + formatText(currentUser.lastName)}
          </h2>
          <p className="text-sm text-dark-color">{formatText(currentUser.role)}</p>
        </div>

        {/* Botón de configuración
        <Link to="/config">
          <button className="bg-accent-color/30 text-light-color rounded-md w-9 aspect-square flex items-center justify-center cursor-pointer">
            <Settings className="text-accent-color" />
          </button>
        </Link> */}
        {/* Botón de cerrar sesión */}
        <button
          onClick={() => {
            localStorage.removeItem("token");
            window.location.href = "/auth";
          }}
          className="bg-error-color/30 text-light-color rounded-md w-9 aspect-square flex items-center justify-center cursor-pointer"
        >
          <LogOut className="text-error-color" />
        </button>
      </div>
    </header>
  );
};
