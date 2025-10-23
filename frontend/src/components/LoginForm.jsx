import { MainButton } from "../UI/UiButtons";
import { FormInput } from "../UI/UiInputs";
import { useHandleLogin } from "../hooks/auth/useHandleLogin";

export const LoginForm = () => {
  const { handleLogin, loginFormData, setLoginFormData, loading, error } =
    useHandleLogin();
  return (
    <form
      onSubmit={handleLogin}
      className="px-5 py-7 bg-white border border-dark-color rounded-lg flex flex-col gap-8"
    >
      <header>
        <h1 className="uppercase text-2xl font-semibold text-center">
          Bienvenido al sistema
        </h1>
        <p className="text-sm text-center">Inicia sesión para continuar</p>
      </header>

      <div className=" w-full max-w-[330px]">
        <FormInput
          placeholderCustom={"Usuario"}
          value={loginFormData.userName}
          onChangeInput={(e) =>
            setLoginFormData({ ...loginFormData, userName: e.target.value })
          }
        />
        <FormInput
          placeholderCustom={"Contraseña"}
          isPass={true}
          value={loginFormData.password}
          onChangeInput={(e) =>
            setLoginFormData({ ...loginFormData, password: e.target.value })
          }
        />
      </div>

      <footer className="flex flex-col gap-2">
        {error && <p className="text-red-500 text-sm text-center">{error}</p>}
        <MainButton text={"INICIAR SESION"} disabled={loading} type="submit" />
        <p className="text-center text-sm">
          Desarrollador por{" "}
          <span className="text-primary-color cursor-pointer hover:underline">
            NOVA348
          </span>
        </p>
      </footer>
    </form>
  );
};
