import React, { useCallback, useContext, useLayoutEffect, useState } from 'react';
import { View, Text, StyleSheet, FlatList, TouchableOpacity, Alert } from 'react-native'; // <--- Se importó View
import { Ionicons } from '@expo/vector-icons';
import { useNavigation, useFocusEffect } from '@react-navigation/native';
import { UserContext } from '../context/UserContext';
import ProductCard from '../components/ProductCard';
import { obtenerProductos, eliminarProducto } from '../services/database';
import { SafeAreaView } from 'react-native-safe-area-context'; 

// ListScreen: muestra los productos guardados en SQLite
const ProductListScreen = () => {
    const navigation = useNavigation();
    const { colors } = useContext(UserContext); // Consumimos el contexto global
    const [productos, setProductos] = useState([]);

    // Botón "+" en el header para agregar una prenda (Lógica intacta)
    useLayoutEffect(() => {
        navigation.setOptions({
            headerRight: () => (
                <TouchableOpacity onPress={() => navigation.navigate('ProductForm')} activeOpacity={0.7}>
                    <Ionicons name="add-circle" size={30} color="#FFFFFF" />
                </TouchableOpacity>
            ),
        });
    }, [navigation]);

    // READ: recarga la lista cada vez que la pantalla recibe el foco (Lógica intacta)
    useFocusEffect(
        useCallback(() => {
            cargarProductos();
        }, [])
    );

    const cargarProductos = async () => {
        setProductos(await obtenerProductos());
    };

    // DELETE: pide confirmación antes de borrar (Lógica intacta)
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
                showsVerticalScrollIndicator={false} // Oculta la barra de scroll para un diseño más limpio
                ListEmptyComponent={
                    // Contenedor visual mejorado con un ícono ilustrativo cuando la lista está vacía
                    <View style={styles.emptyContainer}>
                        <Ionicons name="shirt-outline" size={64} color={colors.subtext} style={styles.emptyIcon} />
                        <Text style={[styles.emptyText, { color: colors.subtext }]}>
                            No hay prendas registradas.{"\n"}Toca "+" para agregar una nueva pieza.
                        </Text>
                    </View>
                }
            />
        </SafeAreaView>
    );
};

const styles = StyleSheet.create({
    container: { 
        flex: 1,
    },
    listContent: { 
        padding: 16, 
        paddingBottom: 30 
    },
    emptyContainer: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
        marginTop: 80, 
        paddingHorizontal: 32,
    },
    emptyIcon: {
        marginBottom: 16,
        opacity: 0.6, 
    },
    emptyText: { 
        textAlign: 'center', 
        fontSize: 16,
        lineHeight: 24,
        fontWeight: '500'
    },
});

export default ProductListScreen;
