import React, { useContext } from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { UserContext } from '../context/UserContext';

// Tarjeta reutilizable de una prenda (se usa en ProductListScreen)
// Props: producto, onEdit, onDelete
const ProductCard = ({ producto, onEdit, onDelete }) => {
    const { colors } = useContext(UserContext);

    return (
        <View style={[styles.card, { backgroundColor: colors.card }]}>
            <View style={[styles.iconBox, { backgroundColor: colors.soft }]}>
                <Ionicons name="shirt-outline" size={32} color={colors.primary} />
            </View>
            <View style={styles.info}>
                <Text style={[styles.name, { color: colors.text }]}>{producto.nombre}</Text>
                <Text style={[styles.sub, { color: colors.subtext }]}>{producto.categoria} · Talla {producto.talla}</Text>
                <Text style={[styles.price, { color: colors.accent }]}>${producto.precio.toFixed(2)} · Stock: {producto.stock}</Text>
            </View>
            <View>
                <TouchableOpacity style={styles.actionBtn} onPress={onEdit}>
                    <Ionicons name="create-outline" size={22} color={colors.primary} />
                </TouchableOpacity>
                <TouchableOpacity style={styles.actionBtn} onPress={onDelete}>
                    <Ionicons name="trash-outline" size={22} color={colors.danger} />
                </TouchableOpacity>
            </View>
        </View>
    );
};

const styles = StyleSheet.create({
    card: {
        flexDirection: 'row',
        borderRadius: 18,
        padding: 12,
        marginBottom: 14,
        alignItems: 'center',
        elevation: 3,
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.08,
        shadowRadius: 4,
    },
    iconBox: {
        width: 60,
        height: 60,
        borderRadius: 14,
        justifyContent: 'center',
        alignItems: 'center',
    },
    info: { flex: 1, marginLeft: 14 },
    name: { fontSize: 18, fontWeight: 'bold' },
    sub: { fontSize: 13, marginTop: 2 },
    price: { fontSize: 13, fontWeight: '600', marginTop: 3 },
    actionBtn: { padding: 6 },
});

export default ProductCard;
