import React, { useContext, useLayoutEffect, useState } from 'react';
import { View, Text, StyleSheet, ScrollView, TouchableOpacity, Alert, SafeAreaView } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { useNavigation, useRoute } from '@react-navigation/native';
import { UserContext } from '../context/UserContext';
import { crearProducto, actualizarProducto } from '../services/database';
import FormField from '../components/FormField';

// DataEntryScreen: formulario para crear o editar una prenda
const ProductFormScreen = () => {
    const navigation = useNavigation();
    const route = useRoute();
    const { colors } = useContext(UserContext);

    // Si llega un producto por parámetros, estamos editando
    const producto = route.params?.producto;
    const editando = !!producto;

    const [nombre, setNombre] = useState(producto?.nombre ?? '');
    const [categoria, setCategoria] = useState(producto?.categoria ?? '');
    const [talla, setTalla] = useState(producto?.talla ?? '');
    const [precio, setPrecio] = useState(producto ? String(producto.precio) : '');
    const [stock, setStock] = useState(producto ? String(producto.stock) : '');

    // CREATE / UPDATE según el modo
    const handleSave = async () => {
        if (!nombre.trim() || !categoria.trim() || !talla.trim() || !precio.trim() || !stock.trim()) {
            Alert.alert('Formulario incompleto', 'Por favor, llena todos los campos.');
            return;
        }
        const precioNum = parseFloat(precio);
        const stockNum = parseInt(stock, 10);
        if (isNaN(precioNum) || isNaN(stockNum)) {
            Alert.alert('Datos inválidos', 'Precio y stock deben ser números.');
            return;
        }

        const datos = { nombre: nombre.trim(), categoria: categoria.trim(), talla: talla.trim(), precio: precioNum, stock: stockNum };
        if (editando) {
            await actualizarProducto({ id: producto.id, ...datos });
        } else {
            await crearProducto(datos);
        }
        navigation.goBack();
    };

    // Título dinámico y botón "Guardar" en el header
    useLayoutEffect(() => {
        navigation.setOptions({
            title: editando ? 'Editar prenda' : 'Nueva prenda',
            headerRight: () => (
                <TouchableOpacity onPress={handleSave}>
                    <Ionicons name="checkmark-circle" size={30} color="#FFFFFF" />
                </TouchableOpacity>
            ),
        });
    }, [navigation, nombre, categoria, talla, precio, stock]);

    return (
        <SafeAreaView style={[styles.container, { backgroundColor: colors.bg }]}>
            <ScrollView showsVerticalScrollIndicator={false} contentContainerStyle={styles.scrollContent}>
                <View style={[styles.formCard, { backgroundColor: colors.card }]}>
                    <FormField label="Nombre" value={nombre} onChangeText={setNombre} placeholder="Ej. Camisa de lino" />
                    <FormField label="Categoría" value={categoria} onChangeText={setCategoria} placeholder="Ej. Camisas, Pantalones..." />
                    <FormField label="Talla" value={talla} onChangeText={setTalla} placeholder="Ej. S, M, L" />
                    <FormField label="Precio ($)" value={precio} onChangeText={setPrecio} placeholder="Ej. 24.99" keyboardType="decimal-pad" />
                    <FormField label="Stock" value={stock} onChangeText={setStock} placeholder="Ej. 10" keyboardType="number-pad" />
                </View>

                <TouchableOpacity style={[styles.submitButton, { backgroundColor: colors.primary }]} onPress={handleSave} activeOpacity={0.8}>
                    <Ionicons name="save-outline" size={22} color="#FFFFFF" style={{ marginRight: 8 }} />
                    <Text style={styles.submitButtonText}>{editando ? 'Guardar cambios' : 'Agregar prenda'}</Text>
                </TouchableOpacity>
            </ScrollView>
        </SafeAreaView>
    );
};

const styles = StyleSheet.create({
    container: { flex: 1 },
    scrollContent: { padding: 20, paddingBottom: 40 },
    formCard: {
        borderRadius: 24,
        padding: 22,
        marginBottom: 20,
        elevation: 3,
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 4 },
        shadowOpacity: 0.06,
        shadowRadius: 10,
    },
    inputContainer: { marginBottom: 16 },
    submitButton: {
        backgroundColor: '#213885',
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center',
        paddingVertical: 16,
        borderRadius: 16,
        elevation: 3,
    },
    submitButtonText: { color: '#FFFFFF', fontSize: 18, fontWeight: 'bold' },
});

export default ProductFormScreen;
