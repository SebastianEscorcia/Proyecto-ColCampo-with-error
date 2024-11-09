import { useForm } from "react-hook-form";
import { usarContexto } from '../context/AuthUsuarioContext';
import { useNavigate } from 'react-router-dom';
import '../Styles/registroUsuario.css';
import { useState, useEffect } from "react";

function FormularioRegistro() {
    const { register, handleSubmit, watch, formState: { errors } } = useForm();
    const password = watch("contrasenia");
    const navigate = useNavigate();
    const { login, isAuthenticated } = usarContexto();
    const [errorMessage, setErrorMessage] = useState(null); // Estado para manejar mensajes de error

    useEffect(() => {
        if (isAuthenticated) {
            navigate("/", { replace: true });
        }
    }, [isAuthenticated, navigate]);

    // Función que maneja el envío del formulario
    const onSubmit = async (values) => {
        try {
            // Llamar a la función login para registrar al usuario
            await login(values);
            setErrorMessage(null); // Limpia cualquier mensaje de error previo
        } catch (error) {
            // Capturar el mensaje de error del backend y mostrarlo en el formulario
            if (error.response && error.response.status === 409) {
                setErrorMessage("El nombre de usuario o correo electrónico ya están en uso."); // Mostrar mensaje específico de error 409
            } else {
                setErrorMessage("Ocurrió un error inesperado. Inténtalo nuevamente."); // Mensaje para otros errores
            }
        }
    };

    return (
        <form onSubmit={handleSubmit(onSubmit)} className="form-container">
            <h2>Registro de Usuario</h2>

            {/* Mostrar el mensaje de error si existe */}
            {errorMessage && <p className="error-message">{errorMessage}</p>}

            <input 
                type="text" 
                {...register("nombreUsuario", { required: true })} 
                placeholder="Nombre de usuario" 
            />
            {errors.nombreUsuario && <span>El nombre de usuario es obligatorio</span>}

            <input 
                type="email" 
                {...register("correoElectronico", { required: true })} 
                placeholder="Correo Electrónico" 
            />
            {errors.correoElectronico && <span>El correo electrónico es obligatorio</span>}

            <input 
                type="password" 
                {...register("contrasenia", { 
                    required: "La contraseña es obligatoria", 
                    minLength: { value: 8, message: "La contraseña debe tener al menos 8 caracteres" },
                    pattern: { 
                        value: /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/, 
                        message: "La contraseña debe incluir mayúsculas, minúsculas, un número y un carácter especial" 
                    }
                })} 
                placeholder="Contraseña" 
            />
            {errors.contrasenia && <span>{errors.contrasenia.message}</span>}

            <input 
                type="password" 
                {...register("confirmarContraseña", { 
                    required: "Confirme su contraseña", 
                    validate: value => value === password || "Las contraseñas no coinciden" 
                })} 
                placeholder="Confirmar Contraseña" 
            />
            {errors.confirmarContraseña && <span>{errors.confirmarContraseña.message}</span>}

            <div className="checkbox-container">
                <input 
                    type="checkbox" 
                    {...register("terminosYCondiciones", { required: "Debe aceptar los términos y condiciones" })} 
                />
                <label>Acepto los términos y condiciones</label>
            </div>
            {errors.terminosYCondiciones && <span>{errors.terminosYCondiciones.message}</span>}

            <button type="submit">Regístrate</button>
        </form>
    );
}

export default FormularioRegistro;
