import React, { createContext, useState, useEffect } from 'react';
import { guardarSesion, leerSesion, guardarTema, leerTema, limpiarStorage } from '../services/storage';

// Contexto global: usuario, tema y funciones de login/logout
export const UserContext = createContext();

// Paleta "Lapis velvet evening": azul lapislázuli, crema, morado y ciruela
const LIGHT = {
    bg: '#ECDFD2',       // crema
    card: '#FBF8F4',
    text: '#081849',     // azul noche
    subtext: '#5E6283',
    primary: '#213885',  // azul lapislázuli
    secondary: '#5F3475',// morado
    accent: '#893172',   // ciruela
    border: '#CCCACC',
    input: '#FFFFFF',
    soft: '#E3D3C3',     // fondo de iconos
    danger: '#B3261E',
};
const DARK = {
    bg: '#081849',
    card: '#101F5C',
    text: '#ECDFD2',
    subtext: '#CCCACC',
    primary: '#4F6BD6',
    secondary: '#7B4A93',
    accent: '#B2478F',
    border: '#2B3C85',
    input: '#0B1A55',
    soft: '#213885',
    danger: '#E5736B',
};

export const UserProvider = ({ children }) => {
    const [user, setUser] = useState(null);
    const [darkMode, setDarkMode] = useState(false);
    const [loading, setLoading] = useState(true); // true mientras se lee AsyncStorage

    // Al abrir la app: recuperar sesión y tema guardados
    useEffect(() => {
        const cargar = async () => {
            const username = await leerSesion();
            if (username) setUser({ username });
            setDarkMode(await leerTema());
            setLoading(false);
        };
        cargar();
    }, []);

    const login = async (username) => {
        await guardarSesion(username);
        setUser({ username });
    };

    const logout = async () => {
        await limpiarStorage();
        setUser(null);
        setDarkMode(false);
    };

    const toggleDarkMode = async (value) => {
        setDarkMode(value);
        await guardarTema(value);
    };

    const colors = darkMode ? DARK : LIGHT;

    return (
        <UserContext.Provider value={{ user, login, logout, darkMode, toggleDarkMode, colors, loading }}>
            {children}
        </UserContext.Provider>
    );
};
export default UserContext;
