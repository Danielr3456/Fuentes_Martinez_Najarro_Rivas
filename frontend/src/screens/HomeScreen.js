import React, { useContext, useLayoutEffect } from 'react';
import { View, Text, StyleSheet, ScrollView, TouchableOpacity } from 'react-native';
import { Ionicons, MaterialCommunityIcons } from '@expo/vector-icons';
import { useNavigation } from '@react-navigation/native';
import { UserContext } from '../context/UserContext';

const HomeScreen = () => {
    const navigation = useNavigation();
    const { user, colors } = useContext(UserContext);

    // Header personalizado con botones de perfil y configuración
    useLayoutEffect(() => {
        navigation.setOptions({
            headerRight: () => (
                <View style={{ flexDirection: 'row' }}>
                    <TouchableOpacity onPress={() => navigation.navigate('Profile')} style={{ marginRight: 16 }}>
                        <Ionicons name="person" size={24} color="#FFFFFF" />
                    </TouchableOpacity>
                    <TouchableOpacity onPress={() => navigation.navigate('Settings')}>
                        <Ionicons name="settings-sharp" size={24} color="#FFFFFF" />
                    </TouchableOpacity>
                </View>
            ),
        });
    }, [navigation]);

    return (
        <ScrollView style={[styles.container, { backgroundColor: colors.bg }]} contentContainerStyle={styles.contentContainer}>
            <Text style={[styles.welcome, { color: colors.primary }]}>¡Hola, {user?.username}!</Text>

            <View style={[styles.card, { backgroundColor: colors.card }]}>
                <View style={styles.cardContent}>
                    <Text style={[styles.cardTitle, { color: colors.primary }]}>CATÁLOGO</Text>
                    <Text style={[styles.cardText, { color: colors.subtext }]}>Consulta, edita y elimina las prendas de la tienda.</Text>
                    <TouchableOpacity style={[styles.button, { backgroundColor: colors.primary }]} onPress={() => navigation.navigate('ProductList')}>
                        <MaterialCommunityIcons name="hanger" size={20} color="#fff" />
                        <Text style={styles.buttonText}>Ver prendas</Text>
                    </TouchableOpacity>
                </View>
            </View>

            <View style={[styles.card, { backgroundColor: colors.card }]}>
                <View style={styles.cardContent}>
                    <Text style={[styles.cardTitle, { color: colors.accent }]}>NUEVA PRENDA</Text>
                    <Text style={[styles.cardText, { color: colors.subtext }]}>Registra una prenda nueva en el inventario.</Text>
                    <TouchableOpacity style={[styles.button, { backgroundColor: colors.accent }]} onPress={() => navigation.navigate('ProductForm')}>
                        <MaterialCommunityIcons name="plus-circle-outline" size={20} color="#fff" />
                        <Text style={styles.buttonText}>Agregar prenda</Text>
                    </TouchableOpacity>
                </View>
            </View>
        </ScrollView>
    );
};

const styles = StyleSheet.create({
    container: { flex: 1 },
    contentContainer: { padding: 20, paddingBottom: 40 },
    welcome: { fontSize: 28, fontWeight: 'bold', marginBottom: 20 },
    card: {
        borderRadius: 15,
        marginBottom: 25,
        elevation: 3,
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.1,
        shadowRadius: 4,
    },
    cardContent: { padding: 15 },
    cardTitle: { fontSize: 22, fontWeight: 'bold', marginBottom: 5 },
    cardText: { fontSize: 15, marginBottom: 15, lineHeight: 20 },
    button: {
        borderRadius: 10,
        height: 42,
        justifyContent: 'center',
        alignItems: 'center',
        alignSelf: 'flex-start',
        paddingHorizontal: 20,
        flexDirection: 'row',
    },
    buttonText: { color: '#fff', fontSize: 15, fontWeight: 'bold', padding: 8 },
});

export default HomeScreen;
