import {registrarCampesino} from "../Logic/CampesinoPerfilController";
import { useForm } from "react-hook-form";
import { usarContexto } from "../context/AuthUsuarioContext";
import { useNavigate } from "react-router-dom";
import { useEffect } from "react";
export function Perfil() {
  const {
    register,
    handleSubmit,
    formState: { errors },
    setValue,
  } = useForm();

  const { user } = usarContexto();
  const navigate = useNavigate();

  useEffect(() => {
    if (user) {
      setValue("id", user.id);
      setValue("nombreUsuario", user.nombreUsuario);
      setValue("correoElectronico", user.correoElectronico);
      setValue("contrasenia", user.contrasenia);  
      setValue("terminosYCondiciones", user.terminosYCondiciones);
    }
  }, [user, setValue]);
  const onSubmit = async (data) => {
    if (data.foto[0]) {
      data.foto = await convertirABase64(data.foto[0]);
    }
    
    console.log("Datos envidados", data);
    
    try {
      const response = await registrarCampesino(data);
      console.log("Campesino registrado:", response);
      navigate("/vender");
    } catch (error) {
      console.error("Error al registrar campesino:", error);
    }
  };
  const convertirABase64 = (file) => {
    return new Promise((resolve, reject) => {
      const reader = new FileReader();
      reader.readAsDataURL(file);
      reader.onload = () => resolve(reader.result);
      reader.onerror = (error) => reject(error);
    });
  };
  return (
    <form onSubmit={handleSubmit(onSubmit)} className="form-container">
      
      <h2>Mi perfil</h2>
      <input
        type="text"
        {...register("nombreUsuario", { required: true })}
        placeholder="Nombre de usuario"
        disabled
      />
      {errors.nombreUsuario && <span>El nombre de usuario es obligatorio</span>}
      <input
        type="email"
        {...register("correoElectronico", { required: true })}
        placeholder="Correo Electrónico"
        disabled
      />
      {errors.correoElectronico && (
        <span>El correo electrónico es obligatorio</span>
      )}
      <input
        type="text"
        {...register("nombre", { required: true })}
        placeholder="Nombre"
      />
      {errors.nombre && <span>El nombre es obligatorio</span>}
      <input
        type="text"
        {...register("apellido", { required: true })}
        placeholder="Apellido"
      />
      {errors.apellido && <span>El apellido es obligatorio</span>}
      <input
        type="text"
        {...register("direccion", { required: true })}
        placeholder="Dirección"
      />
      {errors.direccion && <span>La dirección es obligatoria</span>}
      <input
        type="text"
        {...register("numeroDocumento", { required: true })}
        placeholder="Número de Documento"
      />
      {errors.numeroDocumento && (
        <span>El número de documento es obligatorio</span>
      )}
      <input type="file" {...register("foto", { required: true })} />
      {errors.foto && <span>La foto es obligatoria</span>}
      <input type="hidden" {...register("id", {required: false})} />
      <button type="submit">Guardar Perfil</button>
    </form>
  );
}

export default Perfil;
