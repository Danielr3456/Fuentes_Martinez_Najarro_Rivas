import React, { useCallback, useContext, useLayoutEffect, useState } from 'react';
import { View, Text, StyleSheet, FlatList, TouchableOpacity, Alert } from 'react-native'; 
import { Ionicons } from '@expo/vector-icons';
import { useNavigation, useFocusEffect } from '@react-navigation/native';
import { UserContext } from '../context/UserContext';
import ProductCard from '../components/ProductCard';
import { obtenerProductos, eliminarProducto } from '../services/database';

const ProductListScreen = () => {
    const navigation = useNavigation();
    const { colors } = useContext(UserContext); 
    const [productos, setProductos] = useState([]);

    useLayoutEffect(() => {
        navigation.setOptions({
            headerRight: () => (
                <TouchableOpacity onPress={() => navigation.navigate('ProductForm')} activeOpacity={0.7}>
                    <Ionicons name="add-circle" size={30} color="#FFFFFF" style={{ marginRight: 15 }} />
                </TouchableOpacity>
            ),
        });
    }, [navigation]);

    useFocusEffect(
        useCallback(() => {
            cargarProductos();
        }, [])
    );

    const cargarProductos = async () => {
        setProductos(await obtenerProductos());
    };

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
            onEdit={() => navigation.navigate('ProductForm', { producto: item })}
            onDelete={() => handleDelete(item)}
        />
    );

    return (
        // CAMBIO AQUÍ: Usamos View en lugar de SafeAreaView
        <View style={[styles.container, { backgroundColor: colors.bg }]}>
            <FlatList
                data={productos}
                keyExtractor={(item) => item.id.toString()}
                renderItem={renderItem}
                contentContainerStyle={styles.listContent}
                showsVerticalScrollIndicator={false} 
                ListEmptyComponent={
                    <View style={styles.emptyContainer}>
                        <Ionicons name="shirt-outline" size={64} color={colors.subtext} style={styles.emptyIcon} />
                        <Text style={[styles.emptyText, { color: colors.subtext }]}>
                            No hay prendas registradas.{"\n"}Toca "+" para agregar una nueva pieza.
                        </Text>
                    </View>
                }
            />
        </View>
    );
};

const styles = StyleSheet.create({
    container: { flex: 1 },
    listContent: { padding: 16, paddingBottom: 30 },
    emptyContainer: { flex: 1, alignItems: 'center', justifyContent: 'center', marginTop: 80, paddingHorizontal: 32 },
    emptyIcon: { marginBottom: 16, opacity: 0.6 },
    emptyText: { textAlign: 'center', fontSize: 16, lineHeight: 24, fontWeight: '500' },
});

export default ProductListScreen;