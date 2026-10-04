import React, { useContext, useLayoutEffect } from 'react';
import { View, Text, StyleSheet, ScrollView, TouchableOpacity } from 'react-native';
import { Ionicons, MaterialCommunityIcons } from '@expo/vector-icons';
import { useNavigation } from '@react-navigation/native';
import { UserContext } from '../context/UserContext';

const HomeScreen = () => {
    const navigation = useNavigation();
    const { user, colors } = useContext(UserContext);

    useLayoutEffect(() => {
        navigation.setOptions({
            headerRight: () => (
                <View style={{ flexDirection: 'row' }}>
                    <TouchableOpacity onPress={() => navigation.navigate('Settings')}>
                        <Ionicons name="settings-sharp" size={24} color="#FFFFFF" />
                    </TouchableOpacity>
                </View>
            ),
        });
    }, [navigation]);

    return (
        <ScrollView style={[styles.container, { backgroundColor: colors.bg }]} contentContainerStyle={styles.contentContainer} showsVerticalScrollIndicator={false}>
            <Text style={[styles.welcome, { color: colors.text }]}>
                ¡Hola, <Text style={{ color: colors.primary }}>{user?.username}</Text>! 
            </Text>
            <Text style={[styles.subtitle, { color: colors.subtext }]}>Bienvenido al panel de administración de tu tienda.</Text>

            <View style={[styles.introCard, { backgroundColor: colors.card, borderColor: colors.border }]}>
                <Text style={[styles.introTitle, { color: colors.text }]}>Sistema de Gestión Moda Store</Text>
                <Text style={[styles.introText, { color: colors.subtext }]}>
                    Esta plataforma está diseñada para centralizar el control de inventario de tu negocio de prendas. 
                    Desde aquí puedes monitorear los niveles de stock en tiempo real, actualizar precios de catálogo 
                    y registrar nuevas piezas para mantener la base de datos organizada.
                </Text>
            </View>

            <View style={[styles.card, { backgroundColor: colors.card, borderColor: colors.border }]}>
                <View style={styles.cardHeaderRow}>
                    <MaterialCommunityIcons name="hanger" size={26} color={colors.primary} style={styles.cleanIcon} />
                    <Text style={[styles.cardTitle, { color: colors.primary }]}>CATÁLOGO</Text>
                </View>
                <Text style={[styles.cardText, { color: colors.subtext }]}>
                    Consulta, edita y elimina las prendas disponibles en la tienda de moda de forma rápida.
                </Text>
                
                <TouchableOpacity 
                    style={[styles.button, { backgroundColor: colors.primary }]} 
                    onPress={() => navigation.navigate('ProductList', { filter: 'all' })} 
                    activeOpacity={0.8}
                >
                    <Text style={styles.buttonText}>Ver prendas</Text>
                    <Ionicons name="arrow-forward" size={18} color="#fff" />
                </TouchableOpacity>
            </View>

            <View style={[styles.card, { backgroundColor: colors.card, borderColor: colors.border }]}>
                <View style={styles.cardHeaderRow}>
                    <MaterialCommunityIcons name="plus-circle-outline" size={26} color={colors.accent} style={styles.cleanIcon} />
                    <Text style={[styles.cardTitle, { color: colors.accent }]}>NUEVA PRENDA</Text>
                </View>
                <Text style={[styles.cardText, { color: colors.subtext }]}>
                    Registra una prenda nueva rellenando sus especificaciones, precio y cantidad de stock.
                </Text>

                <TouchableOpacity 
                    style={[styles.button, { backgroundColor: colors.accent }]} 
                    onPress={() => navigation.navigate('ProductForm', { action: 'create', productId: null })} 
                    activeOpacity={0.8}
                >
                    <Text style={styles.buttonText}>Agregar prenda</Text>
                    <Ionicons name="arrow-forward" size={18} color="#fff" />
                </TouchableOpacity>
            </View>
        </ScrollView>
    );
};

const styles = StyleSheet.create({
    container: { flex: 1 },
    contentContainer: { padding: 20, paddingBottom: 40 },
    welcome: { fontSize: 30, fontWeight: 'bold', marginTop: 10 },
    subtitle: { fontSize: 16, marginBottom: 20, fontWeight: '500' },
    introCard: { borderRadius: 20, padding: 20, marginBottom: 24, borderWidth: 1, borderStyle: 'dashed' },
    introTitle: { fontSize: 18, fontWeight: 'bold', marginBottom: 8 },
    introText: { fontSize: 14, lineHeight: 20 },
    card: { borderRadius: 20, marginBottom: 24, padding: 20, borderWidth: 1, elevation: 4, shadowColor: '#081849', shadowOffset: { width: 0, height: 4 }, shadowOpacity: 0.06, shadowRadius: 12 },
    cardHeaderRow: { flexDirection: 'row', alignItems: 'center', marginBottom: 14 },
    cleanIcon: { marginRight: 10 },
    cardTitle: { fontSize: 18, fontWeight: 'bold', letterSpacing: 0.5 },
    cardText: { fontSize: 15, marginBottom: 20, lineHeight: 22 },
    button: { borderRadius: 14, height: 48, flexDirection: 'row', justifyContent: 'center', alignItems: 'center', width: '100%' },
    buttonText: { color: '#fff', fontSize: 16, fontWeight: 'bold', marginRight: 6 },
});

export default HomeScreen;