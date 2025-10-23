import { MainButton } from "../UI/UiButtons"
import { FormInput } from "../UI/UiInputs"

export const LoginForm = () => {
    return (
        <form action="" className="px-5 py-7 bg-white border border-dark-color rounded-lg flex flex-col gap-8" >
            <header>
                <h1 className="uppercase text-2xl font-semibold text-center" >Bienvenido al sistema</h1>
                <p className="text-sm text-center" >Inicia sesión para continuar</p>
            </header>

            <div className=" w-full max-w-[330px]" >
                <FormInput placeholderCustom={"Usuario"} />
                <FormInput placeholderCustom={"Contraseña"} isPass={true} />
            </div>

            <footer className="flex flex-col gap-2" >
                <MainButton text={"INICIAR SESION"} onClick={() => alert('¡Clic!')} />
                <p className="text-center text-sm" >Desarrollador por <span className="text-primary-color cursor-pointer hover:underline" >NOVA348</span></p>
            </footer>
        </form>
    )
}