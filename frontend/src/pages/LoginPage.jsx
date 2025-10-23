import { LoginForm } from "../components/LoginForm"

export const LoginPage = () => {
    return (
        <main className="h-screen grid grid-cols-1 xl:grid-cols-2 w-full bg-light-color " >
            <section className="flex items-center justify-center px-2" >
                <LoginForm />
            </section>

            {/* Sección derecha donde estará la publicidad o lo que sea */}
            {/* esta imagen url es un placeholder toca poner la imagen ya cargada en el proyecto o si se va a agregar con un back toca hacer algo mientras carga */}
            <section className="xl:flex items-center hidden justify-center overflow-hidden bg-cover bg-center bg-[url('https://lamanducateca.com/wp-content/uploads/2024/07/s5500562-scaled.jpg')]">
                {/* logo y texto */}
                <div className="w-full h-full bg-black/60 backdrop-blur-xs flex flex-col items-center justify-center gap-2 text-3xl font-bold text-gray-100" >
                    <img src="/LogoMain.png" alt="Logo login page" className="w-32" />
                    <h1 className="text-[40px] text-[#2598EB] font-bold" >NOVA 348</h1>
                    <h2 className="mb-12" >SOLUCIONES INNOVADORAS Y EFICIENTES</h2>
                    <h3>SISTEMA DE PUNTO DE VENTA</h3>
                </div>
            </section>
        </main>
    )
}