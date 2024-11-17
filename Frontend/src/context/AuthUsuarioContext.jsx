import { createContext, useState, useContext, useEffect } from "react";
import { registrarUsuario } from "../Logic/RegisterUserController";
import { obtenerPerfil } from "../Logic/ObtenerPerfil";

export const AuthUsuarioContext = createContext();

export const usarContexto = () => {
    const context = useContext(AuthUsuarioContext);
    if (!context) {
        throw new Error("Debe usar este componente dentro de un contexto AuthUsuarioContext");
    }
    return context;
}

export const AuthProvider = ({ children }) => {
    const [user, setUser] = useState(null);
    const [isAuthenticated, setisAuthenticated] = useState(false);

    const login = async (user) => {
        try {
            const response = await registrarUsuario(user);
            console.log("Usuario registrado:", response);
            localStorage.setItem('token', response.token);
            setUser(response.usuario);  
            setisAuthenticated(true);
        } catch (error) {
            console.error("Error al registrar el usuario:", error);
        }
    };
    const logout = () => {
        localStorage.removeItem("token");
        setUser(null);
        setisAuthenticated(false);
    };

    useEffect(() => {
        const token = localStorage.getItem('token');
        if (token) {
            obtenerPerfil().then(user => {
                setUser(user);
                setisAuthenticated(true);
            }).catch(error => {
                console.error('Error al obtener el perfil:', error);
                setisAuthenticated(false);
            });
        }
    }, []);

    return (
        <AuthUsuarioContext.Provider value={{ login, user, isAuthenticated, logout, setUser, setisAuthenticated }}>
            {children}
        </AuthUsuarioContext.Provider>
    );
};
