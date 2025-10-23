import { Eye, EyeOff } from 'lucide-react'
import { useState } from 'react'

//este es el input del formulario de login, no se si se usara en otro
export const FormInput = ({ maxWidth, placeholderCustom, isPass }) => {
    const [showPassword, setShowPassword] = useState(false)

    return (
        <div className={`relative mt-5 h-[51px] group border border-dark-color rounded-lg focus-within:border-second-color duration-100 ${maxWidth} flex items-center justify-center`}>
            <input type={!isPass ? "text" : (showPassword ? "text" : "password")} className="p-3 outline-none h-full w-full peer" required />

            {/* placeholder interactivo que cambiara si el usuario tiene el input activado o si el input tiene contenido */}
            <span className="absolute top-3 left-3 bg-white group-focus-within:-translate-y-6 group-focus-within:-translate-x-3 pointer-events-none group-focus-within:px-2 group-focus-within:scale-85 group-focus-within:text-second-color duration-100 peer-valid:-translate-y-6 peer-valid:-translate-x-3 peer-valid:scale-85 peer-valid:px-2" >
                {placeholderCustom}
            </span>

            {/* botón para cambiar entre ver o no ver la pass */}
            {
                isPass && <button type='button' className='h-full flex cursor-pointer w-9 p-2 items-center justify-center' onClick={() => setShowPassword(!showPassword)} >
                    {
                        showPassword ? <Eye /> : <EyeOff />
                    }
                </button>
            }
        </div>
    )
}
