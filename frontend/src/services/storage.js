// Servicio de AsyncStorage: sesión del usuario y preferencia de tema.
import AsyncStorage from '@react-native-async-storage/async-storage';

const KEY_USER = 'usuario';
const KEY_DARK = 'modoOscuro';
const KEY_LANG = 'idioma';

// Sesión (simulada): guarda el nombre del usuario logueado
export const guardarSesion = async (username) => {
    await AsyncStorage.setItem(KEY_USER, username);
};

export const leerSesion = async () => {
    return await AsyncStorage.getItem(KEY_USER);
};

// Preferencia: tema oscuro / claro
export const guardarTema = async (oscuro) => {
    await AsyncStorage.setItem(KEY_DARK, oscuro ? '1' : '0');
};

export const leerTema = async () => {
    return (await AsyncStorage.getItem(KEY_DARK)) === '1';
};

// Preferencia: Idioma
export const guardarIdioma = async (idioma) => {
    await AsyncStorage.setItem(KEY_LANG, idioma);
};

export const leerIdioma = async () => {
    return await AsyncStorage.getItem(KEY_LANG);
};

// Logout: limpia todo lo guardado en AsyncStorage
export const limpiarStorage = async () => {
    await AsyncStorage.clear();
};


