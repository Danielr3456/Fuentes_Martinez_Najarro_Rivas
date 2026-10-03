import React, { useCallback, useContext, useLayoutEffect, useState } from 'react';
import { Text, StyleSheet, FlatList, TouchableOpacity, SafeAreaView, Alert } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { useNavigation, useFocusEffect } from '@react-navigation/native';
import { UserContext } from '../context/UserContext';
import ProductCard from '../components/ProductCard';
import { obtenerProductos, eliminarProducto } from '../services/database';

// ListScreen: muestra los productos guardados en SQLite
const ProductListScreen = () => {
    const navigation = useNavigation();
    const { colors } = useContext(UserContext);
    const [productos, setProductos] = useState([]);

    // Botón "+" en el header para agregar una prenda
    useLayoutEffect(() => {
        navigation.setOptions({
            headerRight: () => (
                <TouchableOpacity onPress={() => navigation.navigate('ProductForm')}>
                    <Ionicons name="add-circle" size={30} color="#FFFFFF" />
                </TouchableOpacity>
            ),
        });
    }, [navigation]);

    // READ: recarga la lista cada vez que la pantalla recibe el foco
    useFocusEffect(
        useCallback(() => {
            cargarProductos();
        }, [])
    );

    const cargarProductos = async () => {
        setProductos(await obtenerProductos());
    };

    // DELETE: pide confirmación antes de borrar
    const handleDelete = (item) => {
        Alert.alert('Eliminar prenda', `¿Eliminar "${item.nombre}"?`, [
            { text: 'Cancelar', style: 'cancel' },
            {
                text: 'Eliminar',
                style: 'destructive',
                onPress: async () => {
                    await eliminarProducto(item.id);
                    cargarProductos();
                },
            },
        ]);
    };

    const renderItem = ({ item }) => (
        <ProductCard
            producto={item}
            // UPDATE: se pasa el producto como parámetro al formulario
            onEdit={() => navigation.navigate('ProductForm', { producto: item })}
            onDelete={() => handleDelete(item)}
        />
    );

    return (
        <SafeAreaView style={[styles.container, { backgroundColor: colors.bg }]}>
            <FlatList
                data={productos}
                keyExtractor={(item) => item.id.toString()}
                renderItem={renderItem}
                contentContainerStyle={styles.listContent}
                ListEmptyComponent={
                    <Text style={[styles.empty, { color: colors.subtext }]}>No hay prendas registradas. Toca "+" para agregar una.</Text>
                }
            />
        </SafeAreaView>
    );
};

const styles = StyleSheet.create({
    container: { flex: 1 },
    listContent: { padding: 14, paddingBottom: 25 },
    empty: { textAlign: 'center', marginTop: 40, fontSize: 15 },
});

export default ProductListScreen;
