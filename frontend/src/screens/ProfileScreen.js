import React, { useContext } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, ScrollView, Alert, SafeAreaView } from 'react-native';
import { UserContext } from '../context/UserContext';
import { Ionicons } from '@expo/vector-icons';

const ProfileScreen = () => {
    const { user, logout, colors } = useContext(UserContext);

    const displayUsername = user?.username || 'Usuario';

    // Datos de contacto simulados
    const STATIC_DATA = {
        email: `${displayUsername.toLowerCase().replace(/\s+/g, '')}@gmail.com`,
        phone: '7458-9210',
        location: 'San Salvador, El Salvador',
    };

    const handleLogout = () => {
        Alert.alert('Cerrar Sesión', '¿Deseas salir de tu cuenta?', [
            { text: 'Cancelar', style: 'cancel' },
            {
                text: 'Cerrar Sesión',
                style: 'destructive',
                // logout limpia AsyncStorage; la guarda de ruta regresa a Login
                onPress: () => logout(),
            },
        ]);
    };

    const InfoRow = ({ icon, label, value }) => (
        <View style={styles.infoRow}>
            <View style={[styles.iconCircle, { backgroundColor: colors.soft }]}>
                <Ionicons name={icon} size={20} color={colors.primary} />
            </View>
            <View style={{ flex: 1 }}>
                <Text style={[styles.infoLabel, { color: colors.subtext }]}>{label}</Text>
                <Text style={[styles.infoValue, { color: colors.text }]}>{value}</Text>
            </View>
        </View>
    );

    return (
        <SafeAreaView style={[styles.container, { backgroundColor: colors.bg }]}>
            <ScrollView showsVerticalScrollIndicator={false} contentContainerStyle={styles.scrollContent}>

                <View style={[styles.profileHeader, { backgroundColor: colors.card }]}>
                    <View style={[styles.avatar, { backgroundColor: colors.primary, borderColor: colors.accent }]}>
                        <Ionicons name="person" size={60} color="#FFFFFF" />
                    </View>
                    <Text style={[styles.usernameText, { color: colors.text }]}>{displayUsername}</Text>
                    <Text style={[styles.roleText, { color: colors.accent }]}>Administrador de la tienda</Text>
                </View>

                <View style={[styles.card, { backgroundColor: colors.card }]}>
                    <Text style={[styles.cardTitle, { color: colors.text }]}>Información de Contacto</Text>
                    <InfoRow icon="mail-outline" label="Correo Electrónico" value={STATIC_DATA.email} />
                    <InfoRow icon="call-outline" label="Teléfono / WhatsApp" value={STATIC_DATA.phone} />
                    <InfoRow icon="location-outline" label="Ubicación" value={STATIC_DATA.location} />
                </View>

                <TouchableOpacity style={styles.logoutButton} onPress={handleLogout} activeOpacity={0.8}>
                    <Ionicons name="log-out-outline" size={22} color="#FFFFFF" style={{ marginRight: 8 }} />
                    <Text style={styles.logoutButtonText}>Cerrar Sesión</Text>
                </TouchableOpacity>

            </ScrollView>
        </SafeAreaView>
    );
};

const styles = StyleSheet.create({
    container: { flex: 1 },
    scrollContent: { padding: 20, paddingTop: 30, paddingBottom: 40 },
    profileHeader: {
        borderRadius: 24,
        alignItems: 'center',
        paddingVertical: 30,
        paddingHorizontal: 20,
        marginBottom: 20,
        elevation: 3,
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 4 },
        shadowOpacity: 0.06,
        shadowRadius: 10,
    },
    avatar: {
        width: 110,
        height: 110,
        borderRadius: 55,
        borderWidth: 4,
        borderColor: '#893172',
        backgroundColor: '#213885',
        justifyContent: 'center',
        alignItems: 'center',
        marginBottom: 16,
    },
    usernameText: { fontSize: 24, fontWeight: '800', marginBottom: 4 },
    roleText: { fontSize: 15, color: '#893172', fontWeight: '600' },
    card: {
        borderRadius: 24,
        padding: 22,
        marginBottom: 24,
        elevation: 3,
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 4 },
        shadowOpacity: 0.06,
        shadowRadius: 10,
    },
    cardTitle: { fontSize: 18, fontWeight: '700', marginBottom: 20 },
    infoRow: { flexDirection: 'row', alignItems: 'center', marginBottom: 18 },
    iconCircle: {
        width: 46,
        height: 46,
        borderRadius: 23,
        backgroundColor: '#E3D3C3',
        justifyContent: 'center',
        alignItems: 'center',
        marginRight: 16,
    },
    infoLabel: { fontSize: 13, marginBottom: 3 },
    infoValue: { fontSize: 15, fontWeight: '600' },
    logoutButton: {
        backgroundColor: '#893172',
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center',
        paddingVertical: 16,
        borderRadius: 16,
        elevation: 2,
    },
    logoutButtonText: { color: '#FFFFFF', fontSize: 17, fontWeight: 'bold' },
});

export default ProfileScreen;
