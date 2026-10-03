// Servicio de SQLite (expo-sqlite): tabla "productos" con CRUD completo.
import * as SQLite from 'expo-sqlite';

let dbPromise = null;

// Abre la base de datos una sola vez y crea la tabla si no existe
const getDb = () => {
    if (!dbPromise) {
        dbPromise = (async () => {
            const db = await SQLite.openDatabaseAsync('tienda.db');
            await db.execAsync(`
                CREATE TABLE IF NOT EXISTS productos (
                    id INTEGER PRIMARY KEY AUTOINCREMENT,
                    nombre TEXT NOT NULL,
                    categoria TEXT NOT NULL,
                    talla TEXT NOT NULL,
                    precio REAL NOT NULL,
                    stock INTEGER NOT NULL DEFAULT 0
                );
            `);
            return db;
        })();
    }
    return dbPromise;
};

// CREATE
export const crearProducto = async ({ nombre, categoria, talla, precio, stock }) => {
    const db = await getDb();
    await db.runAsync(
        'INSERT INTO productos (nombre, categoria, talla, precio, stock) VALUES (?, ?, ?, ?, ?)',
        [nombre, categoria, talla, precio, stock]
    );
};

// READ
export const obtenerProductos = async () => {
    const db = await getDb();
    return await db.getAllAsync('SELECT * FROM productos ORDER BY id DESC');
};

// UPDATE
export const actualizarProducto = async ({ id, nombre, categoria, talla, precio, stock }) => {
    const db = await getDb();
    await db.runAsync(
        'UPDATE productos SET nombre = ?, categoria = ?, talla = ?, precio = ?, stock = ? WHERE id = ?',
        [nombre, categoria, talla, precio, stock, id]
    );
};

// DELETE
export const eliminarProducto = async (id) => {
    const db = await getDb();
    await db.runAsync('DELETE FROM productos WHERE id = ?', [id]);
};
