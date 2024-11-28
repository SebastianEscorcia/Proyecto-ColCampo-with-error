import { useForm } from "react-hook-form";
import { useState } from "react";
import { usarContexto } from "../context/AuthUsuarioContext";
import { FaUser, FaEnvelope, FaLock, FaUserTag } from "react-icons/fa";
import { useNavigate } from "react-router-dom";
import "../Styles/registroUsuario.css";

function FormularioRegistro() {
  const { registro, isAuthenticated } = usarContexto();
  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm();
  const password = watch("password");
  const navigate = useNavigate();
  const [errorMessage, setErrorMessage] = useState(null);

  const onSubmit = async (values) => {
    try {
      const perfilId = values.tipoUsuario === "campesino" ? 2 : 1;

      const payload = {
        name: values.name,
        email: values.email,
        password: values.password,
        perfilId,
        isActive: true,
      };

      await registro(payload); // Llamar al método del contexto
      setErrorMessage(null);
      navigate("/", { replace: true }); // Redirigir después de un registro exitoso
    } catch (error) {
      setErrorMessage(error.message || "Error al registrar el usuario.");
    }
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="form-container">
      <h2>Registro de Usuario</h2>

      {errorMessage && <p className="error-message">{errorMessage}</p>}

      <div className="input-group">
        <FaUser />
        <input
          type="text"
          {...register("name", { required: "El nombre es obligatorio" })}
          placeholder="Nombre"
        />
        {errors.name && <span>{errors.name.message}</span>}
      </div>

      <div className="input-group">
        <FaUserTag />
        <select
          {...register("tipoUsuario", {
            required: "Selecciona el tipo de usuario",
          })}
        >
          <option value="">Selecciona...</option>
          <option value="campesino">Campesino</option>
          <option value="cliente">Cliente</option>
        </select>
        {errors.tipoUsuario && <span>{errors.tipoUsuario.message}</span>}
      </div>

      <div className="input-group">
        <FaEnvelope />
        <input
          type="email"
          {...register("email", {
            required: "El correo electrónico es obligatorio",
            pattern: {
              value: /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/,
              message: "Correo electrónico no válido",
            },
          })}
          placeholder="Correo Electrónico"
        />
        {errors.email && <span>{errors.email.message}</span>}
      </div>

      <div className="input-group">
        <FaLock />
        <input
          type="password"
          {...register("password", {
            required: "La contraseña es obligatoria",
            minLength: {
              value: 8,
              message: "Debe tener al menos 8 caracteres",
            },
          })}
          placeholder="Contraseña"
        />
        {errors.password && <span>{errors.password.message}</span>}
      </div>

      <div className="input-group">
        <FaLock />
        <input
          type="password"
          {...register("confirmarContraseña", {
            required: "Confirma tu contraseña",
            validate: (value) =>
              value === password || "Las contraseñas no coinciden",
          })}
          placeholder="Confirmar Contraseña"
        />
        {errors.confirmarContraseña && (
          <span>{errors.confirmarContraseña.message}</span>
        )}
      </div>

      <button type="submit" className="registrar">
        Regístrate
      </button>
    </form>
  );
}

export default FormularioRegistro;
